import { createPointerCache, type CacheEntry } from "@/stores/pointer.store";
import type {
  EventFromEventTag,
  PointerEventTag,
  TaggedEvent,
} from "./pannable.types";
import type { Action } from "./types";

declare namespace svelte.JSX {
  interface HTMLAttributes<T> {
    onpanstart?: (e: CustomEvent<{ x: number; y: number }>) => void;
    onpanend?: (
      e: CustomEvent<{ x: number; y: number; dx: number; dy: number }>
    ) => void;
    onpanmove?: (e: CustomEvent<PointerDifference>) => void;
  }
}

const coordinates = <El extends HTMLElement>({
  element,
  event,
  tag,
}: TaggedEvent<PointerEventTag, El>) => {
  const rect = element.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  return {
    ndc: {
      x: (x / rect.width) * 2 - 1,
      y: (y / rect.height) * -2 + 1,
    },
    pixel: {
      x: x,
      y: y,
    },
  };
};

const pointerDifference = <El extends HTMLElement>(
  pointer1: TaggedEvent<PointerEventTag, El>,
  pointer2: TaggedEvent<PointerEventTag, El>
) => {
  const pointer1Coords = coordinates(pointer1);
  const pointer2Coords = coordinates(pointer2);

  return {
    dt: pointer1.event.timeStamp - pointer2.event.timeStamp,
    dP_Normal: pointer1.event.pressure - pointer2.event.pressure,
    dP_Tangential:
      pointer1.event.tangentialPressure - pointer2.event.tangentialPressure,
    dA:
      pointer1.event.width * pointer1.event.height -
      pointer2.event.width * pointer2.event.height,
    dTiltX: pointer1.event.tiltX - pointer2.event.tiltX,
    dTiltY: pointer1.event.tiltY - pointer2.event.tiltY,
    dTwist: pointer1.event.twist - pointer2.event.twist,
    dxNDC: pointer1Coords.ndc.x - pointer2Coords.ndc.x,
    dyNDC: pointer1Coords.ndc.y - pointer2Coords.ndc.y,
    xNDC: pointer2Coords.ndc.x,
    yNDC: pointer2Coords.ndc.y,
    dxPixel: pointer1Coords.pixel.x - pointer2Coords.pixel.x,
    dyPixel: pointer1Coords.pixel.y - pointer2Coords.pixel.y,
    xPixel: pointer2Coords.pixel.x,
    yPixel: pointer2Coords.pixel.y,
  };
};
export type PointerDifference = ReturnType<typeof pointerDifference>;

const handlepanmoves = <El extends HTMLElement>(
  cache: Map<string, CacheEntry<El>>
) => {
  return Array.from(cache)
    .map(([key, value]) => value)
    .filter((arr) => arr.length >= 2)
    .map(
      (cacheEntry) =>
        new CustomEvent("panmove", {
          detail: pointerDifference(
            cacheEntry[cacheEntry.length - 2],
            cacheEntry[cacheEntry.length - 1]
          ),
        })
    );
};

export const pannable: Action = (node) => {
  const { $cache, ...cacheApi } = createPointerCache(
    new Map<string, CacheEntry<typeof node>>()
  );

  function handle_pointerdown(event: EventFromEventTag<"pointerdown">) {
    const pointerdownEv: TaggedEvent<"pointerdown", typeof node> = {
      tag: "pointerdown",
      element: node,
      event: event,
    };
    const { ndc, pixel } = coordinates(pointerdownEv);

    cacheApi.logPointerEvent(pointerdownEv);

    node.dispatchEvent(
      new CustomEvent("panstart", {
        detail: { ndc, pixel },
      })
    );

    window.addEventListener("pointermove", handle_pointermove);
    window.addEventListener("pointerup", handle_pointerup);
  }

  function handle_pointermove(event: EventFromEventTag<"pointermove">) {
    const pointerMoveEv: TaggedEvent<"pointermove", typeof node> = {
      tag: "pointermove",
      element: node,
      event: event,
    };

    cacheApi.logPointerEvent(pointerMoveEv);

    const panmoves = handlepanmoves($cache);

    panmoves.forEach((multipointerpanmove) =>
      node.dispatchEvent(multipointerpanmove)
    );
  }

  function handle_pointerup(event: EventFromEventTag<"pointerup">) {
    const pointerupEv: TaggedEvent<"pointerup", typeof node> = {
      tag: "pointerup",
      element: node,
      event: event,
    };

    const pointerEvs = cacheApi.logPointerEvent(pointerupEv);

    const diff = <T>(
      vs: Array<T>,
      projector: (v: T) => { x: number; y: number }
    ) => {
      return vs.slice(1).map((v, n) => {
        return {
          x: projector(v).x - projector(vs[n]).x,
          y: projector(v).y - projector(vs[n]).y,
        };
      });
    };

    const projector = (input: TaggedEvent<PointerEventTag, HTMLElement>) =>
      coordinates(input).ndc;
    const diffs = diff(pointerEvs, projector);
    const [last, secondLast, ...rest] = diffs.reverse();
    const { x, y } = coordinates(pointerupEv).ndc;

    //note: the speed of the drag is taken into account my the fact that the dx,dy will be larger for quicker swipes
    node.dispatchEvent(
      new CustomEvent("panend", {
        detail: { x, y, dx: -secondLast.x, dy: -secondLast.y },
      })
    );

    window.removeEventListener("pointermove", handle_pointermove);
    window.removeEventListener("pointerup", handle_pointerup);
  }

  node.addEventListener("pointerdown", handle_pointerdown);

  return {
    destroy() {
      node.removeEventListener("pointerdown", handle_pointerdown);
    },
  };
};
