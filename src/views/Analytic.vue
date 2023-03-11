<template>
  <div>
    <main v-if="!connected" class="container-fluid">
      <span class="blue await-close ms-3 pt-2"><small>Connecting...</small></span>
    </main>
    <main v-if="connected" class="container-fluid">
      <div class="d-flex float-end">
        <button v-if="paused" @click="paused=!paused" class="py-0 nes-btn is-success">Play</button>
        <button v-if="!paused" @click="paused=!paused" class="py-0 nes-btn is-warning">Paused</button>
        <button @click="clearAll" class=" py-0 nes-btn">Clear All</button>
      </div>
      <form class="d-flex" @submit="addPinLedger">
        <input v-model="fromIndex" class="nes-input py-0 me-2" type="search" style="width:140px;"
          placeholder="From Index" aria-label="Search">
        <input v-model="toIndex" class="nes-input py-0 me-2" type="search" style="width:140px;"
          placeholder="To Index" aria-label="Search">
        <button class="py-0 px-2 ml-2 nes-btn is-primary" :disabled="!!progressbar.max" :class="{ 'is-disabled': !!progressbar.max }">Add Ledgers</button>
      </form>

      <hr />

      <h4 class="nes blue">Analytic</h4>
      <div class="d-flex" v-if="progressbar.max">
        <label for="loading" class="nes" style="align-self:center;margin-bottom:0">Loading:</label>
        <progress id="loading" class="nes-progress is-pattern" style="align-self:center;height:28px;" :value="progressbar.value" :max="progressbar.max"></progress>
      </div>
      <div class="d-flex flex-wrap-reverse">
        <VueApexCharts width="400" height="400" type="donut" :options="donut.chartOptions" :series="donut.series" ref="donut"></VueApexCharts>
        <VueApexCharts width="500" height="400" type="bar" :options="bar.options" :series="bar.series" ref="bar"></VueApexCharts>
        <div class="d-flex flex-column">
          <div class="d-flex justify-content-between">
            <div class="d-flex flex-column">
              <strong>Filter by Address</strong>
              <small>One address per line only</small>
            </div>
            <button class="py-0 nes-btn is-primary" @click="applyFilterAddresses">Apply</button>
          </div>
          <textarea v-model="inputFilterAddresses" class="py-0 my-2 nes-input" :class="{ 'is-error': isFilterAddressesError }" rows="12" cols="40"></textarea>
        </div>
      </div>

      <hr />

      <div class="d-flex justify-content-between" v-if="selectedTxs.length">
        <h5 class="nes blue" style="align-self:center">Selected Transactions</h5>
        <h5 class="nes blue" style="align-self:center">: {{txViewIndex + 1}} of {{selectedTxs.length}}</h5>
        <div>
          <button class="py-0 nes-btn is-primary" @click="transactionPrev" :disabled="txViewIndex===0" :class="{ 'is-disabled': txViewIndex===0 }">prev</button>
          <button class="py-0 nes-btn is-primary" @click="transactionNext" :disabled="txViewIndex+1===selectedTxs.length" :class="{ 'is-disabled': txViewIndex+1===selectedTxs.length }">next</button>
        </div>
      </div>
      <JsonRenderer v-if="selectedTxs.length" :data="selectedTxs[txViewIndex]" :useToastAction="true" />
    </main>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import JsonRenderer from '../components/JsonRenderer.vue'

