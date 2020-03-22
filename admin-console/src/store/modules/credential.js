import axios from 'axios';
import commonStore from './common';
const state = {
    credentials:[],
    attributes:[]
};

const getters = {
    parsesAttributes: state => {
              var attributes = state.attributes.map((_attribute)=>{
                return {
                    value:_attribute.id,
                    text: _attribute.id + ` (${_attribute.name})`
                };
            });
            attributes.unshift({value:null,text:"Select Attribute"});
            return attributes;
        }
};

const actions = {
    async fetchCredentials ({commit}){
        return new Promise((resolve, reject) => {
              axios.get('/organizations/credentials').then(function (response) {
                commit('setCredentials',response.data);
                resolve()
              })
              .catch(function (error) {
                reject(error);
              });
          });
    },
    async fetchAttributes ({commit}){
        return new Promise((resolve, reject) => {
            axios.get('/attributes').then(function (response) {
              commit('setAttributes',response.data);
              resolve()
            })
            .catch(function (error) {
              reject(error);
            });
        });
    },
    async CreateCredential ({commit},data){
        return new Promise((resolve, reject) => {
            console.log(data);
            axios.post('/credentials',data).then(function (response) {
              //commit('setAttributes',response.data);
              resolve()
            })
            .catch(function (error) {
              reject(error);
            });
        });
    }
    
};

const mutations = {
    setCredentials:(state,credentials) => state.credentials = credentials,
    setAttributes:(state,attributes) => state.attributes = attributes
};

export default {
    state,
    getters,
    actions,
    mutations
};