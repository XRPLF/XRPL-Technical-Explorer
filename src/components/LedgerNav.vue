<template>
  <div class="fixed-top nav-scroller bg-body shadow-sm" style="z-index: 10">
    <nav class="nav nav-underline" aria-label="Secondary navigation">
      <div class="ms-2 pe-3" v-show="$ledger.list.length > 0">
        <i class="pinned-ledgers fas fa-thumbtack d-inline mt-3 float-start text-dark"></i>
        <div class="btn-group ms-2 py-1">
          <!-- <span class="pinned-ledger px-0 py-0 mt-1 btn btn-primary fw-bold active" aria-current="page">
            <a href="#" class="px-2 text-white">Active link</a>
            <a href="#" class="text-white me-2">&times;</a>
          </span> -->
          <span v-for="ledger in $ledger.list" v-bind:key="ledger" class="pinned-ledger px-0 py-0 mt-1 btn" :class="{ 'btn-warning': currentLedger !== ledger, 'btn-primary shadow-sm fw-bold active': currentLedger === ledger }">
            <router-link :to="'/' + String(ledger)" class="text-decoration-none ps-2 pe-1" :class="{ 'text-dark': currentLedger !== ledger, 'text-white': currentLedger === ledger }">
              {{ ledger }}
              <span v-if="$ledger.list.indexOf(Number(ledger)) > -1" style="top: -3px; left: -4px;" class="badge bg-blue fw-bold ms-0 me-0 d-inline px-1 pt-0 pb-0 text-dark bg-white rounded-pill align-text-bottom">{{ typeof getTxCount(ledger) === 'number' ? getTxCount(ledger) : '…' }}</span>
            </router-link>
            <button @click="purge(ledger)" class="me-2 border-0 bg-transparent px-0 py-0" :class="{ 'text-dark': currentLedger !== ledger, 'text-white': currentLedger === ledger }">&times;</button>
          </span>
        </div>
      </div>
      <span v-if="!connected" class="blue await-close ms-3 pt-2"><small>Connecting...</small></span>
      <span v-if="connected && ledgers.length === 0" class="blue await-close ms-3 pt-2"><small>Waiting for the next ledger to close...</small></span>
      <router-link :to="'/' + String(l.ledger_index)" v-for="l in ledgers" v-bind:key="l.ledger_index" class="nav-link px-0">
        <div class="ps-2 pe-1" v-if="$ledger.list.indexOf(l.ledger_index) > -1">
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
      ledgers: [],
      connected: false
    }
  },
  methods: {
    addLedger (ledger) {
      if (this.ledgers.indexOf(ledger) < 0) {
        this.ledgers.unshift(ledger)
        this.ledgers.splice(20)
      }
    },
    purge (ledgerIndex) {
      this.$ledger.purge(ledgerIndex)
      if (this.$router.currentRoute?.params?.ledger === String(ledgerIndex)) {
        this.$router.push('/')
      }
    },
    getLedger (ledgerIndex) {
      const matchedLedgers = this.ledgers.filter(l => l.ledger_index === ledgerIndex)
      if (matchedLedgers) {
        return matchedLedgers[0]
      }
    },
    getTxCount (ledgerIndex) {
      const local = this.ledgers.filter(l => l.ledger_index === ledgerIndex)
      if (Array.isArray(local) && local.length > 0) {
        return local[0].txn_count
      }
      const ledger = this.$ledger.getLedger(ledgerIndex)
      if (ledger?.error) {
        return 0
      }
      return ledger?.ledger?.transactions?.length
    }
  },
  computed: {
    currentLedger () {
      return Number(this.$route?.params?.ledger || 0)
    }
  },
  components: {
  },
  mounted () {
    if (typeof this.$ws !== 'undefined') {
      if (this.$ws.getState().online) {
        this.connected = true
      }
    }

    this.$events.on('ledger', this.addLedger)

    this.$events.on('connected', () => {
      this.connected = true
    })
  },
  destroyed () {
    this.$events.off('ledger', this.addLedger)
  }
}
</script>

<style lang="scss" scoped>
  .pinned-ledgers { top: -0.05em; position: relative; }
  .pinned-ledger { height: 1.8em; top: 0.03em }
  .await-close { opacity: 0.5; line-height: 1.7em; }
</style>
