import { XrplClient } from 'xrpl-client'

export default {
  async install (Vue, options) {
    let _endpoint = process?.env?.VUE_APP_WSS_ENDPOINT
    const customEndpoint = String(options.router?.options?.endpoint || '')
    if (customEndpoint !== '') {
      _endpoint = options.router?.options?.endpoint
    }
    const endpoint = String(_endpoint || '')
    Vue.prototype.$ws = new XrplClient(endpoint)

    const net = {
      live: endpoint === '' || endpoint.match(/xrplcluster|xrpl\.ws|xrpl\.link|s[12]\.ripple\.com/),
      test: endpoint.match(/rippletest|\/testnet\.xrpl-labs/),
      xahaulive: endpoint.match(/xahau.*network/),
      xahautest: endpoint.match(/xahau.*test/),
      custom: customEndpoint !== ''
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
