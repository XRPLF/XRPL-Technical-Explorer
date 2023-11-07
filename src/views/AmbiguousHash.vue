<template>
    <div>
      <h4 class="nes blue">Ambiguous hash</h4>
      <code class="pre text-primary">{{ hash }}</code>
  
      <p class="pt-3">
        What's the one you're looking for?
      </p>
  
      <ul class="list-unstyled">
        <li v-for="entry, key in entries" v-bind:key="key">
          <router-link :to="l(entry)" class="nes-btn py-0 mb-3 nes is-warning">{{ t(entry, 'command') }}</router-link>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { useRoute } from 'vue-router'

  export default {
    name: 'AmbiguousHash',
    props: ['entries'],
    data () {
      return {
        hash: ''
      }
    },
    methods: {
      l (entry) {
        // Semi duplicate logic in ResolveHash.vue
        if (entry.command === 'tx') {
          return '/tx/' + entry.result.hash
        }
        if (entry.command === 'ledger_entry') {
          return '/entry/' + entry.result.index
        }
        if (entry.command === 'ledger') {
          return '/' + entry.result.ledger.seqNum
        }
        return '/'
      },
      t (entry, key) {
        if (entry !== null && typeof entry === 'object' && typeof key === 'string' && typeof entry[key] !== 'undefined') {
          if (entry[key] === 'tx') {
            return 'Transaction'
          }
          if (entry[key] === 'ledger_entry') {
            return 'Ledger Entry'
          }
          if (entry[key] === 'ledger') {
            return 'Ledger ' + entry.result.ledger.seqNum
          }
        }
  
        return key
      }
    },
    mounted() {
      const route = useRoute()
      this.hash = route.params.hash 
    }
  }
  </script>
  
  <style lang="scss" scoped>
  </style>