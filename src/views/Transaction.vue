<template>
  <main class="container-fluid">
    <div class="float-end btn-group">
      <button type="button" class="nes-btn btn py-0 fw-bold is-warning shadow" data-bs-toggle="dropdown" aria-expanded="false">
        Open with... <i class="fas fa-chevron-down"></i>
      </button>
      <ul class="dropdown-menu nes mt-2">
        <li v-if="$net.live"><a class="dropdown-item" target="_blank" :href="'https://bithomp.com/explorer/' + $route.params.hash"><i class="fad fa-external-link me-2"></i><small>Bithomp.com</small></a></li>
        <li v-if="$net.live"><a class="dropdown-item" target="_blank" :href="'https://xrpscan.com/tx/' + $route.params.hash"><i class="fad fa-external-link me-2"></i><small>XRP Scan.com</small></a></li>
        <li v-if="$net.live"><a class="dropdown-item" target="_blank" :href="'https://xrplorer.com/transaction/' + $route.params.hash"><i class="fad fa-external-link me-2"></i><small>XRPlorer.com</small></a></li>
        <li v-if="$net.live"><a class="dropdown-item" target="_blank" :href="'https://xrpintel.com/tx/' + $route.params.hash"><i class="fad fa-external-link me-2"></i><small>xrpintel.com</small></a></li>
        <li v-if="$net.live"><a class="dropdown-item" target="_blank" :href="'https://livenet.xrpl.org/transactions/' + $route.params.hash + '/detailed'"><i class="fad fa-external-link me-2"></i><small>xrpl.org</small></a></li>

        <li v-if="$net.test"><a class="dropdown-item" target="_blank" :href="'https://test.bithomp.com/explorer/' + $route.params.hash"><i class="fad fa-external-link me-2"></i><small>Bithomp.com</small></a></li>
        <li v-if="$net.test"><a class="dropdown-item" target="_blank" :href="'https://testnet.xrpl.org/transactions/' + $route.params.hash + '/detailed'"><i class="fad fa-external-link me-2"></i><small>xrpl.org</small></a></li>
      </ul>
    </div>

    <h4 class="nes blue">Transaction</h4>

    <code class="pre text-primary">{{ $router.currentRoute.params.hash }}</code>

    <Loading v-if="Object.keys(transaction).length === 0" />

    <div class="mt-3" v-if="Object.keys(transaction).length > 0">
      <JsonRenderer :data="transaction" />
    </div>
  </main>
</template>

<script>
import JsonRenderer from '../components/JsonRenderer.vue'
import Loading from '../components/Loading.vue'

export default {
  name: 'Transaction',
  components: {
    JsonRenderer,
    Loading
  },
  data () {
    return {
      transaction: {}
    }
  },
  watch: {
    '$route.fullPath' () {
      this.get()
    }
  },
  methods: {
    async get () {
      this.transaction = {}

      const transaction = await this.$ws.send({
        command: 'tx',
        transaction: this.$router.currentRoute.params.hash
      })
      this.transaction = transaction
    }
  },
  async mounted () {
    this.get()
  }
}
</script>

<style lang="scss" scoped>
</style>
