<template>
  <DefaultLayout>
  <b-row>
    <b-col md="8" offset-md="2">
         <b-form @submit="onSubmit" @reset="onReset" v-if="show" validated>
            <h3>Create Credential</h3>
            <b-form-group label="Credential ID:" label-for="credential">
            <b-input-group prepend="C-" class="mb-2 mr-sm-2 mb-sm-0">
                <b-input id="credential" placeholder="Credential ID" required v-model="form.credential_id" name="credential"></b-input>
            </b-input-group>
         </b-form-group>

      <b-form-group  label="Credential Name:" label-for="name">
        <b-form-input id="name" v-model="form.name" required placeholder="Credential Name"></b-form-input>
      </b-form-group>

      <b-form-group label="Attributes:">
          <div class="d-flex attribute-row" v-for="(attr,index) in form.attrs" v-bind:key="index">
            <div class="row-action-btn-container d-flex justify-content-center align-items-center"><b-icon icon="x-circle" class="row-action-btn" variant="danger" @click="removeAttributeRow(index)"></b-icon></div>
            <div class="flex-fill">
                <b-form-select  v-model="attr.id" :options="parsesAttributes" required></b-form-select>
            </div>
          </div>
      </b-form-group>
       <b-form-group>
            <b-button type="button" variant="success" size="sm" @click="addAttributeRow">Add</b-button>
        </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button> <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    </b-col>
  </b-row>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from "../layout/DefaultLayout";
import axios from 'axios';
import {mapGetters,mapActions} from 'vuex';
export default {
  name: "CreateCredential",
  components: {
    DefaultLayout
  },
  data() {
      return {
        form: {
          credential_id: '',
          name: null,
          attrs:[],
        },
        show: true,
      }
    },
    methods: {
      ...mapActions(['fetchAttributes']),
      addAttributeRow(){
          this.form.attrs.push({id:null});
      },
      removeAttributeRow(index){
           this.form.attrs.splice(index, 1);
      },
      
      onSubmit(evt) {
        evt.preventDefault();
        this.$store.dispatch('setLoading',true);
        const attribute_ids = this.form.attrs.map(attr=>attr.id);
        const data = {
            id: 'C-'+this.form.credential_id,
            name: this.form.name,
            attribute_ids:attribute_ids
        };
      
        this.$store.dispatch('CreateCredential',data)
        .then(()=>{
            alert('Credential Created');
            this.resetForm();
        })
        .catch((err)=>{
            alert(err.response.data.message);
        })
        .finally(()=>{
            this.$store.dispatch('setLoading',false);
        });
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
       this.resetForm();
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },
      resetForm(){
        this.form.credential_id = ''
        this.form.name = ''
        this.form.attrs = []
      }
    },
    computed: mapGetters(['parsesAttributes']),
    async created(){
         this.$store.dispatch('setLoading',true);
        this.fetchAttributes().catch((err)=>{
            alert(err);
        }).finally(()=>{
            this.$store.dispatch('setLoading',false);
        });
    }
};
</script>

<style scoped>
.attribute-row+.attribute-row{
    margin-top:15px;
}
.row-action-btn-container{
    width: 40px;
}
.row-action-btn{
    font-size: 30px;
    cursor: pointer;
}
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