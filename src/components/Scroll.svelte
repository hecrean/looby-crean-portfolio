<script lang="ts">
  import Cursor from "@/components/Cursor.svelte";
</script>

<div id="loader-wrapper" />
<div id="menu-wrapper" />
<!-- navbar -->
<nav id="navbar-button-menu">Navbar Btn</nav>
<nav id="navbar-logo">Navar logo</nav>
<nav id="navbar-button-instagram">Navbar Insta</nav>

<Cursor />

<main id="slideshow">
  <div id="slideshow-page-index">House Link: - one - two -three</div>

  <section id="slide">
    <img
      src="https://www.chanandeayrs.com/wp-content/uploads/2018/09/3_weavers_house_poster-720x405.jpg"
    />
  </section>

  <section id="slide">
    <img
      src="https://www.chanandeayrs.com/wp-content/uploads/2018/09/3_weavers_house_poster-720x405.jpg"
    />
  </section>

  <section id="slide">
    <img
      src="https://www.chanandeayrs.com/wp-content/uploads/2018/09/3_weavers_house_poster-720x405.jpg"
    />
  </section>

  <footer id="footer">Footer</footer>
</main>

<style lang="scss">
  #loader-wrapper {
    z-index: 9000;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translate3d(0, 100%, 0);
    pointer-events: none;
    visibility: hidden;
    opacity: 1;
    background: #f3f0ed;
  }

  #menu-wrapper {
    z-index: 900;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    pointer-events: none;
    visibility: hidden;
  }

  #navbar-button-menu {
    z-index: 1000;
    position: fixed;
    top: 50px;
    left: 80px;
    width: 40px;
    height: 24px;
    background: rgba(0, 0, 0, 0.01);
  }
  #navbar-logo {
    z-index: 750;
    position: fixed;
    top: 30px;
    left: calc(50vw - 35px);
    width: 70px;
    height: 70px;
  }
  #navbar-button-instagram {
    position: fixed;
    z-index: 750;
    width: 24px;
    height: 24px;
    top: 50px;
    right: 80px;
  }

  #slideshow {
    z-index: 500;
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: grey;
    scroll-snap-type: y mandatory;
    overflow-y: scroll;

    #cursor-wrapper {
    }

    #slideshow-page-index {
      z-index: 750;
      position: fixed;
      display: flex;
      flex-flow: column;
      left: 80px;
      bottom: 50px;
      width: 360px;
      color: blue;
      background-color: yellow;
    }

    #slide {
      scroll-snap-align: start;

      z-index: 550;
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
