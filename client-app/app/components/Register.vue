<template>
  <Page actionBarHidden='true'>
    <FlexboxLayout flexDirection="column" justifyContent='center'>
      <StackLayout class="nt-form" orientation='vertical'>
        <Image src="~/assets/images/logo.png" stretch="aspectFit" class="logo m-b-30"/>
        <TextField v-model="email"  hint="Email" keyboardType="email" autocorrect="false" autocapitalizationType="none"/>
        <TextField v-model="password" hint="Password" secure="true" autocorrect="false" autocapitalizationType="none"/>
        <TextField v-model="conf_password" hint="Confirm Password" secure="true" autocorrect="false" autocapitalizationType="none"/>
        <TextField v-model="mobile" hint="Mobile Phone" keyboardType="number" autocorrect="false" autocapitalizationType="none"/>
        <Button text="Register" @tap="register"/>
        <Label text="Already have an account?" class="text-center m-t-20" @tap="login"/>
      </StackLayout>
    </FlexboxLayout>
  </Page>
</template>

<script >
import Login from './Login'
import { required,email,minLength,sameAs} from 'vuelidate/lib/validators';
import {LoadingIndicator,Mode} from '@nstudio/nativescript-loading-indicator';

const loader = new LoadingIndicator();

export default {
  data() {
    return {
      email: "stevenlam123@yahoo.com.hk",
      password: "12345678",
      conf_password:"12345678",
      mobile:"12345678"
    };
  },
  methods:{
      register(){
        this.$v.$touch();
        if (this.$v.$invalid) {
          alert('Please fill the form correctly!');
        }else{
          loader.show();
          const data = {
              email:this.email,
              password:this.password,
              mobile:this.mobile,
          };
          this.$store.dispatch('register',data)
          .then(()=>{
             alert('Register Success').then(() => {
              this.$navigateTo(Login);
            });
          }).catch((error)=>{
             alert(error.message);
            console.log(error);
          }).finally(()=>{
            loader.hide();
          });
        }
      },
      login(){
       this.$navigateTo(Login);
      }
  },
  validations: {
    email: {
      required,
      email 
    },
    password: {
      required,
      minLength: minLength(8)
    },
    conf_password: {
      sameAsPassword: sameAs('password')
    },
     mobile: {
      required
    }
  }
};
</script>

<style scoped>

</style>
