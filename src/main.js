import Vue from 'vue'
import App from './App.vue'
import HooksTestnet from './plugins/hooks-testnet'
import Mitt from 'mitt'
import router from './router'

Vue.config.productionTip = false
Vue.use(HooksTestnet)

Vue.prototype.$events = Mitt()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
