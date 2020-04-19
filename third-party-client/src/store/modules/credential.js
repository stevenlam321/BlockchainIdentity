import axios from 'axios';
import commonStore from './common';
const state = {
    credentials:[],
    attributes:[],
    targetPerson:null
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
    async assignCredential ({commit},data){
        return new Promise((resolve, reject) => {
              axios.post('/organizations/assign_credential/',data).then(function (response) {
                // commit('setTargetPerson',response.data);
                resolve()
              })
              .catch(function (error) {
                reject(error);
              });
          });
    },
    async checkPerson ({commit},email){
        return new Promise((resolve, reject) => {
              axios.get('/organizations/check_person/'+ email).then(function (response) {
                commit('setTargetPerson',response.data);
                resolve()
              })
              .catch(function (error) {
                reject(error);
              });
          });
    },
    clearTargetPerson ({commit}){
        commit('setTargetPerson',null);
    },
    async fetchCredentials ({commit}){
    //     const data = [{"id":"C-hkidcard","type":"did.credential","name":"Hong Kong Identity Card","organization_id":"O-hkimmd","organization":{"id":"O-hkimmd","type":"did.organization","name":"Hong Kong Immigration Department","logo":"hkimmd.png","person_id":"P-hkimmd_admin"},"attributes":[{"attribute_id":"A-hkidno","name":"HK ID Card Number","type":"did.credential.attribute"},{"attribute_id":"A-first_name","name":"First Name","type":"did.credential.attribute"},{"attribute_id":"A-last_name","name":"Last Name","type":"did.credential.attribute"},{"attribute_id":"A-dob","name":"Date of Birth","type":"did.credential.attribute"},{"attribute_id":"A-gender","name":"Gender","type":"did.credential.attribute"},{"attribute_id":"A-issue_date","name":"Issue Date","type":"did.credential.attribute"}],"attribute_ids":["A-hkidno","A-first_name","A-last_name","A-dob","A-gender","A-issue_date"]}];
    //    commit('setCredentials',data);
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
    setAttributes:(state,attributes) => state.attributes = attributes,
    setTargetPerson:(state,targetPerson) => state.targetPerson = targetPerson
};

export default {
    state,
    getters,
    actions,
    mutations
};