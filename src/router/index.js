import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Ledger from '../views/Ledger.vue'
import ResolveHash from '../components/ResolveHash.vue'
import Transaction from '../views/Transaction.vue'
import HookNamespace from '../views/HookNamespace.vue'
import LedgerEntry from '../views/LedgerEntry.vue'
import Account from '../views/Account.vue'
import NotFound from '../views/NotFound.vue'
import CustomCommand from '../views/CustomCommand.vue'
import GenericData from '../components/GenericData.vue'
import publicCommands from '../plugins/commands'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/:ledger([0-9]{1,20})',
    name: 'ledger',
    component: Ledger
  },
  {
    path: '/tx/:hash([a-fA-F0-9]{64})',
    name: 'transaction',
    component: Transaction
  },
  {
    path: '/:hash([a-fA-F0-9]{16})', // CTID
    name: 'ctid',
    component: Transaction
  },
  {
    path: '/entry/:hash([a-fA-F0-9]{64})',
    name: 'ledgerentry',
    component: LedgerEntry
  },
  {
    path: '/:account(r[a-zA-Z0-9]{15,})',
    name: 'account',
    component: Account,
    children: [
      {
        name: 'account_tx',
        path: 'tx',
        component: GenericData,
        meta: {
          title: 'Transactions',
          element: 'transactions',
          map: 'tx'
        }
      },
      {
        name: 'account_lines',
        path: 'lines',
        component: GenericData,
        meta: {
          title: 'Account (Trust) Lines',
          element: 'lines',
          map: ''
        }
      },
      {
        name: 'account_nfts',
        path: 'nfts',
        component: GenericData,
        meta: {
          title: 'Account NFTs',
          element: 'account_nfts',
          map: ''
        }
      },
      {
        name: 'account_objects',
        path: 'objects',
        component: GenericData,
        meta: {
          title: 'Account (Ledger) Objects',
          element: 'account_objects',
          map: ''
        }
      },
      {
        name: 'account_offers',
        path: 'offers',
        component: GenericData,
        meta: {
          title: 'Account (DEX) Offers',
          element: 'offers',
          map: ''
        }
      }
    ]
  },
  {
    path: '/:hash([a-fA-F0-9]{64})',
    name: 'hash',
    component: ResolveHash
  },
  {
    path: '/command',
    name: 'custom_command',
    component: CustomCommand
  },
  ...Object.keys(publicCommands).map(command => {
    return {
      path: '/' + command,
      name: 'command_' + command,
      component: CustomCommand,
      meta: {
        isPublicCommand: true,
        template: publicCommands[command]
      }
    }
  }),
  {
    path: '/ledger_entry/:hash([a-fA-F0-9]{64})',
    name: '_command_ledger_entry',
    component: CustomCommand,
    meta: {
      isPublicCommand: true,
      template: publicCommands.ledger_entry,
      replaceProp: 'index',
      replaceParam: 'hash'
    }
  },
  {
    path: '/namespace/:account(r[a-zA-Z0-9]{15,})/:namespace_id([a-fA-F0-9]{64})',
    name: 'hooknamespace',
    component: HookNamespace
  },
  {
    path: '/404',
    alias: '*',
    name: 'notfound',
    component: NotFound
  }
]

let routerBasePrefix = ''
const endpointRegex = window.location.href.match(/\/(ws[s]{0,1}:[a-zA-Z0-9-\\.:\\[\]]+[:0-9]{0,})/)
if (endpointRegex) {
  routerBasePrefix = endpointRegex[1]
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL + routerBasePrefix,
  routes,
  endpoint: routerBasePrefix.replace(/^(ws[s]{0,1}:)/, '$1//')
})

export default router
