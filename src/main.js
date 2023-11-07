import App from './App.vue'
import { createApp } from 'vue'
import { createStore } from 'vuex'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import VueNumerals from 'vue-numerals'
import { AppStore } from './store/app_store.js'
import router from './router'

import 'bootstrap/scss/bootstrap.scss'
import 'bootstrap-icons/font/bootstrap-icons.css'

// import Xrpl from './plugins/xrpl'
// import Ledger from './plugins/ledger'

const app = createApp(App)

const store = createStore({
    modules: {
        AppStore
    }
})

app.use(router)
app.use(store)
// app.use(Xrpl)
// app.use(Ledger)
app.use(VueNumerals)
app.use(VueAxios, Axios)
app.mount('#app')