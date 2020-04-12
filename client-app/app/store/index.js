import Vuex from 'vuex';
import Vue from 'vue';
import common from './modules/common';
import person from './modules/person';
Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        common,person
    }
});