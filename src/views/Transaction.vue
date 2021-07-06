<template>
  <main class="container-fluid">
    <h4 class="nes blue">Transaction</h4>
    <code class="pre text-primary">{{ $router.currentRoute.params.hash }}</code>

    <Loading v-if="Object.keys(transaction).length === 0" />

    <div class="mt-3" v-if="Object.keys(transaction).length > 0">
      <JsonRenderer :data="transaction" />
    </div>
  </main>
</template>

<script>
import JsonRenderer from '../views/JsonRenderer.vue'
import Loading from '../views/Loading.vue'

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
