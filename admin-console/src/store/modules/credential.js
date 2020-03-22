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
        },
    parsesCredentials: state => {
            var credentials = state.credentials.map((credential)=>{
              return {
                  value: credential.id,
                  text: credential.id
              };
          });
          credentials.unshift({value:null,text:"Select Credential"});
          return credentials;
      }
};

const actions = {
    async fetchCredentials ({commit}){
        const data = [{"id":"A-wew","type":"did.credential","name":"","organization_id":"O-hkimmd","organization":{"id":"O-hkimmd","type":"did.organization","name":"Hong Kong Immigration Department","logo":"hkimmd.png","person_id":"P-hkimmd_admin"},"attributes":[{"attribute_id":"A-hkidno","name":"HK ID Card Number","type":"did.credential.attribute"}],"attribute_ids":["A-hkidno"]},{"id":"C-dw","type":"did.credential","name":"","organization_id":"O-hkimmd","organization":{"id":"O-hkimmd","type":"did.organization","name":"Hong Kong Immigration Department","logo":"hkimmd.png","person_id":"P-hkimmd_admin"},"attributes":[],"attribute_ids":[]},{"id":"C-fuckyou","type":"did.credential","name":"Fuckyou","organization_id":"O-hkimmd","organization":{"id":"O-hkimmd","type":"did.organization","name":"Hong Kong Immigration Department","logo":"hkimmd.png","person_id":"P-hkimmd_admin"},"attributes":[],"attribute_ids":[]},{"id":"C-hdhdis","type":"did.credential","name":"hiwiewhiew","organization_id":"O-hkimmd","organization":{"id":"O-hkimmd","type":"did.organization","name":"Hong Kong Immigration Department","logo":"hkimmd.png","person_id":"P-hkimmd_admin"},"attributes":[{"attribute_id":"A-gender","name":"Gender","type":"did.credential.attribute"}],"attribute_ids":["A-gender"]},{"id":"C-hello world","type":"did.credential","name":"","organization_id":"O-hkimmd","organization":{"id":"O-hkimmd","type":"did.organization","name":"Hong Kong Immigration Department","logo":"hkimmd.png","person_id":"P-hkimmd_admin"},"attributes":[],"attribute_ids":[]},{"id":"C-hkdidno2","type":"did.credential","name":"Hong Kong Identity Card 2","organization_id":"O-hkimmd","organization":{"id":"O-hkimmd","type":"did.organization","name":"Hong Kong Immigration Department","logo":"hkimmd.png","person_id":"P-hkimmd_admin"},"attributes":[{"attribute_id":"A-dob","name":"Date of Birth","type":"did.credential.attribute"},{"attribute_id":"A-first_name","name":"First Name","type":"did.credential.attribute"},{"attribute_id":"A-gender","name":"Gender","type":"did.credential.attribute"},{"attribute_id":"A-issue_date","name":"Issue Date","type":"did.credential.attribute"},{"attribute_id":"A-last_name","name":"Last Name","type":"did.credential.attribute"}],"attribute_ids":["A-dob","A-first_name","A-gender","A-issue_date","A-last_name"]},{"id":"C-hkidcard2","type":"did.credential","name":"HongKongIdentityCard","organization_id":"O-hkimmd","organization":{"id":"O-hkimmd","type":"did.organization","name":"Hong Kong Immigration Department","logo":"hkimmd.png","person_id":"P-hkimmd_admin"},"attributes":[{"id":"A-hkidno","name":"HK ID Card Number","type":"did.attribute"},{"id":"A-first_name","name":"First Name","type":"did.attribute"},{"id":"A-last_name","name":"Last Name","type":"did.attribute"},{"id":"A-dob","name":"Date of Birth","type":"did.attribute"},{"id":"A-gender","name":"Gender","type":"did.attribute"}],"attribute_ids":["A-hkidno","A-first_name","A-last_name","A-dob","A-gender"]},{"id":"C-hkidcard4","type":"did.credential","name":"HongKongIdentityCard","organization_id":"O-hkimmd","organization":{"id":"O-hkimmd","type":"did.organization","name":"Hong Kong Immigration Department","logo":"hkimmd.png","person_id":"P-hkimmd_admin"},"attributes":[{"id":"A-hkidno","name":"HK ID Card Number","type":"did.attribute"},{"id":"A-first_name","name":"First Name","type":"did.attribute"},{"id":"A-last_name","name":"Last Name","type":"did.attribute"},{"id":"A-dob","name":"Date of Birth","type":"did.attribute"},{"id":"A-gender","name":"Gender","type":"did.attribute"}],"attribute_ids":["A-hkidno","A-first_name","A-last_name","A-dob","A-gender"]},{"id":"C-hkidcard5","type":"did.credential","name":"HongKongIdentityCard","organization_id":"O-hkimmd","organization":{"id":"O-hkimmd","type":"did.organization","name":"Hong Kong Immigration Department","logo":"hkimmd.png","person_id":"P-hkimmd_admin"},"attributes":[{"id":"A-hkidno","name":"HK ID Card Number","type":"did.attribute"},{"id":"A-first_name","name":"First Name","type":"did.attribute"},{"id":"A-last_name","name":"Last Name","type":"did.attribute"},{"id":"A-dob","name":"Date of Birth","type":"did.attribute"},{"id":"A-gender","name":"Gender","type":"did.attribute"}],"attribute_ids":["A-hkidno","A-first_name","A-last_name","A-dob","A-gender"]},{"id":"C-hkidcard6","type":"did.credential","name":"HongKongIdentityCard","organization_id":"O-hkimmd","organization":{"id":"O-hkimmd","type":"did.organization","name":"Hong Kong Immigration Department","logo":"hkimmd.png","person_id":"P-hkimmd_admin"},"attributes":[{"id":"A-hkidno","name":"HK ID Card Number","type":"did.attribute"},{"id":"A-first_name","name":"First Name","type":"did.attribute"},{"id":"A-last_name","name":"Last Name","type":"did.attribute"},{"id":"A-dob","name":"Date of Birth","type":"did.attribute"},{"id":"A-gender","name":"Gender","type":"did.attribute"}],"attribute_ids":["A-hkidno","A-first_name","A-last_name","A-dob","A-gender"]},{"id":"C-hkidcard7","type":"did.credential","name":"HongKongIdentityCard","organization_id":"O-hkimmd","organization":{"id":"O-hkimmd","type":"did.organization","name":"Hong Kong Immigration Department","logo":"hkimmd.png","person_id":"P-hkimmd_admin"},"attributes":[{"id":"A-hkidno","name":"HK ID Card Number","type":"did.attribute"},{"id":"A-first_name","name":"First Name","type":"did.attribute"},{"id":"A-last_name","name":"Last Name","type":"did.attribute"},{"id":"A-dob","name":"Date of Birth","type":"did.attribute"},{"id":"A-gender","name":"Gender","type":"did.attribute"}],"attribute_ids":["A-hkidno","A-first_name","A-last_name","A-dob","A-gender"]},{"id":"C-hkidcard99","type":"did.credential","name":"Hong Kong IdentityCard","organization_id":"O-hkimmd","organization":{"id":"O-hkimmd","type":"did.organization","name":"Hong Kong Immigration Department","logo":"hkimmd.png","person_id":"P-hkimmd_admin"},"attributes":[{"attribute_id":"A-hkidno","name":"HK ID Card Number","type":"did.credential.attribute"},{"attribute_id":"A-first_name","name":"First Name","type":"did.credential.attribute"},{"attribute_id":"A-last_name","name":"Last Name","type":"did.credential.attribute"},{"attribute_id":"A-dob","name":"Date of Birth","type":"did.credential.attribute"},{"attribute_id":"A-gender","name":"Gender","type":"did.credential.attribute"},{"attribute_id":"A-issue_date","name":"Issue Date","type":"did.credential.attribute"}],"attribute_ids":["A-hkidno","A-first_name","A-last_name","A-dob","A-gender","A-issue_date"]},{"id":"C-wqwq","type":"did.credential","name":"wqwq","organization_id":"O-hkimmd","organization":{"id":"O-hkimmd","type":"did.organization","name":"Hong Kong Immigration Department","logo":"hkimmd.png","person_id":"P-hkimmd_admin"},"attributes":[],"attribute_ids":[]},{"id":"eqwwq","type":"did.credential","name":"wqwqqw","organization_id":"O-hkimmd","organization":{"id":"O-hkimmd","type":"did.organization","name":"Hong Kong Immigration Department","logo":"hkimmd.png","person_id":"P-hkimmd_admin"},"attributes":[],"attribute_ids":[]}];
        commit('setCredentials',data);
        // return new Promise((resolve, reject) => {
        //       axios.get('/organizations/credentials').then(function (response) {
        //         commit('setCredentials',response.data);
        //         console.log(response.data);
        //         resolve()
        //       })
        //       .catch(function (error) {
        //         reject(error);
        //       });
        //   });
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