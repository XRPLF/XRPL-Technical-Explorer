<template>
  <main class="container-fluid">
    <button @click="search" class="float-end py-0 px-2 ml-2 nes-btn is-primary">Search</button>
    <div style="width:100px;" class="float-end">
      <VueCtkDateTimePicker
        onlyTime right v-model="toTime"
        label="To Time"
        format="kk:mm"
        formatted="kk:mm"
        color="#183FB7"
      />
    </div>
    <div style="width:100px;" class="float-end">
      <VueCtkDateTimePicker
        onlyTime right v-model="fromTime"
        label="From Time"
        format="kk:mm"
        formatted="kk:mm"
        color="#183FB7"
      />
    </div>
    <div style="width:250px;" class="float-end">
      <VueCtkDateTimePicker
        range right v-model="dateRange"
        format="YYYY-MM-DD"
        formatted="ll"
        color="#183FB7"
      />
    </div>
    <h4 class="nes blue">Analytic</h4>
    <h4 class="nes blue mb-10">Hello</h4>
  </main>
</template>

<script>
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css'

export default {
  name: 'Analytic',
  components: {
    VueCtkDateTimePicker
  },
  data () {
    return {
      dateRange: { start: null, end: null },
      fromTime: null,
      toTime: null
    }
  },
  methods: {
    search () {
      console.log(this.dateRange.start, this.dateRange.end, this.fromTime)
    }
  },
  async mounted () {
  }
}
</script>

<style lang="scss" scoped>
main {
    height: 500px;
}
</style>
