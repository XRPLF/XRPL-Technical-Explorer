<template>
  <main class="container-fluid">
    <h4 class="nes blue">Ledger Entry</h4>
    <code class="pre text-primary">{{ $router.currentRoute.params.hash }}</code>

    <Loading v-if="Object.keys(entry).length === 0" />

    <div class="mt-3" v-if="Object.keys(entry).length > 0">
      <JsonRenderer :data="entry" />
    </div>
  </main>
</template>

<script>
import JsonRenderer from '../views/JsonRenderer.vue'
import Loading from '../views/Loading.vue'

export default {
  name: 'LedgerEntry',
  components: {
    JsonRenderer,
    Loading
  },
  data () {
    return {
      entry: {}
    }
  },
  watch: {
    '$route.fullPath' () {
      this.get()
    }
  },
  methods: {
    async get () {
      this.entry = {}

      const entry = await this.$ws.send({
        command: 'ledger_entry',
        index: this.$router.currentRoute.params.hash
      })
      this.entry = entry
    }
  },
  async mounted () {
    this.get()
  }
}
</script>

<style lang="scss" scoped>
</style>
