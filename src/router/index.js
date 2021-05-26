import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('@/components/pages/Main/Main.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/components/pages/Login/Login.vue'),
    beforeEnter: (to, from, next) => {
      !!store.getters['login/token'] ? next('/') : next()
    }
  },
  {
    path: '/stock',
    name: 'Stock',
    component: () => import('@/components/pages/Stock/Stock.vue'),
    beforeEnter: (to, from, next) => {
      !!store.getters['login/token'] ? next() : next('/login')
    }    
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
