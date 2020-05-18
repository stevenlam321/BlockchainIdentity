<template>
  <DefaultLayout>
      <div class="links">
        <a href="/" class="link">Manually Fill</a>
      </div>
  <b-card
      header="Application Form (Fill by HKDID)"
    >  
    <h6>You application will be instantly processed if filled by HKDID system</h6>
    <br/>
    <div class="text-center">
       <h6>Please scan the QR code in your HKDID Mobile App and approve the request</h6><br/>
        <qrcode-vue :value="qrcode" :size="size" level="H"></qrcode-vue>
    </div>
  
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
          disabled
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
          disabled
          placeholder="Enter Last Name"
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
          disabled
          placeholder="Enter Hong Kong ID Card Number"
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
          disabled
        ></b-form-input>        
      </b-form-group>       
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset"  class='reset' variant="danger">Reset</b-button>
    </b-form>
    </b-card>
    
  </DefaultLayout>
</template>

<script>
import DefaultLayout from "../layout/DefaultLayout";
import {mapGetters,mapActions,mapState} from 'vuex';
import QrcodeVue from 'qrcode.vue'
export default {
  name: "HKDIDFill",
  components: {
    DefaultLayout,
    QrcodeVue
  },
   data() {
      return {
        form: {
          first_name: '',
          last_name: '',
          email: '',
          hkidno: '',
        },
        show: true,
        qrcode_data: {
          app_id: 'APP-ABC123',
          email:"1",
          mobile:"0",
          credentials:[
            {
              credential_id: 'C-hkidcard',
              attribute_ids:[
                "A-first_name",
                "A-last_name",
                "A-hkidno"
              ]
            }
          ]
        },
        size: 300,
        }
    },
   computed: {
     qrcode (){
        return JSON.stringify(this.qrcode_data)
     },
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