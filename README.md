# XRP Ledger Technical Explorer [![Netlify Status](https://api.netlify.com/api/v1/badges/c16a50c4-d71f-4c20-be25-93f993497873/deploy-status)](https://app.netlify.com/sites/xrpl-technical-explorer/deploys)

A technical (geeky) JSON viewing explorer for the XRP Ledger.

## BETA!
Early beta of a new (technical) tx / ledger / object / hash explorer I'm working on, for XRPLF.

Mainnet: https://explorer.xrplf.org
Testnet: https://explorer-testnet.xrplf.org
Hooks Testnet V1: https://hooks-testnet-explorer.xrpl-labs.com
Hooks Testnet V2: https://hooks-testnet-v2-explorer.xrpl-labs.com

It's easy to roll your own as the wss endpoint is an env. var.

Lots to do, but the beginning is here. You can view (JSON, technical (!) explorer) ledgers, transactions, meta, etc. and click through, on ledger numbers, hashes, transaction hashes, accounts, etc.

## Project setup
```
npm install
```

Configure alternative WebSocket endpoint with the env. variable:
```
VUE_APP_WSS_ENDPOINT
```

E.g. `VUE_APP_WSS_ENDPOINT=wss://hooks-testnet.xrpl-labs.com`

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
