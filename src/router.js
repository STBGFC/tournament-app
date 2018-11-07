import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Competition from '@/views/Competition.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/competition/:compName/:compSection',
      name: 'competition',
      component: Competition,
      props: true
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
    }
  ]
})
