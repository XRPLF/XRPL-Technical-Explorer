<template>
  <main class="container-fluid">
    <!-- <div class="card shadow-sm mb-4 alert-warning">
      <div class="card-body px-2 py-1">
        <small>{{ $ledger.list }}</small>
      </div>
    </div> -->

    <h4 class="nes blue">Ledger</h4>
    <code class="text-primary nes">{{ $route.params.ledger }}</code>

    <div v-if="selectedLedgerFetched">
      <div v-if="selectedLedger.error">
        <JsonRenderer :data="selectedLedger" />
      </div><!-- selectedLedger.error -->
      <div v-else>
        <!--
          <code><small class="d-block mt-2"><small>validated</small></small><span class="ps-4 pre text-dark">{{ selectedLedger.validated }}</span></code><br />
          <code><small class="d-block mt-2"><small>close_time_human</small></small><span class="ps-4 pre text-dark">{{ selectedLedger.ledger.close_time_human }}</span></code><br />
          <code><small class="d-block mt-2"><small>hash</small></small><span class="ps-4 pre text-dark">{{ selectedLedger.ledger.hash }}</span></code><br />
          <code><small class="d-block mt-2"><small>ledger_index</small></small><span class="ps-4 pre text-dark">{{ selectedLedger.ledger.ledger_index }}</span></code><br />
          <code><small class="d-block mt-2"><small>totalCoins</small></small><span class="ps-4 pre text-dark">{{ selectedLedger.ledger.totalCoins }}</span></code><br />
          <code><small class="d-block mt-2"><small>closed</small></small><span class="ps-4 pre text-dark">{{ selectedLedger.ledger.closed }}</span></code><br />
          <code><small class="d-block mt-2"><small>accepted</small></small><span class="ps-4 pre text-dark">{{ selectedLedger.ledger.accepted }}</span></code><br />
        -->

        <!-- <h3 class="fw-bold h4 mt-4">Ledger</h3> -->
        <JsonRenderer :data="selectedLedgerWithoutTransactions" />

        <h3 class="fw-bold h4 mt-4">Transactions</h3>
        <JsonRenderer :data="selectedLedgerTransactions" />
      </div><!-- v-else selectedledger.error -->
    </div><!-- selectedLedgerFetched -->
    <div v-else>
      <Loading />
    </div><!-- v-else selectedLedgerFetched -->
  </main>
</template>

<script>
import JsonRenderer from '../views/JsonRenderer.vue'
import Loading from '../views/Loading.vue'

export default {
  name: 'Ledger',
  components: {
    JsonRenderer,
    Loading
  },
  data () {
    return {}
  },
  computed: {
    selectedLedgerWithoutTransactions () {
      return Object.assign({}, {
        ...this.selectedLedger.ledger,
        transactions: this.selectedLedger.ledger.transactions.map(tx => tx.hash)
      })
    },
    selectedLedger () {
      return this.$ledger.getLedger(this.$route.params.ledger)
    },
    selectedLedgerFetched () {
      const ledgerKeys = Object.keys(this.selectedLedger || {})
      return ledgerKeys.indexOf('ledger') > -1 || ledgerKeys.indexOf('error') > -1
    },
    selectedLedgerTransactions () {
      return this.selectedLedger?.ledger?.transactions?.map(l => {
        const r = {
          hash: l.hash,
          type: l.TransactionType
        }
        const keys = Object.keys(l)
        const addKeys = [
          'Account',
          'Destination',
          'DestinationTag',
          'SourceTag',
          'Amount'
        ]

        addKeys.forEach(k => {
          if (keys.indexOf(k) > -1) {
            Object.assign(r, { [k]: l[k] })
          }
        })

        return r
      })
    }
  },
  methods: {
    jsonClick (e) {
      console.log('click', e)
    }
  },
  watch: {},
  mounted () {
    this.$ledger.hydrate(this.$route.params.ledger)
  }
}
</script>

<style lang="scss" scoped>
</style>
