'use strict'
 /* eslint-disable */ 

import { XrplClient } from 'xrpl-client'

export const AppStore = {
    state: () => ({
        version: '0.0.1',
        xumm: {
            tokenData: null
        },
        client: null,
        client_reset: true,
        network_key: 'custom',
        network_type: 'mainnet',
        servers: [],
        account: '',
        account_data: {},
        user_token: '', // xumm client data
        user_uuid: '', // xumm client data
        ledgers: []
    }),
    actions: {
        storageInit({commit}, force) {
            commit('INIT', force)
        },
        xummTokenData({commit}, data) {
            commit('TOKEN_DATA', data)
        },
        setUserToken({commit}, user_token) {
            commit('USER_TOKEN', user_token)
        },
        setUserUUID({commit}, uuid) {
            commit('UUID', uuid)
        },
        setAccount({commit}, account) {
            commit('ACCOUNT', account)
        },
        setLedger({commit}, ledger) {
            commit('LEDGER', ledger)
        },
        setStorage({commit}, data) {
            commit('STORE', data)
        },
        clientConnect({commit}, force) {
            commit('CONNECT', force)
        },
        setNetwork({commit}, data) {
            commit('KEY', data)
        },
        setClientServers({commit}, servers) {
            commit('SERVERS', servers)
        },
        clearSignerList({commit}) {
            commit('CLEAR_SIGNER_LIST')
        },
        setSignerList({commit}, data) {
            commit('SIGNER_LIST', data)
        },
        setAccountData({commit}, data) {
            commit('ACCOUNT_DATA', data)
        }
    },
    mutations: {
        INIT(state, force = false) {
            if (force === false) { return }
            console.log('loading local storeage')
            if (localStorage.getItem('servers'))
                state.servers = JSON.parse(localStorage.getItem('servers'))
            if (localStorage.getItem('network_key'))
                state.network_key = JSON.parse(localStorage.getItem('network_key'))
            if (localStorage.getItem('network_type'))
                state.network_type = JSON.parse(localStorage.getItem('network_type'))
        },
        TOKEN_DATA(state, data) {
            state.xumm.tokenData = data
        },
        ACCOUNT(state, account) {
            state.account = account
        },
        USER_TOKEN(state, user_token) {
            state.user_token = user_token
        },
        UUID(state, uuid) {
            state.user_uuid = uuid
        },
        LEDGER(state, ledger) {
            state.ledger = ledger
        },
        KEY(state, data) {
            console.log('set NETWORKS KEY ', data)
            state.network_key = data.key
            localStorage.setItem('network_key', JSON.stringify(data.key))
            localStorage.setItem('network_type', JSON.stringify(data.type))
        },
        STORE(state, data) {
            state.data = data
        },
        async CONNECT(state, force) {
            if (state.servers.length < 0) { return }
            if (state.client_reset || force || state.client === null) {
                console.info('new connection', state.servers)
                state.client = new XrplClient(state.servers, {
                    assumeOfflineAfterSeconds: 15,
                    maxConnectionAttempts: 4,
                    connectAttemptTimeoutSeconds: 4,
                    //tryAllNodes: true // testing..
                })
                await state.client.ready()
                const response = state.client.getState()
                console.info('Connected @ `app_store`', response.server)
            }
            state.client_reset = false
        },
        SERVERS(state, servers) {
            if (state.client !== null) {
                state.client.close()
            }
            state.servers = servers
            state.client_reset = true
            localStorage.setItem('servers', JSON.stringify(servers))
        },
        ACCOUNT_DATA(state, data) {
            state.account_data = data
        }
    },
    getters: {
        getVersion: state => {
            return state.version
        },
        getXummTokenData: state => {
            return state.xumm.tokenData
        },
        getUserToken: state => {
            return state.user_token
        },
        getUserUUID: state => {
            return state.user_uuid
        },
        getAccount: state => {
            return state.account
        },
        getLedger: state => {
            return state.ledger
        },
        getStoreage: state => {
            return state.data
        },
        getClient: state => {
            return state.client
        },
        getNetwork: state => {
            return state.network_key
        },
        getNetworkType: state => {
            return state.network_type
        },
        getAccountData: (state) => {
            return state.account_data
        },
        getClientServers: state => {
            return state.servers
        },
        getClientReset: state => {
            return state.client_reset
        },
        hydrateLedger: (state) => async (ledger) => {
            const ledgerIndex = Number(ledger)
            if (state.ledgers.filter(l => l.ledgerIndex === ledgerIndex).length > 0) {
                console.log('Skip hydrating: known', ledgerIndex)
                return
            } 
            console.log('Hydrate', ledgerIndex)

            const existingRecordIndex = state.ledgers.map(l => l.ledgerIndex).indexOf(ledgerIndex)
            if (existingRecordIndex < 0) {
              state.ledgers.push({ ledgerIndex, ledgerData: {} })
            }

            const ledgerData = await state.client.send({ command: 'ledger', ledger_index: Number(ledger), transactions: true, expand: true })
            // console.log(ledgerData)
            Object.assign(state.ledgers[state.ledgers.map(l => l.ledgerIndex).indexOf(ledgerIndex)], {
              ledgerData
            })

            console.log('Hydrated', ledgerIndex)
        },
        ledgers: state => {
          return state.ledgers
      },
    }
}