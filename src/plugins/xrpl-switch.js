import { XrplClient } from 'xrpl-client'

const networkSwitch = async (ws, events, active, net, network) => {
  console.log('networkSwitch ' + network)
  ws.close()
  switch (network) {
    case 'xrpl':
      ws = new XrplClient('wss://xrplcluster.com')
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

  const nets = {
    xrpl: ws.endpoint === '' || ws.endpoint.match(/xrplcluster|xrpl\.ws|xrpl\.link|s[12]\.ripple\.com/),
    xrpl_test: ws.endpoint.match(/rippletest|\/testnet\.xrpl-labs/),
    xahau: ws.endpoint.match(/xahau.network/),
    xahau_test: ws.endpoint.match(/xahau-test.net/),
    custom: process?.env?.VUE_APP_WSS_ENDPOINT
  }
  console.log('hey')
  net = nets
  console.log('nettttt', net)
  ws.on('ledger', ledger => events.emit('ledger', ledger))
  await ws.ready()
  active = network
  // console.log(ws)
  // console.log('done')
  return { active, net }
}

export {
  networkSwitch
}
