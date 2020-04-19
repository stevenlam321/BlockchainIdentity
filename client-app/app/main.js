import Vue from 'nativescript-vue'
import App from './components/App'
import Credential from './components/Credential'
import Register from './components/Register'
import Form from './components/Form'
import Login from './components/Login'
import store from './store/index'
import VueDevtools from 'nativescript-vue-devtools'
import Vuelidate from 'vuelidate'
import * as appSettings from 'tns-core-modules/application-settings';

Vue.registerElement('BarcodeScanner', () => require('nativescript-barcodescanner').BarcodeScannerView)
if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}
Vue.use(Vuelidate);
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')
// Prints Colored logs when --env.production is *NOT* set while building
Vue.config.debug = (TNS_ENV !== 'production')

const landingPage = store.getters.isLoggedIn? App : Register;
store.dispatch('init');
new Vue({
  store,
  render: h => h('frame', [h(App)])
}).$start()
