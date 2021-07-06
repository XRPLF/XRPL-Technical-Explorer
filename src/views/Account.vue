<template>
  <main class="container-fluid">
    <h4 class="nes blue">Account</h4>
    <code class="pre text-primary">{{ $router.currentRoute.params.account }}</code>

    <!-- <JsonRenderer :data="$router.currentRoute.params" /> -->

    <Loading v-if="Object.keys(account).length === 0" />

    <div class="mt-3" v-if="Object.keys(account).length > 0">
      <h5 class="nes h6">Account info</h5>
      <JsonRenderer :data="account" />
    </div>

    <div class="mt-3" v-if="Object.keys(transactions).length > 0">
      <h5 class="nes h6">Transactions</h5>
      <JsonRenderer :data="transactions" />
    </div>
  </main>
</template>

<script>
import JsonRenderer from '../views/JsonRenderer.vue'
import Loading from '../views/Loading.vue'

export default {
  name: 'Account',
  components: {
    JsonRenderer,
    Loading
  },
  data () {
    return {
      account: {},
      transactions: {}
    }
  },
  watch: {
    '$route.fullPath' () {
      this.get()
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
      this.account = account.account_data

      const transactions = await this.$ws.send({
        command: 'account_tx',
        account: this.$router.currentRoute.params.account,
        limit: 10
      })

      this.transactions = transactions.transactions.map(t => t.tx)
      console.log(transactions?.marker)
    }
  },
  async mounted () {
    this.get()
  }
}
</script>

<style lang="scss" scoped>
</style>
