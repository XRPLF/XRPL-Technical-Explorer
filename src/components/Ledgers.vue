<template>
  <div class="fixed-top nav-scroller bg-body shadow-sm">
    <nav class="nav nav-underline" aria-label="Secondary navigation">
      <i class="pinned-ledgers fas fa-thumbtack mt-3 text-dark ms-2 me-2"></i>
      <div class="btn-group py-1">
        <span class="pinned-ledger px-0 py-0 mt-1 btn btn-primary fw-bold active" aria-current="page">
          <a href="#" class="px-2 text-white">Active link</a>
          <a href="#" class="text-white me-2">&times;</a>
        </span>
        <span class="pinned-ledger px-0 py-0 mt-1 btn btn-warning">
          <a href="#" class="px-2 text-dark">Link</a>
          <a href="#" class="text-dark me-2">&times;</a>
        </span>
        <span class="pinned-ledger px-0 py-0 mt-1 btn btn-warning">
          <a href="#" class="px-2 text-dark">Link</a>
          <a href="#" class="text-dark me-2">&times;</a>
        </span>
      </div>
      <span v-if="!connected" class="blue await-close ms-3 pt-2"><small>Connecting...</small></span>
      <span v-if="connected && ledgers.length === 0" class="blue await-close ms-3 pt-2"><small>Waiting for the next ledger to close...</small></span>
      <a v-for="l in ledgers" v-bind:key="l.ledger_index" class="nav-link" href="#">
        <span :class="{'blue fw-bold': l.txn_count > 0, 'text-muted': l.txn_count === 0}">{{ l.ledger_index }}</span>
        <span v-if="l.txn_count > 0" class="badge bg-blue fw-bold ms-1 text-white rounded-pill align-text-bottom">{{ l.txn_count }}</span>
      </a>
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
      this.ledgers.unshift(ledger)
      this.ledgers.splice(25)
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
