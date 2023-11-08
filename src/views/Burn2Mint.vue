<template>
    <div v-if="$store.getters.getNetworkType === 'mainnet'">
        <div class="flex mb-2">
            <label class="nes blue">Activated Ledger:</label>
            <span class="nes blue ms-2">{{ activatedLedger }}</span>
        </div>
        <form @submit.prevent="submitForm" class="mb-2">
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
        <div class="flex">
            <label class="nes blue">Calculated Value:</label>
            <span class="nes blue ms-2">{{ calculatedValue }}</span>
        </div>
    </div>
    <div v-else>
        <h2 class="nes blue text-center">Burn2Mint mainnet only</h2>
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
            const data = await this.$store.getters.getClient.send({
                command: 'ledger_entry',
                index: '4BC50C9B0D8515D3EAAE1E74B29A95804346C491EE1A95BF25E4AAB854A6A651'
            })
            this.activatedLedger = data.node.XahauActivationLgrSeq || this.ledgerIndex
        },
        submitForm () {
            function calculateHalving (value) {
                if (value < 2000000) { return 1 }
                if (value >= 30000000) { return 0 } 
                return 1 - (value - 2000000) / 28000000
            }
            if (this.validateInput()) {
                const ledgersClosed = this.ledgerIndex - this.activatedLedger
                this.calculatedValue = calculateHalving(ledgersClosed) * this.burnAmount
                return
            }
            console.log('Invalid input')
        },
        validateInput () {
            return (
                typeof this.burnAmount === 'number'
            )
        }
    },
    mounted () {
        if (typeof this.$store.getters.getClient !== 'undefined') {
            if (this.$store.getters.getClient.getState().online) {
                this.connected = true
            }
        }

        this.$store.getters.getClient.on('ledger', this.addLedger)

        this.$store.getters.getClient.on('connected', () => {
            this.connected = true
        })
    },
    destroyed () {
        this.$store.getters.getClient.off('ledger', this.addLedger)
    }
}
</script>