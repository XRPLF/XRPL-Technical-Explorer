<template>
    <div class="pb-5">
      <h4 class="mt-4 h5 nes blue">{{ $route.meta.title }}</h4>
  
      <Loading v-if="!loaded" />
      <div v-else>
        <div class="mt-3" v-if="Object.keys(data).length > 0">
          <JsonRenderer :data="data" />
          <button @click="get(marker)" v-if="marker && marker !== null" class="mt-3 py-1 nes-btn is-warning">Load more...</button>
        </div>
        <div v-else>
          No data.
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import JsonRenderer from '../components/JsonRenderer.vue'
  import Loading from '../components/Loading.vue'
  
  export default {
    name: 'LedgerEntry',
    components: {
      JsonRenderer,
      Loading
    },
    data () {
      return {
        loaded: false,
        marker: null,
        data: [],
        client: null
      }
    },
    watch: {
      '$route.fullPath' () {
        this.get()
      }
    },
    methods: {
      async get (marker) {
        if (typeof marker === 'undefined') {
          this.marker = null
          this.data = []
          this.loaded = false
        }
  
        const data = await this.$store.getters.getClient.send({
          command: this.$route.name,
          account: this.$route.params.account,
          limit: 20,
          marker
        })
  
        console.log('marker', this.$route.name, data?.marker)
        this.loaded = true
  
        if (data[this.$route.meta.element]) {
          if (data?.marker || marker) {
            this.marker = data.marker
          }
          this.data = [
            ...this.data,
            ...data[this.$route.meta.element].map(r => {
              if (typeof this.$route.meta.map === 'string' && this.$route.meta.map !== '') {
                return r[this.$route.meta.map]
              }
              return r
            })
          ]
        }
      }
    },
    async mounted () {
      this.get()
    }
  }
  </script>
  
  <style lang="scss" scoped>
  </style>