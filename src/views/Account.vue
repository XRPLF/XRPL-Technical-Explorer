<template>
  <main class="container-fluid">
    <div class="float-end btn-group">
      <button type="button" class="nes-btn btn py-0 fw-bold is-warning shadow" data-bs-toggle="dropdown" aria-expanded="false">
        Open with... <i class="fas fa-chevron-down"></i>
      </button>
      <ul class="dropdown-menu nes mt-2">
        <li v-if="$net.live"><a class="dropdown-item" target="_blank" :href="'https://bithomp.com/explorer/' + $route.params.account"><i class="fad fa-external-link me-2"></i><small>Bithomp.com</small></a></li>
        <li v-if="$net.live"><a class="dropdown-item" target="_blank" :href="'https://xrpscan.com/account/' + $route.params.account"><i class="fad fa-external-link me-2"></i><small>XRPScan.com</small></a></li>
        <li v-if="$net.live"><a class="dropdown-item" target="_blank" :href="'https://xrplorer.com/account/' + $route.params.account"><i class="fad fa-external-link me-2"></i><small>XRPlorer.com</small></a></li>
        <li v-if="$net.live"><a class="dropdown-item" target="_blank" :href="'https://xrpintel.com/account/' + $route.params.account"><i class="fad fa-external-link me-2"></i><small>xrpintel.com</small></a></li>
        <li v-if="$net.live"><a class="dropdown-item" target="_blank" :href="'https://livenet.xrpl.org/accounts/' + $route.params.account"><i class="fad fa-external-link me-2"></i><small>xrpl.org</small></a></li>

        <li v-if="$net.test"><a class="dropdown-item" target="_blank" :href="'https://test.bithomp.com/explorer/' + $route.params.account"><i class="fad fa-external-link me-2"></i><small>Bithomp.com</small></a></li>
        <li v-if="$net.test"><a class="dropdown-item" target="_blank" :href="'https://testnet.xrpl.org/accounts/' + $route.params.account"><i class="fad fa-external-link me-2"></i><small>xrpl.org</small></a></li>
      </ul>
    </div>

    <h4 class="nes blue">Account</h4>
    <code class="pre text-primary">{{ $router.currentRoute.params.account }}</code>

    <!-- <JsonRenderer :data="$router.currentRoute.params" /> -->

    <Loading v-if="Object.keys(account).length === 0" />

    <div class="mt-3 mb-3" v-if="Object.keys(account).length > 0">
      <h5 class="nes h6">Account info</h5>
      <JsonRenderer :data="account" />
    </div>

    <router-link :to="'/' + $route.params.account + '/tx'" :class="{ 'is-success text-dark': $route.name === 'account_tx', 'is-primary': $route.name !== 'account_tx' }" class="nes-btn py-0 me-3 mt-2 fw-bold">Transactions</router-link>
    <router-link :to="'/' + $route.params.account + '/lines'" :class="{ 'is-success text-dark': $route.name === 'account_lines', 'is-primary': $route.name !== 'account_lines' }" class="nes-btn py-0 me-3 mt-2 fw-bold">Lines</router-link>
    <router-link :to="'/' + $route.params.account + '/nfts'" :class="{ 'is-success text-dark': $route.name === 'account_nfts', 'is-primary': $route.name !== 'account_nfts' }" class="nes-btn py-0 me-3 mt-2 fw-bold">NFTs</router-link>
    <router-link :to="'/' + $route.params.account + '/objects'" :class="{ 'is-success text-dark': $route.name === 'account_objects', 'is-primary': $route.name !== 'account_objects' }" class="nes-btn py-0 me-3 mt-2 fw-bold">Objects</router-link>
    <router-link :to="'/' + $route.params.account + '/offers'" :class="{ 'is-success text-dark': $route.name === 'account_offers', 'is-primary': $route.name !== 'account_offers' }" class="nes-btn py-0 me-3 mt-2 fw-bold">Offers</router-link>

    <router-view/>
  </main>
</template>

<script>
import JsonRenderer from '../components/JsonRenderer.vue'
import Loading from '../components/Loading.vue'

export default {
  name: 'Account',
  components: {
    JsonRenderer,
    Loading
  },
  data () {
    return {
      account: {}
    }
  },
  watch: {
    '$route.fullPath' (a, b) {
      if (a.match(/\/(r[a-zA-Z0-9]{15,})/)[1] !== b.match(/\/(r[a-zA-Z0-9]{15,})/)[1]) {
        this.get()
      }
    }
  },
  methods: {
    async get () {
      this.account = {}
      this.transactions = {}

      console.log('get', this.$router.currentRoute.params.account)
      const account = await this.$ws.send({
        command: 'account_info',
        account: this.$router.currentRoute.params.account
      })

      if (account?.account_data) {
        this.account = account.account_data
      } else {
        return this.$router.replace({ name: 'notfound' })
      }
    }
  },
  async mounted () {
    this.get()
  }
}
</script>

<style lang="scss" scoped>
</style>
