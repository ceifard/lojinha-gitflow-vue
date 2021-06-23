import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('@/components/pages/Main/Main.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('@/components/pages/Signup/Signup.vue'),
    beforeEnter: (to, from, next) => {
      !!localStorage.getItem('token') ? next('/login') : next()
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/components/pages/Login/Login.vue'),
    beforeEnter: (to, from, next) => {
      !!localStorage.getItem('token') ? next('/') : next()
    }
  },
  {
    path: '/stock',
    name: 'Stock',
    component: () => import('@/components/pages/Stock/Stock.vue'),
    beforeEnter: (to, from, next) => {
      !!localStorage.getItem('token') ? next() : next('/login')
    }    
  },
  {
    path: '/subscription',
    name: 'Subscription',
    component: () => import('@/components/pages/Subscription/Subscription.vue'),
    beforeEnter: (to, from, next) => {
      !!localStorage.getItem('token') ? next() : next('/login')
    }    
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
