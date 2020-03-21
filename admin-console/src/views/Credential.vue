<template>
  <DefaultLayout>
  <b-row>
    <b-col md="4">
        <h5 class="list-title">Credentials</h5>
        <ul class="credentials list">
            <li v-for="credential in credentials" v-bind:key="credential.id" @click="show(credential)">{{credential.name}}</li>
        </ul>
    </b-col>
    <b-col md="8">
        <h5 class="list-title">Credential Detail</h5>

        <ul class="credential-detail-list" v-if="currentCredential">
            <li>Credential ID: {{currentCredential.id}}</li>
            <li>Name: {{currentCredential.name}}</li>
            <li>Attributes: 
                 <ul v-for="attribute in currentCredential.attributes" v-bind:key="attribute.id" >
                    <li>Attribute ID: {{attribute.attribute_id}}</li>
                    <li>Name: {{attribute.name}}</li>
                </ul>
            </li>
        </ul>
        
    </b-col>
  </b-row>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from "../layout/DefaultLayout";
import axios from 'axios';
import {mapGetters,mapActions} from 'vuex';
export default {
  name: "Credential",
  components: {
    DefaultLayout
  },
  data(){
     return {
      currentCredential:null,
    }
  },
    computed: mapGetters(['credentials']),
    methods:{
        ...mapActions(['fetchCredentials']),
        show (credential){
            this.currentCredential = credential;
        }
    },
    async created(){
        this.fetchCredentials();
    }
};
</script>

<style scoped>
.list{
    list-style: none;
    padding: 0;
}
.list li{
    border-bottom: 1px solid grey;
    padding: 10px ;
    cursor: pointer;
}
.list li:hover{
    background: rgb(202, 202, 202);
    color: #fff;
}
.credential-detail-list{
    list-style: none;
    border: 1px solid grey;
    padding: 20px 20px;
}
.credential-detail-list ul{
    border: 1px dashed grey;
    padding: 5px 20px;
    list-style-position: inside;
    margin: 10px 20px;
}
</style>