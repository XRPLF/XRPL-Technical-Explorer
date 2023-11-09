<template>
  <nav class="navbar navbar-expand-lg fixed-top navbar-dark" :class="networks[$store.getters.getNetwork].color" aria-label="Main navigation">
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
            <a class="nav-link dropdown-toggle" href="#" id="dropdown01" data-bs-toggle="dropdown" aria-expanded="false">{{ networks[$store.getters.getNetwork].label }}</a>
            <ul class="dropdown-menu shadow" aria-labelledby="dropdown01">
              <li v-for="entry, key in networks" v-bind:key="key">
                <a class="dropdown-item" @click="switchNetwork(key)">{{entry.label}}</a>
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <a class="nav-link" style="white-space: nowrap;" href="https://github.com/XRPLF/XRPL-Technical-Explorer" target="_blank"><i class="fab fa-github-square"></i><span class="ps-2">Source</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" style="white-space: nowrap;" href="/command"><i class="fa-solid fa-webhook"></i><span class="ps-2">Commands</span></a>
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
import { Dropdown } from 'bootstrap'

export default {
  name: 'HeaderComponent',
  components: {
    Dropdown
  },
  emits: ['reboot'],
  data () {
    return {
      navbarCollapsed: false,
      query: '',
      networks: {
        'xrpl': {
          label: 'XRPL Mainnet',
          type: 'mainnet',
          wss: ['wss://xrplcluster.com', 'wss://s2.ripple.com'],
          color: 'bg-info text-light'
        },
        'xrpl-test': {
          label: 'XRPL Testnet',
          type: 'testnet',
          wss: ['wss://testnet.xrpl-labs.com', 'wss://s.altnet.rippletest.net:51233'],
          color: 'bg-orange text-light'
        },
        'xrpl-dev': {
          label: 'XRPL Devnet',
          type: 'devnet',
          wss: ['wss://s.devnet.rippletest.net:51233'],
          color: 'bg-purple text-light'
        },
        'xrpl-amm': {
          label: 'XRPL AMM',
          type: 'ammnet',
          wss: ['wss://amm.devnet.rippletest.net:51233'],
          color: 'bg-pink text-light'
        },
        'xahau': {
          label: 'Xahau Mainnet',
          type: 'mainnet',
          wss: ['wss://xahau.network'],
          color: 'bg-navy text-light'
        },
        'xahau-test': {
          label: 'Xahau Testnet',
          type: 'testnet',
          wss: ['wss://xahau-test.net'],
          color: 'bg-yellow text-dark'
        },
        'xahau-dev': {
          label: 'Xahau Devnet',
          type: 'devnet',
          wss: ['wss://dev.xahau.network'],
          color: 'bg-yellow text-dark'
        },
        'custom': {
          label: 'Custom',
          type: import.meta.env.VITE_APP_WSS_NETWORK_TYPE,
          wss: [import.meta.env.VITE_APP_WSS_ENDPOINT],
          color: 'bg-green text-light'
        }
      }
    }
  },
  async mounted () {
    console.log('head mounted....', this.$store.getters.getNetwork, this.$store.getters.getNetworkType)
    console.log(this.networks)
  },
  methods: {
    switchNetwork (key) {
      this.network = key
      if (this.networks[key].wss === undefined) { return }
      this.$store.dispatch('setClientServers', this.networks[key].wss)
      this.$store.dispatch('clientConnect', false)
      this.$store.dispatch('setNetwork', {key: key, type: this.networks[key].type })
      this.$router.push('/')
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
      console.log('navTo', navTo)
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
  computed: {
    validQuery () {
      const commands = this.$router.options.routes.filter(r => {
        return r?.meta?.isPublicCommand && r.name.slice(0, 1) !== '_'
      }).map(r => r.name.split('_').slice(1).join('_'))

      const query = this.query.trim()
      console.log('query', query)
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
  }
}
</script>

<style lang="scss" scoped>
</style>
