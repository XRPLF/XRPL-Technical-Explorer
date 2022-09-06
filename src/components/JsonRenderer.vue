<template>
  <div>
    <vue-json-pretty
      :showLength="true"
      :collapsedOnClickBrackets="true"
      :showLine="true"
      :showDoubleQuotes="false"
      :data="data"
      @click="click"
    />
  </div>
</template>

<script>
// TODO: MEMO decoding, etc.

import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'
import { hookHashToLedgerObjectHash } from '../plugins/helpers'

export default {
  name: 'JsonRenderer',
  props: ['data'],
  components: {
    VueJsonPretty
  },
  methods: {
    click (event, value) {
      const fieldName = event.split('.').reverse()[0].toLowerCase()
      console.log('JSON click event', event, fieldName, value)

      let newRoute

      if (String(value).match(/^r[a-zA-Z0-9]{15,}/)) {
        // Account
        newRoute = '/' + value
      }

      if (String(value).match(/^[a-fA-F0-9]{64}$/) && !fieldName.match(/marker|account_hash|transaction_hash/)) {
        // Hash
        if (fieldName === 'hookhash' || fieldName === 'emithookhash') {
          newRoute = '/' + hookHashToLedgerObjectHash(value)
        } else {
          newRoute = '/' + value
        }
      }
      if (String(value).match(/^[0-9]{5,}$/) && Number(value) >= 32570 && Number(value) <= this.$ws.getState().ledger.last) {
        // Ledger Index
        if (!fieldName.match(/sequence/)) {
          newRoute = '/' + value
        }
      }

      if (fieldName.match(/hooknamespace/) && this.data?.Account) {
        // Hook Namespace
        newRoute = '/namespace/' + this.data.Account + '/' + value
        console.log('Hook Namespace', { newRoute })
      }

      if (fieldName.match(/hookstate|nftokenid/)) {
        return
      }

      if (newRoute) {
        // Check if not there yet
        if (this.$router.currentRoute.path !== newRoute) {
          console.log('Navigate', this.$router.currentRoute.path, newRoute)
          this.$router.push(newRoute)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
