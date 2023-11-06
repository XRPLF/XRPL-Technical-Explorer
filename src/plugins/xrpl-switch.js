import { XrplClient } from 'xrpl-client'

const networkSwitch = async (ws, events, active, network) => {
  console.log('networkSwitch ' + network)
  ws.close()
  switch (network) {
    case 'xrpl':
      ws = new XrplClient('wss://node.panicbot.xyz')
      break
    case 'xrpl-test':
      ws = new XrplClient('wss://s.altnet.rippletest.net:51233')
      break
    case 'xahau':
      ws = new XrplClient('wss://xahau.network')
      break
    case 'xahau-test':
      ws = new XrplClient('wss://xahau-test.net')
      break
    case 'custom':
      ws = new XrplClient(process?.env?.VUE_APP_WSS_ENDPOINT)
      break
  }

  ws.on('ledger', ledger => events.emit('ledger', ledger))
  await ws.ready()
  active = network
}

export {
  networkSwitch
}
