<template>
  <main class="container-fluid">
    <form class="d-flex float-end" @submit="search">
      <input v-model="fromIndex" class="border border-2 border-dark py-0 me-2" type="search" style="width:120px;"
        placeholder="From LedgerIndex" aria-label="Search">
      <input v-model="toIndex" class="border border-2 border-dark py-0 me-2" type="search" style="width:120px;"
        placeholder="To LedgerIndex" aria-label="Search">
      <button @click="search" class="float-end py-0 px-2 ml-2 nes-btn is-primary">Search</button>
    </form>
    <h4 class="nes blue">Analytic</h4>

    <VueApexCharts width="500" type="bar" :options="chart.options" :series="chart.series" ref="chart"></VueApexCharts>
  </main>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

export default {
  name: 'Analytic',
  components: {
    VueApexCharts
  },
  data () {
    return {
      fromIndex: null,
      toIndex: null,
      chart: {
        options: {
          chart: {
            id: 'vuechart-example',
            events: {
              dataPointSelection: function (event, chartContext, config) {
                // The last parameter config contains additional information like `seriesIndex` and `dataPointIndex` for cartesian charts
                console.log(event, chartContext, config)
              }
            },
          },
          xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
          }
        },
        series: [{
          name: 'series-1',
          data: [30, 40, 45, 50, 49, 60, 70, 91]
        }]
      }
    }
  },
  methods: {
    search (e) {
      e.preventDefault()
      console.log(this.fromIndex, this.toIndex)
      this.chart.series[0].data[0] += 5
      this.$refs.chart.updateSeries([{
        data: this.chart.series[0].data
      }], true)

      // this.$refs.chart.appendSeries({
      //   name: 'newSeries',
      //   data: [32, 44, 31, 41, 22]
      // })
    }
  },
  async mounted () {
  }
}
</script>

<style lang="scss" scoped></style>
