<template>
  <DefaultLayout>
      <div class="assign-credential-form-container">
          <h1 class="page-title">Credential Assignment</h1>
        <ul class="steps">
            <li v-bind:class="{ active: step>=1 }">
                <div class="step-num">1</div>
                <div class="step-name">Enter Email</div>
            </li>
            <li v-bind:class="{ active: step>=2 }">
                <div class="step-num">2</div>
                <div class="step-name">Check User</div>
            </li>
            <li v-bind:class="{ active: step>=3 }">
            <div class="step-num">3</div>
                <div class="step-name">Fill Credential</div>
            </li>
            <li v-bind:class="{ active: step>=4 }">
            <div class="step-num">4</div>
                <div class="step-name">Finish</div>
            </li>
        </ul>
<b-row>
    <b-col md="8" offset-md="2">    
        <b-form @submit="onSubmit" @reset="onReset" validated v-if="show">
             <div class="step-input-container" id="step1" v-if="step == 1">
                <h3>Step 1: Enter Email</h3>
                <b-form-group label="Email" label-for="email">
                    <b-form-input id="email" v-model="form.email" type="email" required placeholder="Enter email"></b-form-input>
                </b-form-group>
             </div>
              <div class="step-input-container" id="step2" v-if="step == 2">
                <h3>Step 2: Check User</h3>
                <div class="d-flex align-items-center user-info" v-if="targetPerson">
                    <div class="person-icon"><b-icon icon="person"></b-icon></div>
                    <table class="user-basic-info">
                    <tr>
                        <td>Person ID: </td><td>{{targetPerson.id}}</td>
                    </tr>
                     <tr>
                        <td>Email: </td><td>{{targetPerson.email}}</td>
                    </tr>
                     <tr>
                        <td>Mobile: </td><td>{{targetPerson.mobile}}</td>
                    </tr>
                      <tr>
                        <td>HKID: </td><td>{{targetPerson.hkidno?targetPerson.hkidno:'N/A'}}</td>
                    </tr>
                </table>
                </div>
                
                
             </div>
              <div class="step-input-container" id="step3" v-if="step == 3">
                <h3>Step 3: Fill Credential</h3>
                <b-form-group label="Credential" label-for="credential_id">
                    <select class="custom-select" id="credential_id" v-model="form.credential_id" required aria-required="true">
                        <option :value="null">Select Credential</option>
                        <option v-for="credential in credentials" v-bind:key="credential.id" v-bind:value="credential.id">{{credential.id}} ({{credential.name}})</option>
                    </select>
                </b-form-group>
                <h5 v-if="credential" class="credential-name">Attributes</h5>

                <b-form-group v-bind:label="attribute.name" v-bind:label-for="attribute.id" v-for="attribute in form.attributes" v-bind:key="attribute.attribute_id">
                    <b-form-input v-bind:id="attribute.id" v-model="attribute.value" type="text" required  v-bind:placeholder="'Enter ' + attribute.name"></b-form-input>
                </b-form-group>

             </div>
               <div class="step-input-container" id="step4" v-if="step == 4">
                    <h3>Step 4: Finish</h3>
                    <div class="info-container">
                        <h5 class="info-header">Target Person</h5>
                        <div class="d-flex align-items-center user-info">
                                <div class="person-icon"><b-icon icon="person"></b-icon></div>
                                <table class="user-basic-info">
                                <tr>
                                    <td>Person ID: </td><td>{{targetPerson.id}}</td>
                                </tr>
                                <tr>
                                    <td>Email: </td><td>{{targetPerson.email}}</td>
                                </tr>
                                <tr>
                                    <td>Mobile: </td><td>{{targetPerson.mobile}}</td>
                                </tr>
                                <tr>
                                    <td>HKID: </td><td>{{targetPerson.hkidno?targetPerson.hkidno:'N/A'}}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                       <div class="info-container">
                        <h5 class="info-header">Assigning Credential: {{credential.name}}</h5>
                        <div class="d-flex align-items-center user-info"> 
                            <table class="attribute-value-list">
                                <tr v-for="attribute in form.attributes" v-bind:key="attribute.attribute_id">
                                    <td>{{attribute.name}}: </td><td>{{attribute.value}}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            <div class="step-controls">
                <b-button type="button" variant="secondary" v-if="step > 1" @click="previous">Previous</b-button>
                <b-button type="button" variant="primary" v-if="totalStep > step" @click="next" v-bind:disabled="!validatedForm()">Next</b-button>
                 <b-button type="reset" variant="danger" v-if="showSubmitButton" class="submit-btn">Cancel</b-button>
                 <b-button type="submit" variant="warning" v-if="showSubmitButton" class="submit-btn">Submit</b-button>
            </div>
           
          
            </b-form>
            </b-col>
  </b-row>
    </div>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from "../layout/DefaultLayout";