export default {
  name: 'Analytic',
  components: {
    VueApexCharts,
    JsonRenderer
  },
  data () {
    return {
      connected: false,
      paused: true,
      fromIndex: null,
      toIndex: null,
      inputFilterAddresses: null,
      finalFilterAddresses: [],
      isFilterAddressesError: false,
      tempBarData: { labels: [], series: [] },
      selectedTxs: [],
      txViewIndex: 0,
      donutDataPointText: null,
      barDataPointText: null,
      progressbar: {
        value: 2,
        max: 10
      },
      donut: {
        series: [],
        chartOptions: {
          labels: [],
          title: {
            text: 'Count by TransactionType'
          },
          legend: {
            show: true,
            position: 'bottom',
            horizontalAlign: 'center'
          },
          noData: {
            text: 'No Data is loaded'
          },
          chart: {
            events: {
              dataPointSelection: (event, chartContext, config) => {
                // The last parameter config contains additional information like `seriesIndex` and `dataPointIndex` for cartesian charts
                const transactionType = this.donut.chartOptions.labels[config.dataPointIndex]
                if (this.donutDataPointText === transactionType) {
                  this.donutDataPointText = null
                } else {
                  this.donutDataPointText = transactionType
                }
                this.onAnalyticSelected('donut', config.dataPointIndex)
              }
            }
          }
        }
      },
      bar: {
        options: {
          noData: {
            text: 'No Data is loaded'
          },
          chart: {
            events: {
              dataPointSelection: (event, chartContext, config) => {
                // The last parameter config contains additional information like `seriesIndex` and `dataPointIndex` for cartesian charts
                const address = this.bar.options.xaxis.categories[config.dataPointIndex]
                if (this.barDataPointText === address) {
                  this.barDataPointText = null
                } else {
                  this.barDataPointText = address

                  navigator.clipboard.writeText(address)
                  this.$toast('Address copied to clipboard', {
                    position: 'bottom-right',
                    timeout: 1000
                  })
                }
                this.onAnalyticSelected('bar', config.dataPointIndex)
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
            text: 'Top 15 active accounts'
          }
        },
        series: [{
          data: []
        }]
      }
    }
  },
  methods: {
    isLedgerLoaded (ledgerIndex) {
      return this.$ledger.list.indexOf(ledgerIndex) !== -1
    },
    getLedgerTransactions (ledgerIndex) {
      const data = this.$ledger.getLedger(ledgerIndex)
      if (data.error) {
        throw data.error_message
      }

      return data.ledger.transactions
        .filter(ledger => this.finalFilterAddresses.length === 0 ||
          this.finalFilterAddresses.indexOf(ledger.Account) !== -1)
    },
    computeData (ledgerIndex) {
      const transactions = this.getLedgerTransactions(ledgerIndex)
      const filterByAccount = this.barDataPointText
      const filterByTransactionType = this.donutDataPointText

      return transactions.reduce((sum, ledger) => {
        const { byAccount, byTransactionType } = sum

        if (filterByAccount === null || filterByAccount === ledger.Account) {
          if (byTransactionType[ledger.TransactionType] === undefined) {
            byTransactionType[ledger.TransactionType] = 1
          } else {
            byTransactionType[ledger.TransactionType]++
          }
        }

        if (filterByTransactionType === null || filterByTransactionType === ledger.TransactionType) {
          if (byAccount[ledger.Account] === undefined) {
            byAccount[ledger.Account] = 1
          } else {
            byAccount[ledger.Account]++
          }
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
      // const startTime = new Date().getTime()

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
      // console.log('updateDonutChart computed', ledgerIndex, new Date().getTime() - startTime)
      this.donut.chartOptions.labels.length = 0 // hacky workaround to keep the label reference
      this.donut.chartOptions.labels.push(...donutLabels)
      this.donut.series = donutSeries // hacky workaround to update the series value
      this.$refs.donut.updateSeries(donutSeries)
      // console.log('updateDonutChart render', ledgerIndex, new Date().getTime() - startTime)
    },
    updateBarChart (ledgerIndex, data) {
      // const startTime = new Date().getTime()

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

      // console.log('updateBarChart computed', ledgerIndex, new Date().getTime() - startTime)
      this.bar.options.xaxis.categories.length = 0 // hacky workaround to keep the label reference
      this.bar.options.xaxis.categories.push(...barCategories)
      this.bar.series[0].data = barSeries // hacky workaround to update the series value
      this.$refs.bar.updateSeries([{
        data: barSeries
      }])
      // console.log('updateBarChart render', ledgerIndex, new Date().getTime() - startTime)
    },
    updateCharts (ledgerIndex) {
      const data = this.computeData(ledgerIndex)
      this.updateDonutChart(ledgerIndex, data)
      this.updateBarChart(ledgerIndex, data)
    },
    reloadSelectedCharts (chartType) {
      try {
        this.clearChart(chartType)

        this.progressbar.value = 0
        this.progressbar.max = this.$ledger.list.length

        const accumulateData = { byAccount: {}, byTransactionType: {} }
        this.$ledger.list.forEach(ledgerIndex => {
          const data = this.computeData(ledgerIndex)

          for (const [key, value] of Object.entries(data.byTransactionType)) {
            if (accumulateData.byTransactionType[key] === undefined) {
              accumulateData.byTransactionType[key] = 0
            }
            accumulateData.byTransactionType[key] += value
          }
          for (const [key, value] of Object.entries(data.byAccount)) {
            if (accumulateData.byAccount[key] === undefined) {
              accumulateData.byAccount[key] = 0
            }
            accumulateData.byAccount[key] += value
          }
        })

        if (chartType === undefined || chartType === 'donut') {
          this.updateDonutChart(null, accumulateData)
        }

        if (chartType === undefined || chartType === 'bar') {
          this.updateBarChart(null, accumulateData)
        }
      } catch (e) {
        this.$toast.error('Error: ' + e, {
          position: 'bottom-right',
          timeout: 3000
        })
      } finally {
        this.progressbar.value = 0
        this.progressbar.max = 0
      }
    },
    async onNewLedger (ledger) {
      if (this.paused) {
        return
      }

      try {
        if (this.isLedgerLoaded(ledger.ledger_index)) {
          return
        }
        await this.$ledger.hydrate(ledger.ledger_index)
        this.updateCharts(ledger.ledger_index)
      } catch (e) {
        this.$toast.error('Error: ' + e, {
          position: 'bottom-right',
          timeout: 3000
        })
        throw e
      }
    },
    async addPinLedger (e) {
      e.preventDefault()

      try {
        const fromIndex = parseInt(this.fromIndex)
        const toIndex = parseInt(this.toIndex)

        if (isNaN(fromIndex) || isNaN(toIndex)) {
          this.$toast.error('Invalid! Input is not a number!', {
            position: 'bottom-right',
            timeout: 3000
          })
          return
        } else if (fromIndex > toIndex) {
          this.$toast.error('Invalid! FromIndex > ToIndex', {
            position: 'bottom-right',
            timeout: 3000
          })
          return
        }

        const diff = toIndex - fromIndex
        if (diff > 100 && !confirm('You\'re about to load > 100 ledgers\nAre you sure to proceed?')) {
          return
        }

        console.log('Sideload Ledger', fromIndex, toIndex)
        this.progressbar.value = 0
        this.progressbar.max = diff
        for (let ledgerIndex = fromIndex; ledgerIndex <= toIndex; ledgerIndex++) {
          this.progressbar.value++
          if (this.isLedgerLoaded(ledgerIndex)) {
            continue
          }
          await this.$ledger.hydrate(ledgerIndex)
          this.updateCharts(ledgerIndex)
        }
      } catch (e) {
        this.$toast.error('Error: ' + e, {
          position: 'bottom-right',
          timeout: 3000
        })
        throw e
      } finally {
        this.progressbar.value = 0
        this.progressbar.max = 0
      }
    },
    clearChart (chartType) {
      if (chartType === undefined || chartType === 'donut') {
        // remove donut, keeping original reference
        this.donut.series.length = 0
        this.donut.chartOptions.labels.length = 0
        this.$refs.donut.updateSeries([])
      }

      if (chartType === undefined || chartType === 'bar') {
        // remove bar, keeping original reference
        this.bar.series[0].data.length = 0
        this.bar.options.xaxis.categories.length = 0
        this.$refs.bar.updateSeries([{ data: [] }])
      }
    },
    clearAll () {
      // remove pin ledger
      while (this.$ledger.ledgers.length) {
        const ledger = this.$ledger.ledgers[0]
        this.$ledger.purge(ledger.ledgerIndex)
      }

      this.clearChart()

      // other related to chart
      this.selectedTxs.length = 0
      this.selectedTxs.push()
    },
    onAnalyticSelected (chartType, dataPointIndex) {
      const filterByTransactionType = this.donutDataPointText
      const filterByAccount = this.barDataPointText
      console.log(filterByTransactionType, filterByAccount)

      this.selectedTxs.length = 0
      this.txViewIndex = 0
      if (filterByTransactionType === null && filterByAccount === null) {
        this.selectedTxs.push()
      }

      this.$ledger.list.forEach(ledgerIndex => {
        const transactions = this.getLedgerTransactions(ledgerIndex)
        const filtered = transactions.filter(transaction =>
          (transaction.Account === filterByAccount || filterByAccount === null) &&
          (transaction.TransactionType === filterByTransactionType || filterByTransactionType === null)
        )
        this.selectedTxs.push(...filtered)
      })

      if (chartType === 'donut') {
        this.reloadSelectedCharts('bar')
      } else if (chartType === 'bar') {
        this.reloadSelectedCharts('donut')
      } else {
        this.reloadSelectedCharts()
      }
    },
    transactionNext () {
      if (this.txViewIndex + 1 === this.selectedTxs.length) {
        return
      }
      this.txViewIndex++
    },
    transactionPrev () {
      if (this.txViewIndex === 0) {
        return
      }
      this.txViewIndex--
    },
    validateFilterAddresses () {
      if (this.inputFilterAddresses === null || this.inputFilterAddresses === '') {
        return true
      }

      const addresses = this.inputFilterAddresses.split('\n')
      return addresses.map(address => address.match(/^r[a-zA-Z0-9]{25,35}$/g) !== null)
        .indexOf(false) === -1
    },
    applyFilterAddresses () {
      if (!this.validateFilterAddresses()) {
        this.isFilterAddressesError = true
        this.$toast.error('Invalid XRP Address to filter!', {
          position: 'bottom-right',
          timeout: 3000
        })
        return
      }

      this.isFilterAddressesError = false
      this.finalFilterAddresses = this.inputFilterAddresses === null || this.inputFilterAddresses === ''
        ? []
        : this.inputFilterAddresses.split('\n')

      this.reloadSelectedCharts()
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

    setTimeout(() => {
      console.log('is mounted', this.$ledger.list.length)
      this.reloadSelectedCharts()
    }, 1000)
  }
}
</script>

<style lang="scss" scoped></style>
