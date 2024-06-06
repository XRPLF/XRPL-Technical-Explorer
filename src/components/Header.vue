<template>
  <nav class="navbar navbar-expand-lg fixed-top" :class="{
    'navbar-dark bg-blue': nodeSelectLabel.match(/XRPL.*Main/),
    'navbar-dark bg-success': nodeSelectLabel.match(/XRPL.*Test/),
    'navbar-dark bg-info': nodeSelectLabel.match(/Xahau.*Main/),
    'navbar-dark bg-danger': nodeSelectLabel.match(/Xahau.*Test/),
    'bg-warning navbar-light': $router.options.endpoint !== ''
  }" aria-label="Main navigation">
    <div class="container-fluid">
      <router-link class="nes nav navbar-brand" to="/">
        <span class="d-block d-md-none">{{ nodeSelectLabel.match(/xahau/i) ? 'Xahau ': (nodeSelectLabel.match(/xrpl/i) ? 'XRPL ' : '') }}<small>Explorer</small></span>
        <span class="d-none d-md-block">{{ nodeSelectLabel.match(/xahau/i) ? 'Xahau ': (nodeSelectLabel.match(/xrpl/i) ? 'XRP Ledger ' : '') }} Explorer</span>
      </router-link>
      <button class="navbar-toggler p-0 border-0" type="button" @click="navbarCollapsed = !navbarCollapsed" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="navbar-collapse offcanvas-collapse" :class="{open: navbarCollapsed}">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item dropdown" v-if="$router.options.endpoint === ''">
            <a class="nav-link dropdown-toggle" href="#" id="dropdown01" data-bs-toggle="dropdown" aria-expanded="false">{{ nodeSelectLabel }}</a>
            <ul class="dropdown-menu shadow" aria-labelledby="dropdown01">
              <li><a class="dropdown-item" href="https://explorer.xrplf.org"><b>XRPL Mainnet</b></a></li>
              <li><a class="dropdown-item" href="https://explorer-testnet.xrplf.org">XRPL Testnet</a></li>
              <li><a class="dropdown-item" href="https://explorer.xahau.network"><b>Xahau Mainnet</b></a></li>
              <li><a class="dropdown-item" href="https://explorer.xahau-test.net">Xahau Testnet</a></li>
            </ul>
          </li>
          <li v-else>
            <span class="nav-link text-primary"><b>{{ $router.options.endpoint.length > 30 ? '' : $router.options.endpoint }}</b></span>
          </li>
          <li class="nav-item">
            <a class="nav-link" style="white-space: nowrap;" href="https://github.com/XRPLF/XRPL-Technical-Explorer" target="_blank"><i class="fab fa-github-square"></i><span class="ps-2">Source</span></a>
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
    nodeSelectLabel () {
      if (this.$net.custom) return 'Custom Network'
      if (this.$net.test) return 'XRPL Testnet (Change)'
      if (this.$net.xahaulive) return 'Xahau Mainnet (Change)'
      if (this.$net.xahautest) return 'Xahau Testnet (Change)'

      return 'XRPL Mainnet (Change)'
    },
    validQuery () {
      const commands = this.$router.options.routes.filter(r => {
        return r?.meta?.isPublicCommand && r.name.slice(0, 1) !== '_'
      }).map(r => r.name.split('_').slice(1).join('_'))

      const query = this.query.trim()

      if (query.length < 2) {
        return false
      }

      if (query.match(/^[A-F0-9]{16}/i)) {
        // CTID
        return query
      }
      if (query.match(/^r[a-zA-Z0-9]{15,}/)) {
        // XRPL account address
        return query
      }
      if (query.match(/^[a-fA-F0-9]{64}/)) {
        // Ledger / TX / Object hash
        return query
      }
      if (query.match(/^[0-9]{1,}/) && Number(query) >= 1) {
        // Ledger Index, XRPL > 32570, but other networks probably have real full history
        return query
      }
      const possibleCommands = commands.filter(c => c.match(query.toLowerCase()))
      if (possibleCommands.length > 0) {
        return possibleCommands
      }

      return false
    }
  },
  components: {
  },
  methods: {
    search (e) {
      e.preventDefault()
      let navTo
      const navQuery = {}

      if (this.validQuery && typeof this.validQuery === 'string') {
        navTo = '/' + this.validQuery
      }
      if (this.validQuery && Array.isArray(this.validQuery) && this.validQuery.length > 0) {
        if (this.validQuery.length === 1) {
          navTo = '/' + this.validQuery[0]
        }
        if (this.validQuery.length > 1) {
          console.log(this.validQuery)
          navTo = '/command'
          // console.log(this.validQuery)
          Object.assign(navQuery, {
            c: this.validQuery
          })
        }
      }
      console.log(navTo)
      if (
        navTo &&
        (
          this.$route.path !== navTo ||
          JSON.stringify(navQuery) !== JSON.stringify(this?.$route?.query || {})
        ) &&
        !(
          JSON.stringify(navQuery) === JSON.stringify(this?.$route?.query || {}) &&
          this.$route.path === navTo
        )
      ) {
        this.$router[Object.keys(navQuery).length > 0 ? 'replace' : 'push']({
          path: navTo,
          query: navQuery
        })
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
