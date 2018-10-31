import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import { Navbar, Tabs } from 'bootstrap-vue/es/components';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
Vue.use(Navbar)
Vue.use(Tabs)

import { library } from '@fortawesome/fontawesome-svg-core'
import { faClock, faTag, faMap, faFutbol, faRunning } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add([faClock, faTag, faMap, faFutbol, faRunning])
Vue.component('fa-icon', FontAwesomeIcon)

import App from '@/components/App.vue'
import router from '@/router'
import store from '@/store'

//import '@/assets/branding.css'

//Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
