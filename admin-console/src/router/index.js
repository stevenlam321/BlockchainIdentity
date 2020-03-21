import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import NotFound from '../views/NotFound.vue'
import Login from '../views/Login.vue'
import CreateCredential from '../views/CreateCredential.vue'
import Credential from '../views/Credential.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requireNotAuthed: true }
  },
  {
    path: '/credentials',
    name: 'Credential',
    component: Credential,
    meta: { requiresAuth: true }
  },
  {
    path: '/credentials/create',
    name: 'CreateCredential',
    component: CreateCredential,
    meta: { requiresAuth: true }
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

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireNotAuthed) && store.getters.isLoggedIn) {
        next({
            path: '/',
            query: { redirect: to.fullPath }
        });
    }
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!store.getters.isLoggedIn) {
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      } else {
        next()
      }
    } else {
      next() // make sure to always call next()!
    }
  })

export default router
