import { XrplClient } from 'xrpl-client'

// const WsUrl = 'wss://xrplcluster.com'

export default {
  async install (Vue, options) {
    Vue.prototype.$ws = new XrplClient()
    Vue.prototype.$ws.on('ledger', ledger => Vue.prototype.$events.emit('ledger', ledger))
    console.info('Connecting @ `plugins/xrpl`')
    await Vue.prototype.$ws.ready()
    const state = Vue.prototype.$ws.getState()
    console.info('Connected @ `plugins/xrpl`', state.server)
    Vue.prototype.$events.emit('connected', state.server.publicKey)
  }
}
