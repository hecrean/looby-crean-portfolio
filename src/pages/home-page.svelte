<script lang="ts">
  import { pannable, type PointerDifference } from "@/actions/pannable";
  import Cursor from "@/components/Cursor.svelte";
  import FullpageCanvas from "@/components/FullpageCanvas.svelte";
  import { createAppStore } from "@/stores/app.store";
  import { glStore } from "@/stores/canvas.store";
  import { fade } from "svelte/transition";

  const { app, toggleMenu } = createAppStore();

  let dy: number = 0;
  let offsetHeight: number = 0;

  $: headerVisible = offsetHeight < 10 ? true : dy <= 0 ? true : false;

  const isTouchDevice = () => {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  };

  function handleWheel(e: WheelEvent): void {
    dy = e.deltaY;
  }

  function handlePanStart({
    detail: { pixel },
  }: CustomEvent<{
    ndc: { x: number; y: number };
    pixel: { x: number; y: number };
  }>) {
    if ($glStore && !isTouchDevice) {
      $glStore.lineWidth = 10;
      $glStore.strokeStyle = "rgb(235, 36, 34)";
      $glStore.beginPath();
      $glStore.moveTo(pixel.x, pixel.y);
    }
  }

  function handlePanMove({
    detail: { xPixel, yPixel },
  }: CustomEvent<PointerDifference>): void {
    if ($glStore && !isTouchDevice) {
      $glStore.lineTo(xPixel, yPixel);
      $glStore.stroke();
    }
  }

  async function handlePanEnd(
    event: CustomEvent<{ x: number; y: number; dx: number; dy: number }>
  ) {
    if ($glStore && !isTouchDevice) {
      $glStore.stroke();
    }
  }
</script>

<!-- Full page containers, which are generally hidden -->

<svelte:window on:wheel={handleWheel} />

<Cursor />

<FullpageCanvas />

