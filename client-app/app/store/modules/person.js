import * as appSettings from 'tns-core-modules/application-settings';
import * as http from "tns-core-modules/http";
import axios from 'axios';

const state = {
    person:null,
   // credentials: state.person.credentials
    // credentials:[
    //     {
    //       "attributes": [
    //         {
    //           "attribute_id": "A-hkidno",
    //           "name": "HK ID Card Number",
    //           "type": "did.person.credential.attribute",
    //           "value": "R371003(2)"
    //         },
    //         {
    //           "attribute_id": "A-first_name",
    //           "name": "First Name",
    //           "type": "did.person.credential.attribute",
    //           "value": "Steven"
    //         },
    //         {
    //           "attribute_id": "A-last_name",
    //           "name": "Last Name",
    //           "type": "did.person.credential.attribute",
    //           "value": "Lam"
    //         },
    //         {
    //           "attribute_id": "A-dob",
    //           "name": "Date of Birth",
    //           "type": "did.person.credential.attribute",
    //           "value": "1991-04-10"
    //         },
    //         {
    //           "attribute_id": "A-gender",
    //           "name": "Gender",
    //           "type": "did.person.credential.attribute",
    //           "value": "M"
    //         },
    //         {
    //           "attribute_id": "A-issue_date",
    //           "name": "Issue Date",
    //           "type": "did.person.credential.attribute",
    //           "value": "2020-01-01"
    //         }
    //       ],
    //       "credential_id": "C-hkidno",
    //       "name": "Hong Kong Identity Number",
    //       "type": "did.person.credential"
    //     },
    //     {
    //         "attributes": [
    //           {
    //             "attribute_id": "A-hkidno",
    //             "name": "HK ID Card Number",
    //             "type": "did.person.credential.attribute",
    //             "value": "R371003(2)"
    //           },
    //           {
    //             "attribute_id": "A-first_name",
    //             "name": "First Name",
    //             "type": "did.person.credential.attribute",
    //             "value": "Steven"
    //           },
    //           {
    //             "attribute_id": "A-last_name",
    //             "name": "Last Name",
    //             "type": "did.person.credential.attribute",
    //             "value": "Lam"
    //           },
    //           {
    //             "attribute_id": "A-dob",
    //             "name": "Date of Birth",
    //             "type": "did.person.credential.attribute",
    //             "value": "1991-04-10"
    //           },
    //           {
    //             "attribute_id": "A-gender",
    //             "name": "Gender",
    //             "type": "did.person.credential.attribute",
    //             "value": "M"
    //           },
    //           {
    //             "attribute_id": "A-issue_date",
    //             "name": "Issue Date",
    //             "type": "did.person.credential.attribute",
    //             "value": "2020-01-01"
    //           }
    //         ],
    //         "credential_id": "C-hkidno",
    //         "name": "Hong Kong Identity Number 2",
    //         "type": "did.person.credential"
    //       },
    //       {
    //         "attributes": [
    //           {
    //             "attribute_id": "A-hkidno",
    //             "name": "HK ID Card Number",
    //             "type": "did.person.credential.attribute",
    //             "value": "R371003(2)"
    //           },
    //           {
    //             "attribute_id": "A-first_name",
    //             "name": "First Name",
    //             "type": "did.person.credential.attribute",
    //             "value": "Steven"
    //           },
    //           {
    //             "attribute_id": "A-last_name",
    //             "name": "Last Name",
    //             "type": "did.person.credential.attribute",
    //             "value": "Lam"
    //           },
    //           {
    //             "attribute_id": "A-dob",
    //             "name": "Date of Birth",
    //             "type": "did.person.credential.attribute",
    //             "value": "1991-04-10"
    //           },
    //           {
    //             "attribute_id": "A-gender",
    //             "name": "Gender",
    //             "type": "did.person.credential.attribute",
    //             "value": "M"
    //           },
    //           {
    //             "attribute_id": "A-issue_date",
    //             "name": "Issue Date",
    //             "type": "did.person.credential.attribute",
    //             "value": "2020-01-01"
    //           }
    //         ],
    //         "credential_id": "C-hkidno",
    //         "name": "Hong Kong Identity Number 3",
    //         "type": "did.person.credential"
    //       },{
    //         "attributes": [
    //           {
    //             "attribute_id": "A-hkidno",
    //             "name": "HK ID Card Number",
    //             "type": "did.person.credential.attribute",
    //             "value": "R371003(2)"
    //           },
    //           {
    //             "attribute_id": "A-first_name",
    //             "name": "First Name",
    //             "type": "did.person.credential.attribute",
    //             "value": "Steven"
    //           },
    //           {
    //             "attribute_id": "A-last_name",
    //             "name": "Last Name",
    //             "type": "did.person.credential.attribute",
    //             "value": "Lam"
    //           },
    //           {
    //             "attribute_id": "A-dob",
    //             "name": "Date of Birth",
    //             "type": "did.person.credential.attribute",
    //             "value": "1991-04-10"
    //           },
    //           {
    //             "attribute_id": "A-gender",
    //             "name": "Gender",
    //             "type": "did.person.credential.attribute",
    //             "value": "M"
    //           },
    //           {
    //             "attribute_id": "A-issue_date",
    //             "name": "Issue Date",
    //             "type": "did.person.credential.attribute",
    //             "value": "2020-01-01"
    //           }
    //         ],
    //         "credential_id": "C-hkidno",
    //         "name": "Hong Kong Identity Number 4",
    //         "type": "did.person.credential"
    //       },
    //       {
    //         "attributes": [
    //           {
    //             "attribute_id": "A-hkidno",
    //             "name": "HK ID Card Number",
    //             "type": "did.person.credential.attribute",
    //             "value": "R371003(2)"
    //           },
    //           {
    //             "attribute_id": "A-first_name",
    //             "name": "First Name",
    //             "type": "did.person.credential.attribute",
    //             "value": "Steven"
    //           },
    //           {
    //             "attribute_id": "A-last_name",
    //             "name": "Last Name",
    //             "type": "did.person.credential.attribute",
    //             "value": "Lam"
    //           },
    //           {
    //             "attribute_id": "A-dob",
    //             "name": "Date of Birth",
    //             "type": "did.person.credential.attribute",
    //             "value": "1991-04-10"
    //           },
    //           {
    //             "attribute_id": "A-gender",
    //             "name": "Gender",
    //             "type": "did.person.credential.attribute",
    //             "value": "M"
    //           },
    //           {
    //             "attribute_id": "A-issue_date",
    //             "name": "Issue Date",
    //             "type": "did.person.credential.attribute",
    //             "value": "2020-01-01"
    //           }
    //         ],
    //         "credential_id": "C-hkidno",
    //         "name": "Hong Kong Identity Number 5",
    //         "type": "did.person.credential"
    //       },
    //       {
    //         "attributes": [
    //           {
    //             "attribute_id": "A-hkidno",
    //             "name": "HK ID Card Number",
    //             "type": "did.person.credential.attribute",
    //             "value": "R371003(2)"
    //           },
    //           {
    //             "attribute_id": "A-first_name",
    //             "name": "First Name",
    //             "type": "did.person.credential.attribute",
    //             "value": "Steven"
    //           },
    //           {
    //             "attribute_id": "A-last_name",
    //             "name": "Last Name",
    //             "type": "did.person.credential.attribute",
    //             "value": "Lam"
    //           },
    //           {
    //             "attribute_id": "A-dob",
    //             "name": "Date of Birth",
    //             "type": "did.person.credential.attribute",
    //             "value": "1991-04-10"
    //           },
    //           {
    //             "attribute_id": "A-gender",
    //             "name": "Gender",
    //             "type": "did.person.credential.attribute",
    //             "value": "M"
    //           },
    //           {
    //             "attribute_id": "A-issue_date",
    //             "name": "Issue Date",
    //             "type": "did.person.credential.attribute",
    //             "value": "2020-01-01"
    //           }
    //         ],
    //         "credential_id": "C-hkidno",
    //         "name": "Hong Kong Identity Number 6",
    //         "type": "did.person.credential"
    //       },
    //       {
    //         "attributes": [
    //           {
    //             "attribute_id": "A-hkidno",
    //             "name": "HK ID Card Number",
    //             "type": "did.person.credential.attribute",
    //             "value": "R371003(2)"
    //           },
    //           {
    //             "attribute_id": "A-first_name",
    //             "name": "First Name",
    //             "type": "did.person.credential.attribute",
    //             "value": "Steven"
    //           },
    //           {
    //             "attribute_id": "A-last_name",
    //             "name": "Last Name",
    //             "type": "did.person.credential.attribute",
    //             "value": "Lam"
    //           },
    //           {
    //             "attribute_id": "A-dob",
    //             "name": "Date of Birth",
    //             "type": "did.person.credential.attribute",
    //             "value": "1991-04-10"
    //           },
    //           {
    //             "attribute_id": "A-gender",
    //             "name": "Gender",
    //             "type": "did.person.credential.attribute",
    //             "value": "M"
    //           },
    //           {
    //             "attribute_id": "A-issue_date",
    //             "name": "Issue Date",
    //             "type": "did.person.credential.attribute",
    //             "value": "2020-01-01"
    //           }
    //         ],
    //         "credential_id": "C-hkidno",
    //         "name": "Hong Kong Identity Number 7",
    //         "type": "did.person.credential"
    //       },
    //       {
    //         "attributes": [
    //           {
    //             "attribute_id": "A-hkidno",
    //             "name": "HK ID Card Number",
    //             "type": "did.person.credential.attribute",
    //             "value": "R371003(2)"
    //           },
    //           {
    //             "attribute_id": "A-first_name",
    //             "name": "First Name",
    //             "type": "did.person.credential.attribute",
    //             "value": "Steven"
    //           },
    //           {
    //             "attribute_id": "A-last_name",
    //             "name": "Last Name",
    //             "type": "did.person.credential.attribute",
    //             "value": "Lam"
    //           },
    //           {
    //             "attribute_id": "A-dob",
    //             "name": "Date of Birth",
    //             "type": "did.person.credential.attribute",
    //             "value": "1991-04-10"
    //           },
    //           {
    //             "attribute_id": "A-gender",
    //             "name": "Gender",
    //             "type": "did.person.credential.attribute",
    //             "value": "M"
    //           },
    //           {
    //             "attribute_id": "A-issue_date",
    //             "name": "Issue Date",
    //             "type": "did.person.credential.attribute",
    //             "value": "2020-01-01"
    //           }
    //         ],
    //         "credential_id": "C-hkidno",
    //         "name": "Hong Kong Identity Number 8",
    //         "type": "did.person.credential"
    //       },{
    //         "attributes": [
    //           {
    //             "attribute_id": "A-hkidno",
    //             "name": "HK ID Card Number",
    //             "type": "did.person.credential.attribute",
    //             "value": "R371003(2)"
    //           },
    //           {
    //             "attribute_id": "A-first_name",
    //             "name": "First Name",
    //             "type": "did.person.credential.attribute",
    //             "value": "Steven"
    //           },
    //           {
    //             "attribute_id": "A-last_name",
    //             "name": "Last Name",
    //             "type": "did.person.credential.attribute",
    //             "value": "Lam"
    //           },
    //           {
    //             "attribute_id": "A-dob",
    //             "name": "Date of Birth",
    //             "type": "did.person.credential.attribute",
    //             "value": "1991-04-10"
    //           },
    //           {
    //             "attribute_id": "A-gender",
    //             "name": "Gender",
    //             "type": "did.person.credential.attribute",
    //             "value": "M"
    //           },
    //           {
    //             "attribute_id": "A-issue_date",
    //             "name": "Issue Date",
    //             "type": "did.person.credential.attribute",
    //             "value": "2020-01-01"
    //           }
    //         ],
    //         "credential_id": "C-hkidno",
    //         "name": "Hong Kong Identity Number 9",
    //         "type": "did.person.credential"
    //       },{
    //         "attributes": [
    //           {
    //             "attribute_id": "A-hkidno",
    //             "name": "HK ID Card Number",
    //             "type": "did.person.credential.attribute",
    //             "value": "R371003(2)"
    //           },
    //           {
    //             "attribute_id": "A-first_name",
    //             "name": "First Name",
    //             "type": "did.person.credential.attribute",
    //             "value": "Steven"
    //           },
    //           {
    //             "attribute_id": "A-last_name",
    //             "name": "Last Name",
    //             "type": "did.person.credential.attribute",
    //             "value": "Lam"
    //           },
    //           {
    //             "attribute_id": "A-dob",
    //             "name": "Date of Birth",
    //             "type": "did.person.credential.attribute",
    //             "value": "1991-04-10"
    //           },
    //           {
    //             "attribute_id": "A-gender",
    //             "name": "Gender",
    //             "type": "did.person.credential.attribute",
    //             "value": "M"
    //           },
    //           {
    //             "attribute_id": "A-issue_date",
    //             "name": "Issue Date",
    //             "type": "did.person.credential.attribute",
    //             "value": "2020-01-01"
    //           }
    //         ],
    //         "credential_id": "C-hkidno",
    //         "name": "Hong Kong Identity Number 10",
    //         "type": "did.person.credential"
    //       }

    //   ]
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
    async init({commit,dispatch,rootState}){
        return new Promise((resolve, reject) => {
            const token = rootState.common.token;
            // console.log(token);
            axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
            axios.get(API_PATH+'persons/me').then((res)=>{
                const person = res.data;
                commit('setPerson',person);
                resolve(res);
            }).catch((err)=>{
                commit('setPerson',null,{ root: true });
                reject(err.response.data)
                console.log(err);
            }); 
      });      
    },
    async register ({commit,dispatch},{email,password,mobile}){
        return new Promise((resolve, reject) => {
            axios.post(API_PATH+'persons/register', {email,password,mobile}).then((res)=>{
               // console.log(res.data);
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
       console.log(person);
        state.person = person;
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