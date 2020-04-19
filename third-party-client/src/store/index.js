import Vuex from 'vuex';
import Vue from 'vue';
import common from './modules/common';
import credential from './modules/credential';
Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        common,credential
    }
});