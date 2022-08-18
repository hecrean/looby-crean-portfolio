<script lang="ts">
  import { pannable, type PointerDifference } from "@/actions/pannable";
  // we only want the assets to load once, and for the instructions manual to show once, so we use a global, shared loading state

  /** fullscreen canvas*/
  interface $$Props extends Partial<HTMLDivElement> {}

  let canvasProxyEl: HTMLDivElement;
  let canvasEl: HTMLCanvasElement;

  function handlePanStart(event: CustomEvent<{ x: number; y: number }>) {
    event.stopPropagation();
  }

  const handlePanMove = (event: CustomEvent<PointerDifference>) => {
    console.log(event.detail);
  };

  async function handlePanEnd(
    event: CustomEvent<{ x: number; y: number; dx: number; dy: number }>
  ) {}
</script>

<!-- <svelte:window on:keydown|preventDefault={() => {}} /> -->

<div bind:this={canvasProxyEl} class:canvas-proxy={true} {...$$restProps}>
  <canvas
    class:webgl-canvas={true}
    bind:this={canvasEl}
    use:pannable
    on:panstart|stopPropagation={handlePanStart}
    on:panmove={handlePanMove}
    on:panend={handlePanEnd}
  />
</div>

<style lang="scss">
  @use "sass:map";
  @import "../styles/lib";

  @mixin covering() {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  $layers: (
    "canvas-proxy": 0,
    "webgl-canvas": 1,
  );

  .canvas-proxy {
    z-index: z-index(map.get($layers, "canvas-proxy"));
    position: relative;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    background-color: transparent;
    overflow: hidden;
    overscroll-behavior: contain;
    user-select: none;
  }

  .webgl-canvas {
    z-index: z-index(map.get($layers, "webgl-canvas"));
    background-color: black;
    position: absolute;
    @include covering();
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    touch-action: none;

    cursor: grab;
    &:active {
      cursor: grabbing;
    }
  }
</style>
