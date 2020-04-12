import * as appSettings from 'tns-core-modules/application-settings';

const state = {
    loading:false,
    todos:["Do homework","Make Love","Make Money"],
    token:appSettings.getString('token',null)
};

const getters = {
    allTodos: state => state.todos,
    isLoggedIn: state => !!state.token,
};

const actions = {
    async setLoading ({commit},loading){
        commit('setLoading',loading);
    },
    setToken({commit},token){
        if(token == null){
            appSettings.remove('token');
        }else{
            appSettings.setString('token',token);
        }
        commit('setToken',token);
    }
};

const mutations = {
    setToken:(state,token) => state.token = token,
    setLoading(state,loading){
        state.loading = loading;
    },
};

export default {
    state,
    getters,
    actions,
    mutations
};