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
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'

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
      if (String(value).match(/^[a-fA-F0-9]{64}$/)) {
        // Account
        newRoute = '/' + value
      }
      if (String(value).match(/^[0-9]{5,}$/) && Number(value) >= 32570 && Number(value) <= this.$ws.getState().ledger.last) {
        // Ledger Index
        if (!fieldName.match(/sequence/)) {
          newRoute = '/' + value
        }
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
