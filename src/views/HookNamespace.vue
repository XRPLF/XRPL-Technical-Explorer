<template>
  <main class="container-fluid">
    <!-- <div class="float-end btn-group">
      <button type="button" class="nes-btn btn py-0 fw-bold is-warning shadow" data-bs-toggle="dropdown" aria-expanded="false">
        Open with... <i class="fas fa-chevron-down"></i>
      </button>
      <ul class="dropdown-menu nes mt-2">
        <li v-if="$net.live"><a class="dropdown-item" target="_blank" :href="'https://bithomp.com/explorer/' + $route.params.hash"><i class="fad fa-external-link me-2"></i><small>Bithomp.com</small></a></li>
        <li v-if="$net.live"><a class="dropdown-item" target="_blank" :href="'https://xrpscan.com/tx/' + $route.params.hash"><i class="fad fa-external-link me-2"></i><small>XRPScan.com</small></a></li>
        <li v-if="$net.live"><a class="dropdown-item" target="_blank" :href="'https://xrplorer.com/namespaceData/' + $route.params.hash"><i class="fad fa-external-link me-2"></i><small>XRPlorer.com</small></a></li>
        <li v-if="$net.live"><a class="dropdown-item" target="_blank" :href="'https://xrpintel.com/tx/' + $route.params.hash"><i class="fad fa-external-link me-2"></i><small>xrpintel.com</small></a></li>
        <li v-if="$net.live"><a class="dropdown-item" target="_blank" :href="'https://livenet.xrpl.org/namespaceDatas/' + $route.params.hash + '/detailed'"><i class="fad fa-external-link me-2"></i><small>xrpl.org</small></a></li>

        <li v-if="$net.test"><a class="dropdown-item" target="_blank" :href="'https://test.bithomp.com/explorer/' + $route.params.hash"><i class="fad fa-external-link me-2"></i><small>Bithomp.com</small></a></li>
        <li v-if="$net.test"><a class="dropdown-item" target="_blank" :href="'https://testnet.xrpl.org/namespaceDatas/' + $route.params.hash + '/detailed'"><i class="fad fa-external-link me-2"></i><small>xrpl.org</small></a></li>
      </ul>
    </div> -->

    <h4 class="nes blue">Hook Namespace</h4>

    <code class="pre text-primary">{{ $router.currentRoute.params.hash }}</code>

    <Loading v-if="Object.keys(namespaceData).length === 0" />

    <div class="mt-3" v-if="Object.keys(namespaceData).length > 0">
      <JsonRenderer :data="namespaceData" />
    </div>
  </main>
</template>

<script>
import JsonRenderer from '../components/JsonRenderer.vue'
import Loading from '../components/Loading.vue'

export default {
  name: 'namespaceData',
  components: {
    JsonRenderer,
    Loading
  },
  data () {
    return {
      namespaceData: {}
    }
  },
  watch: {
    '$route.fullPath' () {
      this.get()
    }
  },
  methods: {
    async get () {
      this.namespaceData = {}

      console.log(this.$router.currentRoute.params)

      const namespaceData = await this.$ws.send({
        command: 'account_namespace',
        ...(this.$router.currentRoute.params || {})
      })
      this.namespaceData = namespaceData
    }
  },
  async mounted () {
    this.get()
  }
}
</script>

<style lang="scss" scoped>
</style>
