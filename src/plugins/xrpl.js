import { XrplClient } from 'xrpl-client'

export default {
  async install (Vue, options) {
    Vue.prototype.$ws = new XrplClient(process?.env?.VUE_APP_WSS_ENDPOINT)

    const endpoint = String(process?.env?.VUE_APP_WSS_ENDPOINT || '')

    const net = {
      xrpl: endpoint === '' || endpoint.match(/xrplcluster|xrpl\.ws|xrpl\.link|s[12]\.ripple\.com/),
      xrpl_test: endpoint.match(/rippletest|\/testnet\.xrpl-labs/),
      xahau: endpoint.match(/xahau.network/),
      xahau_test: endpoint.match(/xahau-test.network/),
      local: endpoint.match(/localhost|0.0.0.0|custom-node/)
    }

    Vue.prototype.$net = net

    Vue.prototype.$ws.on('ledger', ledger => Vue.prototype.$events.emit('ledger', ledger))
    console.info('Connecting @ `plugins/xrpl`')
    await Vue.prototype.$ws.ready()
    const state = Vue.prototype.$ws.getState()
    console.info('Connected @ `plugins/xrpl`', state.server)
    Vue.prototype.$events.emit('connected', state.server.publicKey)
  }
}
