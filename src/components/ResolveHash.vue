<template>
    <main class="container-fluid">
      <div v-if="loading && found.length === 0">
        <Loading />
      </div>
  
      <AmbiguousHash v-if="found.length > 0" :entries="found" />
    </main>
  </template>
  
  <script>
  import { useRoute } from 'vue-router'
  import Loading from '../components/Loading.vue'
  import AmbiguousHash from '../views/AmbiguousHash.vue'
  import { hookHashToLedgerObjectHash } from '../plugins/helpers'
  
  export default {
    name: 'ResolveHash',
    components: {
      Loading,
      AmbiguousHash
    },
    data () {
      return {
        loading: true,
        found: []
      }
    },
    methods: {
      async route () {
        const route = useRoute()

        console.log('queryqueryqueryquery', route.query)
        // Either TX, Ledger, Object or not found
        const hashTypes = [
          { command: 'ledger_entry', key: 'index', valueHelper: hookHashToLedgerObjectHash },
          { command: 'ledger_entry', key: 'index' },
          { command: 'ledger', key: 'ledger_hash' },
          { command: 'tx', key: 'transaction' }
        ]
  
        const data = (await Promise.all(hashTypes.map(hashType => {
          const { command, key } = hashType
          const value = typeof hashType?.valueHelper === 'function' ? hashType.valueHelper(route?.params?.hash || '') : route?.params?.hash || ''
          return this.$store.getters.getClient.send({ command, [key]: value })
        })))
          .map((result, i) => {
            return {
              command: hashTypes[i].command,
              found: Object.keys(result).indexOf('error') < 0,
              result
            }
          })
          .filter(r => r.found)
  
        this.loading = false
        this.found = data
  
        let routed = false
        if (data.length === 1) {
          const entry = data[0]
  
          // Semi duplicate logic in AmbiguousHash.vue
          if (entry.command === 'tx' && entry.result?.hash) {
            this.$router.replace('/tx/' + entry.result.hash)
            routed = true
          }
          if (entry.command === 'ledger_entry' && entry.result?.index) {
            this.$router.replace('/entry/' + entry.result.index)
            routed = true
          }
          if (entry.command === 'ledger' && entry.result?.ledger?.seqNum) {
            this.$router.replace('/' + entry.result.ledger.seqNum)
            routed = true
          }
        }
  
        if (data.length === 0 || !routed) {
          return this.$router.replace({ name: 'notfound' })
        }
      }
    },
    mounted () {
      this.route()
    }
  }
  </script>
  
  <style lang="scss" scoped>
  </style>