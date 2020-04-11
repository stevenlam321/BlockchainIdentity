import Vue from 'nativescript-vue'
import App from './components/App'
import Credential from './components/Credential'
import Register from './components/Register'
import Form from './components/Form'
import Login from './components/Login'
import store from './store/index'
import VueDevtools from 'nativescript-vue-devtools'
import RadDataForm from 'nativescript-ui-dataform/vue';
import Vuelidate from 'vuelidate'



if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}
Vue.use(RadDataForm);
Vue.use(Vuelidate);
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')
// Prints Colored logs when --env.production is *NOT* set while building
Vue.config.debug = (TNS_ENV !== 'production')

const landingPage = store.getters.isLoggedIn? App : Login;

new Vue({
  store,
  render: h => h('frame', [h(landingPage)])
}).$start()
