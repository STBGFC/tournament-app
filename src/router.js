import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Competition from '@/views/Competition.vue'
import PageNotFound from '@/views/PageNotFound.vue'

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
      path: '/admin',
      name: 'admin',
      component: () => import(/* webpackChunkName: "admin" */ '@/views/admin/Home.vue')
    },
    {
      path: '*',
      name: '404',
      component: PageNotFound
    }
  ]
})