import {mapGetters,mapActions,mapState} from 'vuex';
export default {
  name: "Home",
  components: {
    DefaultLayout
  },
   data() {
      return {
        form: {
          email: '',
          credential_id:null,
          attributes:[],
        },
        credential:null,
        show: true,
        step:1,
        totalStep:4,
        showSubmitButton:false,
        }
    },
   computed: {
    ...mapState({
      credentials: state => state.credential.credentials,
      targetPerson: state => state.credential.targetPerson,
    })
    },
    methods: {
        ...mapActions(['checkPerson','clearTargetPerson']),
        previous(){
            this.step > 1? this.step--:null;
        },
         next(){
            if(this.step == 1){
                  this.$store.dispatch('setLoading',true);
                this.checkPerson(this.form.email).then(()=>{
                     this.step < this.totalStep? this.step++:null;
                }).catch((error)=>{
                      alert('Error: '+error.response.data.message);
                      return;
                }).finally(()=>{
                    this.$store.dispatch('setLoading',false);
                      return;
                });
            }else{
                this.step < this.totalStep? this.step++:null;
            }
           
        },
        validatedForm() {
            switch(this.step){
                case 1:{
                    if(!this.form.email){
                        return false;
                    }
                    return true;
                }
                case 3:{
                    if(!this.form.email){
                        return false;
                    }
                    if(!this.form.credential_id){
                        return false;
                    }
                    for (var i = 0; i< this.form.attributes.length;i ++){
                        var attribute = this.form.attributes[i];
                        if(!attribute.value){
                            return false;
                        }
                    }
                     return true;
                }
                default:
                    return true;
            }
        },
      onSubmit(evt) {
        evt.preventDefault();
        var attribute_values = [];
        for(var attribute of this.form.attributes){
            const attribute_value = {
                attribute_id:attribute.attribute_id,
                value:attribute.value
            };
            attribute_values.push(attribute_value);
        }
       const credential_id = this.credential.id;
       const email = this.form.email;
       const data = {email,credential_id,attribute_values};

        this.$store.dispatch('setLoading',true);
         this.$store.dispatch('assignCredential',data).then(()=>{
              alert('Credential Assigned');
              this.onReset(evt);
         }).catch((err)=>{
             console.log(err);
             alert('Error: '+err.response.data.message);
        }).finally(()=>{
            this.$store.dispatch('setLoading',false);
        });
      },
      onReset(evt) {
        evt.preventDefault()
        this.form.email = '';
        this.form.credential_id = null;
        this.form.attributes = [];
        this.credential = null;
        this.step = 1;
        this.showSubmitButton = false;
        this.show = false,
        this.clearTargetPerson();
        this.$nextTick(() => {
          this.show = true
        })
      }
    },
    watch: {
        step: function (newStep, oldStep) {
            if(newStep == this.totalStep){
                setTimeout(()=>{this.showSubmitButton = true},500);
            }
             if(newStep  < this.totalStep){
                 this.showSubmitButton = false;
            }
        },
        "form.credential_id":function (newCredentialID, oldCredentialID) {
            if(newCredentialID != null){
                this.credential = this.credentials.find((credential)=> credential.id === newCredentialID);
                this.form.attributes = this.credential.attributes;
            }
         
        },
       
        
  },
    created(){
         this.$store.dispatch('setLoading',true);
        this.$store.dispatch('fetchCredentials').catch((err)=>{
            alert(err);
        }).finally(()=>{
            this.$store.dispatch('setLoading',false);
        });
    }
  
};
</script>

<style scoped>
.info-container{
    margin-top: 50px;
}
.info-container{
    border: 1px solid grey;
}
.info-header{
    background: rgb(206, 206, 206);
    padding: 15px;
}
.attribute-value-list td:first-child{
    padding-right: 15px;
}
.page-title{
    margin-top: 15px;
    margin-bottom: 30px;
    text-align: center;
}
.submit-btn.active{
    display: inline-block;
}
.step-controls{
    text-align: center;
}
.step-controls button{
    margin: 0 15px;
    width: 100px;
}
.steps {
    list-style: none;
    display: flex;
  
    margin: 0;
    padding:0;
}
.steps li{
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 10;
}
.steps li::after{
    content: '';
    display: block;
    width: 100%;
    height: 5px;
    background: rgb(141, 141, 141);
    position: absolute;
    top: 14px;
    z-index: -1;
}
.steps li.active .step-num{
    background: rgb(50, 160, 36);
}
.steps li.active::after{
    background: rgb(50, 160, 36);
}
.step-num{
    font-size: 18px;
    border-radius: 100%;
    width: 30px;
    height: 30px;
    background: rgb(141, 141, 141);
    text-align: center;
    line-height: 30px;
    color: blanchedalmond;
}
.step-input-container{
    padding: 30px 0;
}
.credential-name{
    margin-top: 30px;
}
.person-icon{
    width: 100px;
    height: 100px;
    border: 1px solid grey;
    text-align: center;
    border-radius: 100%;
    margin-right: 20px;
}
.person-icon svg{
    font-size: 80px;
    margin-top: 10px;
}
.user-basic-info td:first-child{
    width: 100px;
}
.user-info{
    padding: 15px;
}
</style>