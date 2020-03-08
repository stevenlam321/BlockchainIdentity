import axios from 'axios';
const state = {
    todos:[],
    currentUser:null,
    accessToken:localStorage.getItem('access_token'),
};

const getters = {
    allTodos: state => state.todos,
    currentUser: state => state.currentUser,
    isLoggedIn: state => !!state.accessToken,
};

const actions = {
    async login ({commit},{email,password}){
        // const response = await axios.get('https://jsonplaceholder.typicode.com/todos/');
       // const user = 
        //commit('setCurrentUser',user);
        const accessToken = 'wqwqwhqiwqhwqhwq';
        localStorage.setItem("access_token", accessToken);
        console.log(email,password);
        commit('setAccessToken',accessToken);
    },
    async fetchTodos ({commit}){
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos/');
        commit('setTodos',response.data);
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
    setTodos:(state,todos) => state.todos = todos,
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
};

export default {
    state,
    getters,
    actions,
    mutations
};