<script lang="ts">
  import { spring } from "svelte/motion";

  let coords = spring(
    { x: 50, y: 50 },
    {
      stiffness: 0.1,
      damping: 0.25,
    }
  );

  let size = spring(10);
</script>

<svelte:window
  on:mousemove={(e) => coords.set({ x: e.clientX, y: e.clientY })}
  on:mousedown={() => size.set(30)}
  on:mouseup={() => size.set(10)}
/>

<div class="cursor-wrapper">
  <svg>
    <circle cx={$coords.x} cy={$coords.y} r={$size} />
  </svg>
</div>

<style>
  .cursor-wrapper {
    pointer-events: none;
    background-color: transparent;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9000;
  }
  svg {
    width: 100%;
    height: 100%;
  }
  circle {
    fill: #ff3e00;
  }
</style>
