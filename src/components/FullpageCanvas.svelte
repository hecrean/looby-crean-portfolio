<script lang="ts">
  import { canvasStore, glStore } from "@/stores/canvas.store";
  import { onMount } from "svelte";
  // we only want the assets to load once, and for the instructions manual to show once, so we use a global, shared loading state

  /** fullscreen canvas*/
  interface $$Props extends Partial<HTMLDivElement> {}

  let canvasProxyEl: HTMLDivElement;
  let canvasEl: HTMLCanvasElement;
  let w: number;
  let h: number;

  onMount(() => {
    canvasStore.set(canvasEl);
    glStore.set(canvasEl.getContext("2d"));

    $canvasStore.width = w;
    $canvasStore.height = h;

    $glStore.lineWidth = 10;
  });
</script>

<div
  bind:this={canvasProxyEl}
  class:canvas-proxy={true}
  bind:clientWidth={w}
  bind:clientHeight={h}
>
  <canvas class:webgl-canvas={true} bind:this={canvasEl} />
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

  .canvas-proxy {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    background-color: transparent;

    pointer-events: none;
    z-index: $z-8;
    box-sizing: border-box;
    overflow: hidden;
    overscroll-behavior: contain;
    user-select: none;
  }

  .webgl-canvas {
    background-color: transparent;

    z-index: $z-9;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    touch-action: none;

    cursor: grab;
    &:active {
      cursor: grabbing;
    }
  }
</style>
