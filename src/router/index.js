import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Ledger from '../views/Ledger.vue'
import ResolveHash from '../views/ResolveHash.vue'
import Transaction from '../views/Transaction.vue'
import LedgerEntry from '../views/LedgerEntry.vue'
import Account from '../views/Account.vue'
import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/:ledger(\\d{1,20})',
    name: 'ledger',
    component: Ledger
  },
  {
    path: '/tx/:hash([a-fA-F0-9]{64})',
    name: 'transaction',
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
    component: Account
  },
  {
    path: '/:hash([a-fA-F0-9]{64})',
    name: 'hash',
    component: ResolveHash
  },
  {
    path: '/404',
    alias: '*',
    name: 'notfound',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