{#if $app.menuOpen}
  <div id="menu-wrapper" data-visible={$app.menuOpen} transition:fade>
    <div class="contents">
      <div class="vertical-list">
        <p class="vertical-list-item">Home 1</p>
        <p class="vertical-list-item">Home 2</p>
        <p class="vertical-list-item">Home 3</p>
      </div>
      <div class="vertical-divider" />
      <div class="vertical-list">
        <p class="vertical-list-item">Home 1</p>
        <p class="vertical-list-item">Home 2</p>
        <p class="vertical-list-item">Home 3</p>
      </div>
    </div>
  </div>
{/if}

<!-- navbar -->
{#if headerVisible}
  <header
    in:fade={{ delay: 0, duration: 100 }}
    out:fade={{ delay: 2000, duration: 100 }}
    class:no-select={true}
  >
    <button id="navbar-button-menu" class="navbar-button" on:click={toggleMenu}
      ><svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z"
          fill="currentColor"
          fill-rule="evenodd"
          clip-rule="evenodd"
        /></svg
      ></button
    >
    <div id="navbar-logo">Looby Crean</div>
    <button id="navbar-button-instagram" class="navbar-button"
      ><svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12.9091 12.909C13.2365 12.5817 13.4918 12.1895 13.6588 11.7577C13.8195 11.3443 13.9294 10.8718 13.961 10.1799C13.9926 9.48665 14.0001 9.26529 14.0001 7.50001C14.0001 5.73473 13.9926 5.51328 13.961 4.82008C13.9294 4.12821 13.8195 3.65573 13.6588 3.24228C13.4956 2.80857 13.2398 2.41567 12.9091 2.091C12.5844 1.76028 12.1915 1.50437 11.7578 1.34113C11.3443 1.18056 10.8718 1.0707 10.1799 1.03924C9.48675 1.00748 9.26537 1 7.50006 1C5.73476 1 5.51333 1.00748 4.82014 1.03912C4.12826 1.0707 3.65578 1.18056 3.24233 1.34125C2.80862 1.50447 2.41573 1.76032 2.09105 2.09098C1.76032 2.41563 1.5044 2.80852 1.34113 3.24225C1.18056 3.65573 1.0707 4.12821 1.03924 4.82008C1.00748 5.51328 1 5.73471 1 7.50001C1 9.26532 1.00748 9.48675 1.03924 10.1799C1.07083 10.8718 1.18069 11.3443 1.34138 11.7577C1.5046 12.1915 1.76045 12.5843 2.09111 12.909C2.41578 13.2397 2.80867 13.4955 3.24238 13.6587C3.65586 13.8194 4.12834 13.9293 4.82019 13.9609C5.51348 13.9925 5.73483 14 7.50012 14C9.2654 14 9.48685 13.9925 10.18 13.9609C10.8719 13.9293 11.3444 13.8194 11.7578 13.6587C12.1896 13.4917 12.5818 13.2364 12.9091 12.909ZM1.99949 6.73496C1.99974 6.94524 2.00005 7.19543 2.00005 7.50002C2.00005 7.80461 1.99974 8.0548 1.99949 8.26507C1.99849 9.08596 1.99824 9.29856 2.01963 9.7655C2.04625 10.3509 2.07823 10.7811 2.17588 11.1053C2.26976 11.417 2.37505 11.7342 2.7188 12.1171C3.06255 12.4999 3.39411 12.6733 3.81645 12.8007C4.23879 12.928 4.7696 12.9554 5.23052 12.9764C5.75332 13.0003 5.96052 13.0002 7.05714 12.9999L7.50006 12.9999C7.79304 12.9999 8.03569 13.0001 8.2409 13.0004C9.08195 13.0013 9.29425 13.0015 9.76575 12.9799C10.3512 12.9533 10.7814 12.9213 11.1056 12.8237C11.4173 12.7298 11.7345 12.6245 12.1173 12.2807C12.5001 11.937 12.6735 11.6054 12.8009 11.1831C12.9283 10.7607 12.9557 10.2299 12.9767 9.76902C13.0005 9.24689 13.0004 9.04027 13.0002 7.94749V7.94738L13.0001 7.50039L13.0001 7.05747C13.0004 5.96085 13.0005 5.75365 12.9766 5.23085C12.9556 4.76993 12.9282 4.23912 12.8009 3.81678C12.6735 3.39445 12.5001 3.06288 12.1173 2.71913C11.7345 2.37538 11.4172 2.27009 11.1056 2.17621C10.7813 2.07856 10.3511 2.04658 9.76571 2.01996C9.29421 1.99836 9.08194 1.99859 8.24092 1.99951H8.24092C8.0357 1.99974 7.79305 2.00001 7.50006 2.00001L7.05704 1.99993C5.96051 1.99964 5.75331 1.99958 5.23052 2.02343C4.7696 2.04446 4.23879 2.07183 3.81645 2.19921C3.39411 2.32659 3.06255 2.49999 2.7188 2.88281C2.37505 3.26562 2.26976 3.58286 2.17588 3.89453C2.07823 4.21874 2.04625 4.64894 2.01963 5.23437C1.99824 5.70131 1.99849 5.91401 1.99949 6.73496ZM7.49996 5.25015C6.25741 5.25015 5.25012 6.25744 5.25012 7.49999C5.25012 8.74254 6.25741 9.74983 7.49996 9.74983C8.74251 9.74983 9.7498 8.74254 9.7498 7.49999C9.7498 6.25744 8.74251 5.25015 7.49996 5.25015ZM4.25012 7.49999C4.25012 5.70515 5.70512 4.25015 7.49996 4.25015C9.2948 4.25015 10.7498 5.70515 10.7498 7.49999C10.7498 9.29483 9.2948 10.7498 7.49996 10.7498C5.70512 10.7498 4.25012 9.29483 4.25012 7.49999ZM10.9697 4.7803C11.3839 4.7803 11.7197 4.44452 11.7197 4.0303C11.7197 3.61609 11.3839 3.2803 10.9697 3.2803C10.5555 3.2803 10.2197 3.61609 10.2197 4.0303C10.2197 4.44452 10.5555 4.7803 10.9697 4.7803Z"
          fill="currentColor"
        /></svg
      ></button
    >
  </header>
{/if}

<main
  id="slideshow"
  bind:offsetHeight
  use:pannable
  on:panstart|stopPropagation={handlePanStart}
  on:panmove={handlePanMove}
  on:panend={handlePanEnd}
>
  <div id="slideshow-page-index" class:no-select={true}>
    <p transition:fade>Project One</p>
    <p transition:fade>Project Two</p>
    <p transition:fade>Project Three</p>
  </div>

  <section id="slide">
    <img
      class:no-select={true}
      class:no-pointer-events={true}
      src="/image/dog-1.jpeg"
    />
  </section>

  <section id="slide">
    <img
      class:no-select={true}
      class:no-pointer-events={true}
      src="/image/dog-2.jpeg"
    />
  </section>

  <section id="slide">
    <img
      class:no-select={true}
      class:no-pointer-events={true}
      src="https://www.chanandeayrs.com/wp-content/uploads/2018/09/3_weavers_house_poster-720x405.jpg"
    />
  </section>

  <footer id="footer" />
</main>

<style lang="scss">
  @import "../styles/lib";

  .hide-header-item {
    opacity: 0;
    transition: opacity 50ms cubic-bezier(0.215, 0.61, 0.355, 1) 0.4s;
  }

  .no-select {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
  }
  .no-pointer-events {
    touch-action: none;
    pointer-events: none;
  }

  #menu-wrapper {
    z-index: $z-9;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: $neon-orange;
    display: flex;
    align-items: center;
    justify-items: center;

    .contents {
      padding: 5vh 10vw;
      display: flex;
      flex-direction: row;
      flex: 3;
      align-items: center;
      justify-content: space-evenly;
      height: 100%;
      width: 100%;

      .vertical-divider {
        height: 30vh;
        /* border-left: 2px dashed grey; */
        width: 2px;
        background: url("/svg/ce_border.svg") repeat-y;
      }

      .vertical-list {
        display: flex;
        flex-direction: column;

        & *:has(:hover) {
          color: yellow;
        }
      }

      .vertical-list-item {
        opacity: 1;
        font-size: xx-large;
        transform: translate3d(0, 0, 0);
        transition: opacity 50ms cubic-bezier(0.215, 0.61, 0.355, 1) 0.4s,
          transform 360ms cubic-bezier(0.215, 0.61, 0.355, 1) 0.8s,
          color 0.4s cubic-bezier(0.215, 0.61, 0.355, 1);

        &:hover {
          transform: translate3d(10px, 0, 0);
          opacity: 0.5;
        }
      }
    }
  }

  .navbar-button {
    color: white;
    transition: filter 0.3s ease;
    &:hover {
      filter: brightness(85%);
      color: black;
    }
    &:active {
      filter: brightness(85%);
    }
    transition: color 0.4s cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  #navbar-button-menu {
    z-index: $z-10;
    position: fixed;
    top: 50px;
    left: 80px;
    width: 40px;
    height: 24px;
    background: rgba(0, 0, 0, 0.01);
  }
  #navbar-logo {
    color: white;
    z-index: $z-8;
    position: fixed;
    top: 30px;
    left: calc(50vw - 35px);
    width: 70px;
    height: 70px;
  }
  #navbar-button-instagram {
    position: fixed;
    z-index: $z-8;
    width: 24px;
    height: 24px;
    top: 50px;
    right: 80px;
  }

  #slideshow {
    z-index: $z-7;
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: grey;
    scroll-snap-type: y mandatory;
    overflow-y: scroll;

    #cursor-wrapper {
    }

    #slideshow-page-index {
      z-index: $z-7;
      position: fixed;
      display: flex;
      flex-flow: column;
      left: 80px;
      bottom: 50px;
      width: 360px;
      color: white;
      background-color: transparent;
    }

    #slide {
      z-index: $z-6;
      scroll-snap-align: start;
      width: 100vw;
      height: 100vh;
      overflow: hidden;

      img,
      video {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    #footer {
      position: fixed;
      width: 100%;
      bottom: 0;
      padding: 0 0 50px;
    }
  }
</style>
