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
  import JsonRenderer from '../components/JsonRenderer.vue'
  import Loading from '../components/Loading.vue'
  
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
        return this.getLedgerX
      },
      getLedgerX () {
          const ledgerIndex = Number(this.$route.params.ledger)
          const matched = this.$store.getters.ledgers.filter(l => l.ledgerIndex === ledgerIndex)
          if (matched) {
            return matched[0]?.ledgerData
          } else {
            return this.$store.getters.hydrateLedger(ledgerIndex)
          }
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
    async mounted () {
        console.log('fetching')
        console.log(this.$route.params.ledger)
        await this.$store.getters.hydrateLedger(Number(this.$route.params.ledger))
    }
  }
  </script>
  
  <style lang="scss" scoped>
  </style>