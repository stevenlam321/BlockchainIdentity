<template>
  <DefaultLayout>
      <div class="links">
        <a href="/hkdidfill" class="link">Fill By HKDID</a>
      </div>
  <b-card
      header="Application Form (Manually Fill)"
    >  
    <h6>You application will be processed within 1-3 days for verification</h6>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        label="First Name:"
        label-for="first_name"
      >
        <b-form-input
          id="first_name"
          v-model="form.first_name"
          type="text"
          required
          placeholder="Enter First Name"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="Last Name:"
        label-for="last_name"
      >
        <b-form-input
          id="last_name"
          v-model="form.last_name"
          type="text"
          required
          placeholder="Enter Last Name"
        ></b-form-input>
        </b-form-group>
      <b-form-group
        label="Email:"
        label-for="email"
      >
        <b-form-input
          id="email"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter Email"
        ></b-form-input>        
      </b-form-group>    
      <b-form-group
        label="Hong Kong ID Card Number:"
        label-for="hkidno"
      >
        <b-form-input
          id="hkidno"
          v-model="form.hkidno"
          type="text"
          required
          placeholder="Enter Hong Kong ID Card Number"
        ></b-form-input>        
      </b-form-group>
      <b-form-group
        label="Hong Kong ID Card Capture"
        label-for="file"
      >   
      <b-form-file
      v-model="form.file"
      placeholder="Choose a file or drop it here..."
      drop-placeholder="Drop file here..."
      required
      id="file"
    ></b-form-file>      
      </b-form-group>  
      <b-button type="submit" variant="primary">Submit</b-button> 
      <b-button type="reset" variant="danger" class="reset">Reset</b-button>
    </b-form>
    </b-card>
    
  </DefaultLayout>
</template>

<script>
import DefaultLayout from "../layout/DefaultLayout";
import {mapGetters,mapActions,mapState} from 'vuex';
export default {
  name: "ManualFill",
  components: {
    DefaultLayout
  },
   data() {
      return {
        form: {
          first_name: '',
          last_name: '',
          email: '',
          hkidno: '',
          file:null
        },
        show: true
        }
    },
   computed: {
    ...mapState({
     
    })
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.first_name = ''
        this.form.last_name = ''
        this.form.email = ''
        this.form.hkidno = ''
         this.form.file =  null
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  
};
</script>

<style scoped>
.link + .link{
    margin-left: 15px;
}
.links{
    padding: 15px 0;
}
.link.active{
    color: grey;
}
.reset{
  margin-left: 15px;
}
</style>