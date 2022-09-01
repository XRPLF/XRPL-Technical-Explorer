<template>
  <main class="container-fluid">
    <h4 class="nes blue">Hook Namespace</h4>

    <code class="pre text-primary">{{ $router.currentRoute.params.hash }}</code>

    <Loading v-if="Object.keys(namespaceData).length === 0" />

    <div class="mt-3" v-if="Object.keys(namespaceData).length > 0">
      <JsonRenderer :data="namespaceData" />
    </div>
  </main>
</template>

<script>
import JsonRenderer from '../components/JsonRenderer.vue'
import Loading from '../components/Loading.vue'

export default {
  name: 'namespaceData',
  components: {
    JsonRenderer,
    Loading
  },
  data () {
    return {
      namespaceData: {}
    }
  },
  watch: {
    '$route.fullPath' () {
      this.get()
    }
  },
  methods: {
    async get () {
      this.namespaceData = {}

      console.log(this.$router.currentRoute.params)

      const namespaceData = await this.$ws.send({
        command: 'account_namespace',
        ...(this.$router.currentRoute.params || {})
      })
      this.namespaceData = namespaceData
    }
  },
  async mounted () {
    this.get()
  }
}
</script>

<style lang="scss" scoped>
</style>
