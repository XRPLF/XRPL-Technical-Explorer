<template>
    <div class="fixed-top nav-scroller bg-body shadow-sm" style="z-index: 10">
      <nav class="nav nav-underline" aria-label="Secondary navigation">
        <div class="ms-2 pe-3" v-show="pinnedList.length > 0">
          <i class="pinned-ledgers fas fa-thumbtack d-inline mt-3 float-start text-dark"></i>
          <div class="btn-group ms-2 py-1">
            <span v-for="ledger in pinnedList" v-bind:key="ledger" class="pinned-ledger px-0 py-0 mt-1 btn" :class="{ 'btn-warning': currentLedger !== ledger, 'btn-primary shadow-sm fw-bold active': currentLedger === ledger }">
              <router-link :to="'/' + String(ledger)" class="text-decoration-none ps-2 pe-1" :class="{ 'text-dark': currentLedger !== ledger, 'text-white': currentLedger === ledger }">
                {{ ledger }}
                <span v-if="pinnedList.indexOf(Number(ledger)) > -1" style="top: -3px; left: -4px;" class="badge bg-blue fw-bold ms-0 me-0 d-inline px-1 pt-0 pb-0 text-dark bg-white rounded-pill align-text-bottom">{{ typeof getTxCount(ledger) === 'number' ? getTxCount(ledger) : '…' }}</span>
              </router-link>
              <button @click="purge(ledger)" class="me-2 border-0 bg-transparent px-0 py-0" :class="{ 'text-dark': currentLedger !== ledger, 'text-white': currentLedger === ledger }">&times;</button>
            </span>
          </div>
        </div>
        <span v-if="!connected" class="blue await-close ms-3 pt-2"><small>Connecting...</small></span>
        <span v-if="connected && ledgers.length === 0" class="blue await-close ms-3 pt-2"><small>Waiting for the next ledger to close...</small></span>
        <router-link @click="pinLedger(l.ledger_index)" :to="'/' + String(l.ledger_index)" v-for="l in ledgers" v-bind:key="l.ledger_index" class="nav-link px-0">
          <div class="ps-2 pe-1" v-if="ledgerList.indexOf(l.ledger_index) > -1">
            <span disabled class="text-muted"><small><i class="far fa-thumbtack"></i> {{ l.ledger_index }}</small></span>
          </div>
          <div class="px-3" v-else>
            <span class="blue" :class="{'fw-bold': l.txn_count > 0}">{{ l.ledger_index }}</span>
            <span v-if="l.txn_count > 0" class="badge bg-blue fw-bold ms-1 text-white rounded-pill align-text-bottom">{{ l.txn_count }}</span>
          </div>
        </router-link>
      </nav>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Ledgers',
    data () {
      return {
        client: undefined,
        ledgers: [],
        pinned: [],
        connected: false
      }
    },
    computed: {
        pinnedList() {
          return this.pinned.map(l => l.ledgerIndex)
        },
        ledgerList () {
          return this.ledgers.map(l => l.ledgerIndex)
        },
        currentLedger () {
            return Number(this.$route?.params?.ledger || 0)
        },
        restarted () {
          return this.$store.getters.getClientReset
        }
    },
    watch: {
      restarted (value) {
        this.ledgers = []
        this.pinned = []
        // this.$store.getters.getClient.off('ledger', this.addLedger)
        if (value === false) {
          console.log('Updating attcheLedgersClose')
          this.attcheLedgersClose()
        }
      }
    },
    methods: {
      async pinLedger(path) {
        const ledgerIndex = Number(path)
        const matched = this.$store.getters.ledgers.filter(l => {return l.ledgerIndex === ledgerIndex}).pop()
        if (matched) {
          this.$router.push('/' + path)
          if (this.pinned.indexOf(matched) < 0) {
            this.pinned.unshift(matched)
            this.getTxCount(matched.ledgerIndex)
          }
        }
        
      },
      addLedger (ledger) {
        // console.log('ledgerledger', Number(ledger.ledger_index))
        this.$store.getters.hydrateLedger(Number(ledger.ledger_index))

        if (this.ledgers.indexOf(ledger) < 0) {
          this.ledgers.unshift(ledger)
          this.ledgers.splice(20)
        }
      },
      purge (ledgerIndex) {
        const matched = this.$store.getters.ledgers.filter(l => {return l.ledgerIndex === ledgerIndex})
        if (matched) {
          const index = this.pinned.indexOf(matched[0])
          if (index > -1) {
            this.pinned.splice(index, 1)
          }
        }
        if (this.$router?.params?.ledger === String(ledgerIndex)) {
          this.$router.push('/')
        }
      },
      getLedger (ledgerIndex) {
        const matchedLedgers = this.ledgers.filter(l => l.ledger_index === ledgerIndex)
        if (matchedLedgers) {
            return matchedLedgers[0]
        }
      },
      getLedgerX (ledger) {
          const ledgerIndex = Number(ledger)
          const matched = this.$store.getters.ledgers.filter(l => l.ledgerIndex === ledgerIndex)
          if (matched) {
            return matched[0]?.ledgerData
          } else {
            return this.$store.getters.hydrateLedger(ledgerIndex)
          }
      },
      getTxCount (ledgerIndex) {
        const local = this.$store.getters.ledgers.filter(l => l.ledger_index === ledgerIndex)
        if (Array.isArray(local) && local.length > 0) {
          return local[0].txn_count
        }
        const ledger = this.getLedgerX(ledgerIndex)
        if (ledger?.error) {
          return 0
        }
        return ledger?.ledger?.transactions?.length
      },
      attcheLedgersClose () {
        const self =  this    
        if (typeof this.$store.getters.getClient !== 'undefined') {
            console.log('online', this.$store.getters.getClient.getState().online)
            if (this.$store.getters.getClient.getState().online) {
                this.connected = true
            }
        }

        this.$store.getters.getClient.on('connected', () => {
            self.connected = true
        })

        this.$store.getters.getClient.on('ledger', this.addLedger)
      }
    },
    components: {
    },
    
    mounted () {    
        // this.attcheLedgersClose()
    },
    destroyed () {
      this.$store.getters.getClient.off('ledger', this.addLedger)
    }
  }
  </script>
  
  <style lang="scss" scoped>
    .pinned-ledgers { top: -0.05em; position: relative; }
    .pinned-ledger { height: 1.8em; top: 0.03em }
    .await-close { opacity: 0.5; line-height: 1.7em; }
  </style>