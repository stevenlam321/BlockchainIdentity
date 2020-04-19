import Vue from 'vue'
import VueRouter from 'vue-router'
import ManualFill from '../views/ManualFill.vue'
import HKDIDFill from '../views/HKDIDFill.vue'
import NotFound from '../views/NotFound.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'ManualFill',
    component: ManualFill
  },
  {
    path: '/hkdidfill',
    name: 'HKDIDFill',
    component: HKDIDFill
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
