<template>
  <div id="app">
    <Header />

    <div class="nav-scroller bg-body shadow-sm">
      <nav class="nav nav-underline" aria-label="Secondary navigation">
        <a class="nav-link active" aria-current="page" href="#">Dashboard</a>
        <a class="nav-link" href="#">
          Friends
          <span class="badge bg-light text-dark rounded-pill align-text-bottom">27</span>
        </a>
        <a class="nav-link" href="#">Explore</a>
        <a class="nav-link" href="#">Suggestions</a>
        <a class="nav-link" href="#">Link</a>
        <a class="nav-link" href="#">Link</a>
        <a class="nav-link" href="#">Link</a>
        <a class="nav-link" href="#">Link</a>
        <a class="nav-link" href="#">Link</a>
      </nav>
    </div>

    <Body />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Body from './components/Body.vue'
// import Sample from './components/Sample.vue'

export default {
  name: 'App',
  components: {
    Header,
    Body
    // Sample
  },
  mounted () {
  }
}
</script>

<style lang="scss">
  html, body {
    overflow-x: hidden; /* Prevent scroll on narrow devices */
    font-family: 'Source Code Pro', monospace;

    .nes {
      font-family: 'Press Start 2P', cursive;
    }

    pre {
      font-family: 'Source Code Pro', monospace;
      font-weight: 600;
    }
  }

  body {
    padding-top: 56px;

    .nav-scroller {
      position: relative;
      z-index: 2;
      height: 2.75rem;
      overflow-y: hidden;

      .nav {
        display: flex;
        flex-wrap: nowrap;
        padding-bottom: 1rem;
        margin-top: -1px;
        overflow-x: auto;
        color: rgba(255, 255, 255, .75);
        text-align: center;
        white-space: nowrap;
        -webkit-overflow-scrolling: touch;
      }
    }

    .nav-underline .nav-link {
      padding-top: .75rem;
      padding-bottom: .75rem;
      font-size: .875rem;
      color: #6c757d;

      &:hover {
        color: #007bff;
      }

      .active {
        font-weight: 500;
        color: #343a40;
      }
    }

    .text-white-50 { color: rgba(255, 255, 255, .5); }
    .bg-purple { background-color: #6f42c1; }
  }

  @media (max-width: 991.98px) {
    .offcanvas-collapse {
      position: fixed;
      top: 56px; /* Height of navbar */
      bottom: 0;
      left: 100%;
      width: 100%;
      padding-right: 1rem;
      padding-left: 1rem;
      overflow-y: auto;
      visibility: hidden;
      background-color: #343a40;
      transition: transform .3s ease-in-out, visibility .3s ease-in-out;

      &.open {
        visibility: visible;
        transform: translateX(-100%);
      }
    }
  }
</style>
