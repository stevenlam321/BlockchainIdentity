import * as appSettings from 'tns-core-modules/application-settings';
import * as http from "tns-core-modules/http";
import axios from 'axios';

const state = {
    person:null
};
const getters = {
    currentUser: state => state.currentUser,
};
const API_PATH = 'http://localhost:8080/';
const actions = {
    async login ({commit,dispatch},{email,password}){
            return new Promise((resolve, reject) => {
                axios.post(API_PATH+'persons/login', {email,password}).then((res)=>{
                    const person = res.data.person;
                    const token = res.data.token;
                    commit('setPerson',person);
                    dispatch('setToken',token,{ root: true });
                    resolve(res);
                }).catch((err)=>{
                    commit('setPerson',null,{ root: true });
                    dispatch('setToken',null,{ root: true });
                    reject(err.response.data)
                    console.log(err);
                }); 
          });      
    },
    async register ({commit,dispatch},{email,password,mobile}){
        return new Promise((resolve, reject) => {
            axios.post(API_PATH+'persons/register', {email,password,mobile}).then((res)=>{
                console.log(res.data);
                // const person = res.data.person;
                // const token = res.data.token;
                // commit('setPerson',person);
                // dispatch('setToken',token,{ root: true });
                resolve(res);
            }).catch((err)=>{
                // commit('setPerson',null,{ root: true });
                // dispatch('setToken',null,{ root: true });
                reject(err.response.data)
                console.log(err);
            }); 
      });      
},
    async logout ({commit,dispatch}){
        commit('logout');
        dispatch('setToken',null,{ root: true });
    }
};

const mutations = {
    setPerson(state,person){
        state.person = person
    },
    logout(state){
        state.person = null;
    },
};

export default {
    state,
    getters,
    actions,
    mutations
};