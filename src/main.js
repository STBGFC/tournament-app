import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import { Navbar, Tabs } from 'bootstrap-vue/es/components';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faClock, faTag, faMap, faFutbol, faRunning, faBell } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import App from '@/components/App.vue'
import router from '@/router'
import store from '@/store'

import '@/assets/branding.scss';

//Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(Navbar)
Vue.use(Tabs)
library.add([faClock, faTag, faMap, faFutbol, faRunning, faBell])
Vue.component('fa-icon', FontAwesomeIcon)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
