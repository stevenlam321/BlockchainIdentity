import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import { BootstrapVue, IconsPlugin,BootstrapVueIcons } from 'bootstrap-vue'
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.prototype.$http = axios;
const access_token = localStorage.getItem('access_token');

if (access_token) {
  axios.defaults.headers.common = {'Authorization': `Bearer ${access_token}`};
}
axios.defaults.baseURL = process.env.VUE_APP_API_PATH;

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
