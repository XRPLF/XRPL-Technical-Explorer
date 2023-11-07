<template>
</template>
  
  <script>
  export default {
    name: 'Ledger',
    data () {
        return {
            client: undefined,
            ledgers: []
        }
      },
      mounted () {
        console.log('ledger mounted....')
      },
      computed: {
        list () {
          return this.ledgers.map(l => l.ledgerIndex)
        }
      },
      created () {
        this.$store.dispatch('storageInit', true)
        if (this.$store.getters.getClientServers.length === 0) {
          const servers = ['wss://node.panicbot.xyz']
          this.$store.dispatch('setClientServers', servers)  
        }
        
        this.$store.dispatch('clientConnect', false)

        this.$store.getters.getClient.on('ledger', ledger => {
            this.$store.getters.hydrateLedger(ledger.ledger_index)
        })
      },
      methods: {
        purge (ledger) {
          const matched = this.ledgers.filter(l => l.ledgerIndex === Number(ledger))
          if (matched) {
            const index = this.ledgers.indexOf(matched[0])
            if (index > -1) {
              this.ledgers.splice(index, 1)
            }
          }
          // TODO: If no ledgers left: route back home
        },
        getLedger (ledger) {
          const ledgerIndex = Number(ledger)
          const matched = this.ledgers.filter(l => l.ledgerIndex === ledgerIndex)
          if (matched) {
            return matched[0]?.ledgerData
          } else {
            console.log('fetch hydrateLedger')
            return this.$store.getters.hydrateLedger(ledger)
          }
        }
      }
  }
  </script>
  
  <style lang="scss" scoped>
    .pinned-ledgers { top: -0.05em; position: relative; }
    .pinned-ledger { height: 1.8em; top: 0.03em }
    .await-close { opacity: 0.5; line-height: 1.7em; }
  </style>