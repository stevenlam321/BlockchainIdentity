import axios from 'axios';
const state = {
    loading:false,
    todos:[],
    currentUser:null,
    person:null,
    organization:JSON.parse(localStorage.getItem('organization')),
    accessToken:localStorage.getItem('access_token'),
};

const getters = {
    allTodos: state => state.todos,
    currentUser: state => state.currentUser,
    isLoggedIn: state => !!state.accessToken,
    organization: state=> state.organization,
    loading: state => state.loading,
};

const actions = {
    async login ({commit},{email,password}){
        return new Promise((resolve, reject) => {
            commit('setLoading',true);
            axios({url: 'http://localhost:8080/persons/login', data: {email,password}, method: 'POST' })
            .then(resp => {
               const accessToken = resp.data.token
               const person = resp.data.person
               const organization = resp.data.organization
                if(person.role!='org'){
                    reject({"message":"Invalid username or password"})
                }else{
                    axios.defaults.headers.common['Authorization'] = accessToken;
                    commit('authSuccess',{accessToken,person,organization});
                    resolve(resp)
                }
            })
            .catch(err => {
                localStorage.removeItem('access_token')
                console.log(err);
                reject(err.response.data)
            }).finally(()=>{
                commit('setLoading',false);
            });
          })
        
    },
    async setLoading ({commit},loading){
        commit('setLoading',loading);
    },
    async logout ({commit}){
        commit('logout',null);
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
    setLoading(state,loading){
        state.loading = loading;
    },
    authSuccess(state,{ accessToken, person,organization}){
        state.accessToken = accessToken
        state.person = person
        state.organization = organization,
        localStorage.setItem('access_token', accessToken)
        localStorage.setItem('organization', JSON.stringify(organization))
    },
    logout(state){
        state.accessToken = null
        state.person = null
        state.organization = null
        localStorage.removeItem("access_token");
        localStorage.removeItem("organization");
    },
};

export default {
    state,
    getters,
    actions,
    mutations
};