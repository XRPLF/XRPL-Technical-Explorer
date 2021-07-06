<template>
  <main class="container-fluid">
    <div v-if="loading && found.length === 0">
      <Loading />
    </div>

    <Ambiguous v-if="found.length > 0" :entries="found" />
  </main>
</template>

<script>
import Loading from '../views/Loading.vue'
import Ambiguous from '../views/Ambiguous.vue'

export default {
  name: 'ResolveHash',
  components: {
    Loading,
    Ambiguous
  },
  data () {
    return {
      loading: true,
      found: []
    }
  },
  methods: {
    async route () {
      console.log(this.$router.currentRoute?.params?.hash)
      // Either TX, Ledger, Object or not found
      const hashTypes = [
        { command: 'ledger_entry', key: 'index' },
        { command: 'ledger', key: 'ledger_hash' },
        { command: 'tx', key: 'transaction' }
      ]

      const data = (await Promise.all(hashTypes.map(hashType => {
        const { command, key } = hashType
        return this.$ws.send({ command, [key]: this.$router.currentRoute?.params?.hash })
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

      if (data.length === 1) {
        const entry = data[0]

        // Semi duplicate logic in Ambiguous.vue
        if (entry.command === 'tx') {
          this.$router.replace('/tx/' + entry.result.hash)
        }
        if (entry.command === 'ledger_entry') {
          this.$router.replace('/entry/' + entry.result.index)
        }
        if (entry.command === 'ledger') {
          this.$router.replace('/' + entry.result.ledger.seqNum)
        }
      }

      if (data.length === 0) {
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
