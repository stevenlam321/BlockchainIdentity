import axios from 'axios';
import commonStore from './common';
const state = {
    credentials:[],
};

const getters = {
    credentials: state => state.credentials,
    // loading: state => state.loading,
};

const actions = {
    async fetchCredentials ({commit}){
        //commonStore.actions.setLoading(true);
        const response = await axios.get('http://localhost:8080/organizations/credentials');
        commit('setCredentials',response.data);
        //commonStore.actions.setLoading(false);
    },
    async addTodo ({commit},title){
        const response = await axios.post('https://jsonplaceholder.typicode.com/todos/',{
            title,completed:false
        });
        commit('newTodo',response.data);
    },
    async deleteTodo ({commit},id){
        await axios.delete('https://jsonplaceholder.typicode.com/todos/'+id);
        commit('removeTodo',id);
    },
    async filterTodos ({commit},e){
        const limit = parseInt(e.target.value);
        const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`);
        commit('setTodos',response.data);
    },
    async toogleComplete ({commit},updatedTodo){
        const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${updatedTodo.id}`,updatedTodo);
        commit('updateTodo',response.data);
    },
    
};

const mutations = {
    setCredentials:(state,credentials) => state.credentials = credentials,
    newTodo:(state,todos) => state.todos.unshift(todos),
    removeTodo:(state,id) => state.todos = state.todos.filter(todo=> todo.id != id),
    updateTodo:(state,updatedTodo) => {
        const index = state.todos.findIndex(todo => todo.id === updatedTodo.id);
        if(index !== -1){
            state.todos.splice(index,1,updatedTodo);
        }
     //   state.todos = state.todos.filter(todo=> todo.id != id)
    },
    setCurrentUser:(state,user) => state.currentUser = user,
    setAccessToken:(state,accessToken) => state.accessToken = accessToken,
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