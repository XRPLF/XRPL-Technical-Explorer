<template>
  <div>
    <main v-if="!connected" class="container-fluid">
      <span class="blue await-close ms-3 pt-2"><small>Connecting...</small></span>
    </main>
    <main v-if="connected" class="container-fluid">
      <div class="d-flex float-end">
        <button v-if="paused" @click="paused=!paused" class="py-0 px-2 ml-2 nes-btn is-success">Play</button>
        <button v-if="!paused" @click="paused=!paused" class="py-0 px-2 ml-2 nes-btn is-warning">Paused</button>
        <button @click="clearAll" class="nes-btn">Clear All</button>
      </div>
      <form class="d-flex" @submit="addPinLedger">
        <input v-model="fromIndex" class="border border-2 border-dark py-0 me-2" type="search" style="width:120px;"
          placeholder="From Index" aria-label="Search">
        <input v-model="toIndex" class="border border-2 border-dark py-0 me-2" type="search" style="width:120px;"
          placeholder="To Index" aria-label="Search">
        <button class="py-0 px-2 ml-2 nes-btn is-primary">Add Ledgers</button>
      </form>

      <hr />

      <h4 class="nes blue">Analytic</h4>
      <div class="d-flex">
        <VueApexCharts width="400" height="400" type="donut" :options="donut.chartOptions" :series="donut.series" ref="donut"></VueApexCharts>
        <VueApexCharts width="500" height="400" type="bar" :options="bar.options" :series="bar.series" ref="bar"></VueApexCharts>
      </div>
    </main>
  </div>
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
      connected: false,
      paused: true,
      fromIndex: null,
      toIndex: null,
      donut: {
        series: [],
        chartOptions: {
          labels: [],
          title: {
            text: 'Count by TransactionType',
            align: 'left',
            style: {
              fontWeight: 'bold',
              color: '#263238'
            }
          },
          legend: {
            show: true,
            position: 'bottom',
            horizontalAlign: 'center'
          }
        }
      },
      bar: {
        options: {
          chart: {
            events: {
              dataPointSelection: function (event, chartContext, config) {
                // The last parameter config contains additional information like `seriesIndex` and `dataPointIndex` for cartesian charts
                console.log(event, chartContext, config)
              }
            }
          },
          plotOptions: {
            bar: {
              borderRadius: 4,
              horizontal: true
            }
          },
          xaxis: {
            categories: []
          },
          title: {
            text: 'Top 15 active accounts',
            align: 'left',
            style: {
              fontWeight: 'bold',
              color: '#263238'
            }
          }
        },
        series: [{
          data: []
        }]
      }
    }
  },
  methods: {
    addPinLedger (e) {
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
    },
    computeData (ledgerIndex) {
      const data = this.$ledger.getLedger(ledgerIndex)
      return data.ledger.transactions.reduce((sum, ledger) => {
        const { byAccount, byTransactionType } = sum
        if (byTransactionType[ledger.TransactionType] === undefined) {
          byTransactionType[ledger.TransactionType] = 1
        } else {
          byTransactionType[ledger.TransactionType]++
        }

        if (byAccount[ledger.Account] === undefined) {
          byAccount[ledger.Account] = 1
        } else {
          byAccount[ledger.Account]++
        }
        return sum
      }, { byAccount: {}, byTransactionType: {} })
    },
    sortArrayPair (sortingArray, pairIndexArray) {
      if (sortingArray.length !== pairIndexArray.length) {
        return // not match, skip
      }

      const mappedArray = sortingArray.map((o, i) => ({ sortValue: o, pairValue: pairIndexArray[i] }))
      mappedArray.sort((m, n) => n.sortValue - m.sortValue)

      sortingArray.length = 0
      pairIndexArray.length = 0
      sortingArray.push(...mappedArray.map(o => o.sortValue))
      pairIndexArray.push(...mappedArray.map(o => o.pairValue))
    },
    updateDonutChart (ledgerIndex, data) {
      const startTime = new Date().getTime()

      const donutLabels = [...this.donut.chartOptions.labels]
      const donutSeries = [...this.donut.series]
      for (const [key, value] of Object.entries(data.byTransactionType)) {
        const donutIndex = donutLabels.indexOf(key)
        if (donutIndex !== -1) {
          donutSeries[donutIndex] += value
        } else {
          donutLabels.push(key)
          donutSeries.push(value)
        }
      }

      this.sortArrayPair(donutSeries, donutLabels)
      console.log('updateDonutChart computed', ledgerIndex, new Date().getTime() - startTime)
      this.donut.chartOptions.labels.length = 0 // hacky workaround to keep the label reference
      this.donut.chartOptions.labels.push(...donutLabels)
      this.donut.series = donutSeries // hacky workaround to update the series value
      this.$refs.donut.updateSeries(donutSeries)
      console.log('updateDonutChart render', ledgerIndex, new Date().getTime() - startTime)
    },
    updateBarChart (ledgerIndex, data) {
      const startTime = new Date().getTime()

      const barCategories = [...this.bar.options.xaxis.categories]
      const barSeries = [...this.bar.series[0].data]
      for (const [key, value] of Object.entries(data.byAccount)) {
        const barIndex = barCategories.indexOf(key)
        if (barIndex !== -1) {
          barSeries[barIndex] += value
        } else {
          barCategories.push(key)
          barSeries.push(value)
        }
      }

      this.sortArrayPair(barSeries, barCategories)
      barSeries.splice(15)
      barCategories.splice(15)

      console.log('updateBarChart computed', ledgerIndex, new Date().getTime() - startTime)
      this.bar.options.xaxis.categories.length = 0 // hacky workaround to keep the label reference
      this.bar.options.xaxis.categories.push(...barCategories)
      this.bar.series[0].data = barSeries // hacky workaround to update the series value
      this.$refs.bar.updateSeries([{
        data: barSeries
      }])
      console.log('updateBarChart render', ledgerIndex, new Date().getTime() - startTime)
    },
    updateCharts (ledgerIndex) {
      const data = this.computeData(ledgerIndex)
      this.updateDonutChart(ledgerIndex, data)
      this.updateBarChart(ledgerIndex, data)
    },
    async onNewLedger (ledger) {
      if (this.paused) {
        return
      }
      await this.$ledger.hydrate(ledger.ledger_index)
      this.updateCharts(ledger.ledger_index)
    },
    clearAll () {
      // remove pin ledger
      while (this.$ledger.ledgers.length) {
        const ledger = this.$ledger.ledgers[0]
        this.$ledger.purge(ledger.ledgerIndex)
      }

      // remove donut, keeping original reference
      this.donut.series.length = 0
      this.donut.chartOptions.labels.length = 0
      this.$refs.donut.updateSeries([])

      // remove bar, keeping original reference
      this.bar.series[0].data.length = 0
      this.bar.options.xaxis.categories.length = 0
      this.$refs.bar.updateSeries([{ data: [] }])
    }
  },
  async mounted () {
    if (typeof this.$ws !== 'undefined') {
      if (this.$ws.getState().online) {
        this.connected = true
      }
    }

    this.$events.on('ledger', this.onNewLedger)

    this.$events.on('connected', () => {
      this.connected = true
    })
  }
}
</script>

<style lang="scss" scoped></style>
