# XRP Ledger Technical Explorer [![Netlify Status](https://api.netlify.com/api/v1/badges/c16a50c4-d71f-4c20-be25-93f993497873/deploy-status)](https://app.netlify.com/sites/xrpl-technical-explorer/deploys)

A technical (geeky) JSON viewing explorer for the XRP Ledger.

## BETA!
Early beta of a new (technical) tx / ledger / object / hash explorer I'm working on, for XRPLF.

Xrpl Mainnet: https://explorer.xrplf.org
Xrpl Testnet: https://explorer-testnet.xrplf.org
Xahau Testnet: https://xahau.network
Xahau Testnet: https://dev.xahau.network

It's easy to roll your own as the wss endpoint is an env. var.

Lots to do, but the beginning is here. You can view (JSON, technical (!) explorer) ledgers, transactions, meta, etc. and click through, on ledger numbers, hashes, transaction hashes, accounts, etc.

## Project setup
```
npm install
```

Configure alternative WebSocket endpoint with the env. variable:
```
PORT
VUE_APP_WSS_ENDPOINT
```

E.g. ```
PORT=4000
VUE_APP_WSS_ENDPOINT=wss://dev.xahau.network
```

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
