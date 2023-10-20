<template>
  <div style="margin-left: 10px;">
    <div style="display: flex; align-items: center; margin-bottom: 10px;">
      <label style="margin: 0px;">Activated Ledger:</label>
      <div style="margin-left: 10px;">{{ activatedLedger }}</div>
    </div>
    <form @submit.prevent="submitForm" style="margin-bottom: 10px;">
      <div>
        <label for="burnAmount">Burn Amount:</label>
        <input
          style="margin-left: 10px;"
          type="number"
          id="burnAmount"
          v-model.number="burnAmount"
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
    <div style="display: flex; align-items: center;">
      <label style="margin: 0px;">Calculated Value:</label>
      <div style="margin-left: 10px;">{{ calculatedValue }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ledgerIndex: null,
      activatedLedger: null,
      burnAmount: null,
      calculatedValue: null
    }
  },
  methods: {
    addLedger (ledger) {
      this.ledgerIndex = ledger.ledger_index
      this.getActivationLedger()
    },
    async getActivationLedger () {
      const data = await this.$ws.send({
        command: 'ledger_entry',
        index: '4BC50C9B0D8515D3EAAE1E74B29A95804346C491EE1A95BF25E4AAB854A6A651'
      })
      this.activatedLedger = data.node.XahauActivationLgrSeq || this.ledgerIndex
    },
    submitForm () {
      function calculateHalving (value) {
        if (value < 2000000) {
          return 1
        } else if (value >= 30000000) {
          return 0
        } else {
          return 1 - (value - 2000000) / 28000000
        }
      }
      if (this.validateInput()) {
        const ledgersClosed = this.ledgerIndex - this.activatedLedger
        this.calculatedValue = calculateHalving(ledgersClosed) * this.burnAmount
      } else {
        console.log('Invalid input')
      }
    },
    validateInput () {
      return (
        typeof this.burnAmount === 'number'
      )
    }
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
