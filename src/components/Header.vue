<template>
  <nav class="navbar navbar-expand-lg fixed-top navbar-dark" :class="network_color" aria-label="Main navigation">
    <div class="container-fluid">
      <router-link class="nes nav navbar-brand" to="/">
        <span class="d-block d-md-none">XRPL <small>Explorer</small></span>
        <span class="d-none d-md-block">XRP Ledger Explorer</span>
      </router-link>
      <button class="navbar-toggler p-0 border-0" type="button" @click="navbarCollapsed = !navbarCollapsed" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="navbar-collapse offcanvas-collapse" :class="{open: navbarCollapsed}">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="dropdown01" data-bs-toggle="dropdown" aria-expanded="false">{{ label }}</a>
            <ul class="dropdown-menu shadow" aria-labelledby="dropdown01">
              <li><a class="dropdown-item" @click="switchNetwork('xahau')"><b v-if="$active_net === 'xahau'">Xahau Mainnet</b> <span v-else>Xahau Mainnet</span></a></li>
              <li><a class="dropdown-item" @click="switchNetwork('xahau-test')"><b v-if="$active_net === 'xahau-test'">Xahau Testnet</b> <span v-else>Xahau Testnet</span></a></li>
              <li><a class="dropdown-item" @click="switchNetwork('xrpl')"><b v-if="$active_net === 'xrpl'">Xrpl Mainnet</b> <span v-else>Xrpl Mainnet</span></a></li>
              <li><a class="dropdown-item" @click="switchNetwork('xrpl-test')"><b v-if="$active_net === 'xrpl-test'">Xrpl Testnet</b> <span v-else>Xrpl Testnet</span></a></li>
              <li><a class="dropdown-item" @click="switchNetwork('custom')"><b v-if="$active_net === 'custom'">Custom</b> <span v-else>Custom</span></a></li>
            </ul>
          </li>
          <li class="nav-item">
            <a class="nav-link" style="white-space: nowrap;" href="https://github.com/XRPLF/XRPL-Technical-Explorer" target="_blank"><i class="fab fa-github-square"></i><span class="ps-2">Source</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" style="white-space: nowrap;" href="/command"><i class="fa-solid fa-webhook"></i><span class="ps-2">Commands</span></a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="dropdown02" data-bs-toggle="dropdown" aria-expanded="false">Select Wallet</a>
            <ul class="dropdown-menu shadow" aria-labelledby="dropdown02">
              <li><a class="dropdown-item" href="/wallets/xumm">Xumm</a></li>
              <li><a class="dropdown-item" href="/wallets/ledger">Ledger</a></li>
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
import { networkSwitch } from '../plugins/xrpl-switch'

export default {
  name: 'Header',
  data () {
    return {
      navbarCollapsed: false,
      query: '',
      network: 'custom',
      label: 'Custom (Change)',
      network_color: 'bg-info'
    }
  },
  computed: {
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
    async switchNetwork (network) {
      const switched = await networkSwitch(this.$ws, this.$events, this.$active_net, this.$net, network)
      this.$active_net = switched.active
      this.$net = switched.net
      this.$ws = switched.ws

      // this.$active_net = network
      console.log('net', this.$net)
      switch (this.$active_net) {
        case 'xrpl':
          this.label = 'Xrpl Mainnet (Change)'
          this.network_color = 'bg-purple'
          break
        case 'xrpl-test':
          this.label = 'Xrpl Testnet (Change)'
          this.network_color = 'bg-orange'
          break
        case 'xahau':
          this.label = 'Xahau (Change)'
          this.network_color = 'bg-navy'
          break
        case 'xahau-test':
          this.label = 'Xahau Testnet (Change)'
          this.network_color = 'bg-yellow'
          break
        case 'custom':
          this.label = 'Custom (Change)'
          this.network_color = 'bg-info'
          break
      }
    },
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
  async mounted () {
    console.log('head mounted....')
  }
}
</script>

<style lang="scss" scoped>
</style>
