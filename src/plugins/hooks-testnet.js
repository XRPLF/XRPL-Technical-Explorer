import RippledWsClient from 'rippled-ws-client'

const WsUrl = 'wss://hooks-testnet.xrpl-labs.com'

export default {
  async install (Vue, options) {
    Vue.prototype.$ws = await new RippledWsClient(WsUrl, { NoUserAgent: true, ...options })
    console.info('Connected @ `plugins/hooks-testnet`', WsUrl)
    Vue.prototype.$events.emit('connected', WsUrl)
    Vue.prototype.$ws.on('ledger', ledger => Vue.prototype.$events.emit('ledger', ledger))
  }

  // install (app) {
  //   const connect = (url, options) => {
  //     if (ws != null) {
  //       return ws
  //     }
  //     return new Promise((resolve, reject) => {
  //       new RippledWsClient(url, { NoUserAgent: true, ...options }).then(connection => {
  //         ws = connection
  //         resolve(connection)
  //       }).catch(error => {
  //         reject(error)
  //       })
  //     })
  //   }

  //   const getState = () => {
  //     return ws.getState()
  //   }

  //   const close = () => {
  //     ws.close().then(closeInfo => {
  //       console.log('Closed', closeInfo)
  //     }).catch(error => {
  //       console.log('Close error', error)
  //     })
  //   }

  //   const send = async (command) => {
  //     return await ws.send(command)
  //   }

  //   const on = (event, fn) => {
  //     ws.on(event, fn)
  //   }

  //   app.config.globalProperties.$ws = {
  //     connect,
  //     getState,
  //     close,
  //     send,
  //     on
  //   }
  // }
}
