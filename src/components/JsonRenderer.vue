<template>
  <div>
    <vue-json-pretty
      ref="json"
      :show-length="true"
      :collapsed-on-click-brackets="true"
      :show-line="true"
      :show-double-quotes="false"
      :data="formatted ? dataFormatted : data"
      :deep="2"
      @node-click="click"
    >
    <template #nodeValue="{ node, defaultValue }">
      <!-- Hooks Burn 2 Mint -->
      <template v-if="node.key === 'Blob' && data?.TransactionType === 'Import'">
        <div class="value d-inline-block">
          <small @click="toggle(node.path)" class="px-1 alert alert-warning text-dark py-0 mb-1 d-block">Click key to display &amp; toggle between HEX and JSON + Binary Decoded view</small>
          <span v-if="formatted !== null">{{ defaultValue }}</span>
        </div>
      </template>
      <template v-else>{{ defaultValue }}</template>
    </template>
    <template #nodeKey="{ node, defaultKey }">
      <template v-if="node.key === 'Blob' && data?.TransactionType === 'Import'">
        <span :ref="node.path.replace(/[^a-zA-Z0-9]+/g, '')" @click="toggle(node.path)"><u class="text-primary">{{ defaultKey }}</u></span>
      </template>
      <template v-else>{{ defaultKey }}</template>
    </template>
  </vue-json-pretty>
  </div>
</template>

<script>
// TODO: MEMO decoding, etc.

import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'
import { hookHashToLedgerObjectHash } from '../plugins/helpers'
import { decode, decodeLedgerData } from 'ripple-binary-codec'

export default {
  name: 'JsonRenderer',
  props: ['data'],
  components: {
    VueJsonPretty
  },
  data () {
    return {
      formatted: null
    }
  },
  computed: {
    dataFormatted () {
      const modifiedData = {}
      if (this.data?.TransactionType === 'Import') {
        if (this.data?.Blob) {
          Object.assign(modifiedData, {
            Blob: JSON.parse(
              Buffer.from(this.data.Blob, 'hex')
                .toString()
                /**
                 * Now going to replace embedded contents like binary encoded & JSON data
                 */
                .replace(/"[A-F0-9]{129,}"/g, r => { // Making sure it's > 128 (signature)
                  try {
                    const hex = r.slice(1, -1)
                    return JSON.stringify(decode(hex))
                  } catch (e) {
                    //
                  }
                  return r
                })
                .replace(/"ey[a-zA-Z0-9=/+]{30,}"/g, r => { // {"... (JSON Start) is always ^ey... in base64
                  try {
                    const base64 = r.slice(1, -1)
                    return Buffer.from(base64, 'base64').toString()
                  } catch (e) {
                    //
                  }
                  return r
                })
                .replace(/"JAAAAA[a-zA-Z0-9=/+]{30,}"/g, r => { // {"... (Manifest Start) is always ^JAAAAA... in base64
                  try {
                    const base64 = r.slice(1, -1)
                    // Manifests can be decoded from base64 and then decoded with Binary Codec
                    return JSON.stringify(decodeLedgerData(Buffer.from(base64, 'base64').toString('hex')))
                  } catch (e) {
                    //
                  }
                  return r
                })
            )
          })
        }
      }

      return Object.assign({}, {
        ...this.data,
        ...modifiedData
      })
    }
  },
  methods: {
    toggle (ref) {
      // const _ref = ref.replace(/[^a-zA-Z0-9]+/g, '')
      // this.$refs?.[_ref]
      this.formatted = !this.formatted
    },
    click (event) {
      const value = event.content
      const fieldName = event.path.split('.').reverse()[0].toLowerCase()
      // console.log('JSON click event', event, fieldName, value)

      let newRoute

      if (String(value).match(/^r[a-zA-Z0-9]{15,}/)) {
        // Account
        newRoute = '/' + value
      }

      if (String(value).match(/^[a-zA-Z0-9]{16}/)) {
        // CTID
        newRoute = '/' + value
      }

      if (String(value).match(/^[a-fA-F0-9]{64}$/) && !fieldName.match(/signature|marker|account_hash|transaction_hash/i)) {
        // Hash
        if (fieldName === 'hookhash' || fieldName === 'emithookhash') {
          newRoute = '/' + hookHashToLedgerObjectHash(value)
        } else {
          newRoute = '/' + value
        }
      }
      if (String(value).match(/^[0-9]{1,}$/) && Number(value) >= 1 && Number(value) <= this.$ws.getState().ledger.last) {
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

      // if (fieldName.toLowerCase() === 'blob' && String(value).match(/^[a-fA-F0-9]{10,}$/) && this.data?.TransactionType === 'Import') {
      //   console.log('Proof of Burn', { newRoute })
      // }

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
