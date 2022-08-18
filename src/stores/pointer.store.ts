import { writable } from "svelte/store";
import type { PointerEventTag, TaggedEvent } from "@/actions/pannable.types";
import { tweened } from "svelte/motion";

export type CacheEntry<El extends HTMLElement> = Array<
  TaggedEvent<PointerEventTag, El>
>;

export function createPointerCache<El extends HTMLElement>(
  initialCache: Map<string, CacheEntry<El>>
) {
  const $cache = initialCache;
  return {
    $cache,
    reset: () => $cache.clear(),
    getPointerCacheEntry: (pointerId: number): CacheEntry<El> =>
      $cache.get(`${pointerId}`),
    logPointerEvent: (
      pointer: TaggedEvent<PointerEventTag, El>
    ): CacheEntry<El> => {
      const { tag, element, event } = pointer;
      switch (tag) {
        case "pointerdown":
          $cache.set(`${event.pointerId}`, [pointer, pointer]);
          return $cache.get(`${event.pointerId}`);
        case "pointermove": {
          const cacheEntry = $cache.get(`${pointer.event.pointerId}`);
          if (cacheEntry) {
            $cache.set(`${pointer.event.pointerId}`, [...cacheEntry, pointer]);
          }
          return $cache.get(`${event.pointerId}`);
        }
        case "pointerup":
          const cacheEntry = $cache.get(`${pointer.event.pointerId}`);
          if (cacheEntry) {
            $cache.set(`${pointer.event.pointerId}`, [...cacheEntry, pointer]);
          }
          return $cache.get(`${event.pointerId}`);
        default:
          return [];
      }
    },
  };
}
