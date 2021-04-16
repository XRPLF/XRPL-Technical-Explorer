import RippledWsClient from 'rippled-ws-client'

const WsUrl = 'wss://hooks-testnet.xrpl-labs.com'

export default {
  async install (Vue, options) {
    Vue.prototype.$ws = await new RippledWsClient(WsUrl, { NoUserAgent: true, ...options })
    console.info('Connected @ `plugins/hooks-testnet`', WsUrl)
    Vue.prototype.$events.emit('connected', WsUrl)
    Vue.prototype.$ws.on('ledger', ledger => Vue.prototype.$events.emit('ledger', ledger))
  }
}
