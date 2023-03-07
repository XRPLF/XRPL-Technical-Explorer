export default {
  async install (Vue, options) {
    Vue.prototype.$ledger = new Vue({
      data () {
        return {
          ledgers: []
        }
      },
      computed: {
        list () {
          return this.ledgers.map(l => l.ledgerIndex)
        }
      },
      created () {
        this.$events.on('route:ledger', ledger => {
          // console.log('ledger.js', ledger)
          this.hydrate(ledger)
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
            return this.hydrate(ledger)
          }
        },
        async hydrate (ledger) {
          const ledgerIndex = Number(ledger)
          if (this.ledgers.filter(l => l.ledgerIndex === ledgerIndex).length > 0) {
            console.log('Skip hydrating: known', ledger)
          } else {
            // console.log('Hydrate', ledger)

            const existingRecordIndex = this.ledgers.map(l => l.ledgerIndex).indexOf(ledgerIndex)
            if (existingRecordIndex < 0) {
              this.ledgers.push({ ledgerIndex, ledgerData: {} })
            }

            const ledgerData = await this.$ws.send({ command: 'ledger', ledger: Number(ledger), transactions: true, expand: true })
            // console.log(ledgerData)
            Object.assign(this.ledgers[this.ledgers.map(l => l.ledgerIndex).indexOf(ledgerIndex)], {
              ledgerData
            })

            // console.log('Hydrated', ledger)
            return ledgerData
          }
        }
      }
    })
  }
}
