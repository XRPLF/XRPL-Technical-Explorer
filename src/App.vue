<template>
  <div id="app" class="pb-4">
    <Header />
    <LedgerNav />
    <router-view/>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import LedgerNav from './components/LedgerNav.vue'

export default {
  name: 'App',
  components: {
    Header,
    LedgerNav
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

    pre, .pre {
      font-family: 'Source Code Pro', monospace;
      font-weight: 600;
    }
  }

  body {
    padding-top: calc(56px + 2.75rem + 1em);

    /**
      Styles by Tristan (screenshot)
    */
    .blue { color: #183FB7; }
    .blue-border { border-color: lighten(#183FB7, 45%); }
    .blue-highlight { color: #7592F7; }
    .bg-blue { background-color: #183FB7; color: white; }
    .bg-red { background-color: #FF0000; color: white; }
    .bg-orange { background-color: #FFA500; color: white; }

    .bg-card { background-color: #0C1637; }
    .bg-card-header { background-color: #3D4256; }

    .bg-light-card { background-color: #F5F7FF; }
    .bg-light-card-header { background-color: #EBEDF9; }

    /**
      Bootstrap Template
    */
    .nav-scroller {
      position: fixed;
      top: 56px;
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
