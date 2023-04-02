<template>
  <div>
    <vue-json-pretty
      ref="json"
      :show-length="true"
      :collapsed-on-click-brackets="true"
      :show-line="true"
      :show-double-quotes="false"
      :data="data"
      @node-click="click"
    />
  </div>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty'
import JsonRendererToast from './JsonRendererToast.vue'
import 'vue-json-pretty/lib/styles.css'
import { hookHashToLedgerObjectHash } from '../plugins/helpers'

function decodeHex (str1) {
  const hex = str1.toString()
  let str = ''
  for (let n = 0; n < hex.length; n += 2) {
    str += String.fromCharCode(parseInt(hex.substr(n, 2), 16))
  }
  return str
}

export default {
  name: 'JsonRenderer',
  props: ['data', 'useToastAction'],
  components: {
    VueJsonPretty
  },
  methods: {
    click (event) {
      const value = event.content
      const fieldName = event.path.split('.').reverse()[0].toLowerCase()
      // console.log('JSON click event', event, fieldName, value)

      let newRoute, humanizeMemo

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

      if (fieldName.match(/memo/) && String(value).match(/^[A-F0-9]{6,}$/)) {
        humanizeMemo = decodeHex(value)
      }

      if (fieldName.match(/hookstate|nftokenid/)) {
        return
      }

      if (this.useToastAction && newRoute) {
        this.$toast({
          component: JsonRendererToast,
          props: {
            title: `Open "${fieldName}" link?`,
            buttonText: 'Go'
          },
          listeners: {
            clicked: () => window.open(newRoute, '_blank')
          }
        }, {
          position: 'bottom-right',
          timeout: 3000
        })
      } else if (this.useToastAction && humanizeMemo) {
        this.$toast(humanizeMemo, {
          position: 'bottom-right',
          timeout: 3000
        })
      } else if (newRoute) {
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
