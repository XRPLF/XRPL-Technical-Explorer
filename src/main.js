import Vue from 'vue'
import Toast from 'vue-toastification'
import App from './App.vue'
import Xrpl from './plugins/xrpl'
import Ledger from './plugins/ledger'
import Mitt from 'mitt'
import router from './router'

import 'vue-toastification/dist/index.css'

Vue.config.productionTip = false

Vue.prototype.$events = Mitt()

Vue.use(Xrpl)
Vue.use(Ledger)
Vue.use(Toast, { transition: 'Vue-Toastification__fade' })

router.$ws = Xrpl

new Vue({
  router,
  render: h => h(App),
  watch: {
    '$route.params.ledger' () {
      if (this.$route.params.ledger) {
        this.$events.emit('route:ledger', this.$route.params.ledger)
      }
    }
  }
}).$mount('#app')
