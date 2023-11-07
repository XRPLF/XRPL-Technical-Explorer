<template>
    <main class="container-fluid">
      <div class="float-end btn-group">
        <button type="button" class="nes-btn btn py-0 fw-bold is-warning shadow" data-bs-toggle="dropdown" aria-expanded="false">
          Open with... <i class="fas fa-chevron-down"></i>
        </button>
        <ul class="dropdown-menu nes mt-2">
          <li><a v-if="$store.getters.getNetwork === 'xrpl'" class="dropdown-item" target="_blank" :href="'https://bithomp.com/explorer/' + $route.params.hash"><i class="fad fa-external-link me-2"></i><small>bithomp.com</small></a></li>
          <li><a v-if="$store.getters.getNetwork === 'xrpl'" class="dropdown-item" target="_blank" :href="'https://xrpscan.com/tx/' + $route.params.hash"><i class="fad fa-external-link me-2"></i><small>xrpscan.com</small></a></li>
          <li><a v-if="$store.getters.getNetwork === 'xrpl'" class="dropdown-item" target="_blank" :href="'https://xrplorer.com/transaction/' + $route.params.hash"><i class="fad fa-external-link me-2"></i><small>xrplorer.com</small></a></li>
          <li><a v-if="$store.getters.getNetwork === 'xrpl'" class="dropdown-item" target="_blank" :href="'https://xrpintel.com/tx/' + $route.params.hash"><i class="fad fa-external-link me-2"></i><small>xrpintel.com</small></a></li>
          <li><a v-if="$store.getters.getNetwork === 'xrpl'" class="dropdown-item" target="_blank" :href="'https://livenet.xrpl.org/transactions/' + $route.params.hash"><i class="fad fa-external-link me-2"></i><small>xrpl.org</small></a></li>
  
          <li><a v-if="$store.getters.getNetwork === 'xrpl-test'" class="dropdown-item" target="_blank" :href="'https://test.bithomp.com/explorer/' + $route.params.hash"><i class="fad fa-external-link me-2"></i><small>bithomp.com</small></a></li>
          <li><a v-if="$store.getters.getNetwork === 'xrpl-test'" class="dropdown-item" target="_blank" :href="'https://testnet.xrpl.org/transactions/' + $route.params.hash"><i class="fad fa-external-link me-2"></i><small>xrpl.org</small></a></li>

          <li><a v-if="$store.getters.getNetwork === 'xahau'" class="dropdown-item" target="_blank" :href="'https://xahauexplorer.com/explorer/' + $route.params.hash"><i class="fad fa-external-link me-2"></i><small>xahauexplorer.com</small></a></li>
          <li><a v-if="$store.getters.getNetwork === 'xahau'" class="dropdown-item" target="_blank" :href="'https://xahscan.com/tx/' + $route.params.hash"><i class="fad fa-external-link me-2"></i><small>xahscan.com</small></a></li>
        </ul>
      </div>
  
      <h4 class="nes blue">Transaction</h4>
  
      <code class="pre text-primary">{{ hash }}</code>
  
      <Loading v-if="Object.keys(transaction).length === 0" />
  
      <div class="mt-3" v-if="Object.keys(transaction).length > 0">
        <JsonRenderer :data="transaction" />
      </div>
    </main>
  </template>
  
  <script>
  import { useRoute } from 'vue-router'
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
        transaction: {},
        client: null,
        hash: ''
      }
    },
    watch: {
      '$route.fullPath' () {
        this.get()
      }
    },
    methods: {
      async get () {
        const route = useRoute()
        this.transaction = {}
  
        const transaction = await this.$store.getters.getClient.send({
          command: 'tx',
          ...(
            route.params.hash.length === 16 ? { ctid: route.params.hash } : { transaction: route.params.hash }
          )
        })
        this.hash = route.params.hash
        this.transaction = transaction
      }
    },
    async mounted () {
        console.log('Transaction mounted....')
      this.get()
    }
  }
  </script>
  
  <style lang="scss" scoped>
  </style>