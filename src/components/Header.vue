<template>
  <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-blue" aria-label="Main navigation">
    <div class="container-fluid">
      <router-link class="nes nav navbar-brand" to="/">XRP Ledger Explorer</router-link>
      <button class="navbar-toggler p-0 border-0" type="button" @click="navbarCollapsed = !navbarCollapsed" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="navbar-collapse offcanvas-collapse" :class="{open: navbarCollapsed}">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <!-- <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Dashboard</a>
          </li> -->
          <!-- <li class="nav-item">
            <a class="nav-link" href="#">Notifications</a>
          </li> -->
          <!-- <li class="nav-item">
            <a class="nav-link" href="#">Profile</a>
          </li> -->
          <!-- <li class="nav-item">
            <a class="nav-link" href="#">Switch account</a>
          </li> -->
          <!-- <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="dropdown01" data-bs-toggle="dropdown" aria-expanded="false">More</a>
            <ul class="dropdown-menu shadow" aria-labelledby="dropdown01">
              <li><a class="dropdown-item" href="https://hooks-testnet.xrpl-labs.com" target="_blank"><i class="fas fa-info-square"></i><span class="ps-2">About Hooks</span></a></li>
              <li><a class="dropdown-item" href="https://github.com/XRPL-Labs/xrpld-hooks/tree/hooks-ssvm/hook-api-examples" target="_blank"><i class="fab fa-github-square"></i><span class="ps-2">Source code</span></a></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li> -->
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="dropdown01" data-bs-toggle="dropdown" aria-expanded="false">Select node</a>
            <ul class="dropdown-menu shadow" aria-labelledby="dropdown01">
              <li><a class="dropdown-item" href="https://explorer.xrplf.org"><b>Mainnet</b></a></li>
              <li><a class="dropdown-item" href="https://explorer-testnet.xrplf.org">Testnet</a></li>
              <li><a class="dropdown-item" href="https://hooks-testnet-explorer.xrpl-labs.com">Hooks Testnet</a></li>
            </ul>
          </li>
        </ul>
        <form class="d-flex" @submit="search">
          <input v-model="query" class="form-control border border-2 border-dark py-0 me-2" type="search" placeholder="Search" aria-label="Search">
          <!-- <button class="btn btn-outline-success" type="submit">Search</button> -->
          <button :disabled="!validQuery" type="submit" :class="{'is-success': validQuery, 'is-disabled': !validQuery}" class="py-0 px-2 nes-btn">Search</button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      navbarCollapsed: false,
      query: ''
    }
  },
  computed: {
    validQuery () {
      const query = this.query.trim()
      if (query.match(/^r[a-zA-Z0-9]{15,}/)) {
        // XRPL account address
        return query
      }
      if (query.match(/^[a-fA-F0-9]{64}/)) {
        // Ledger / TX / Object hash
        return query
      }
      if (query.match(/^[0-9]{5,}/) && Number(query) >= 32570) {
        // Ledger Index
        return query
      }

      return false
    }
  },
  components: {
  },
  methods: {
    search (e) {
      e.preventDefault()
      if (this.validQuery) {
        this.$router.push('/' + this.validQuery)
      }
      return false
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
</style>
