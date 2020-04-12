<template>
  <Page actionBarHidden='true'>
    <FlexboxLayout flexDirection="column" justifyContent='center'>
      <StackLayout class="nt-form" orientation='vertical'>
        <Image src="~/assets/images/logo.png" stretch="aspectFit" class="logo m-b-30"/>
        <TextField v-model="email" hint="Email" keyboardType="email" autocorrect="false" autocapitalizationType="none"/>
        <TextField v-model="password" hint="Password" secure="true" autocorrect="false" autocapitalizationType="none"/>
        <Button text="Login" @tap="login" />
        <Label text="Do not have an account?" class="text-center m-t-20" @tap="register"/>
      </StackLayout>
    </FlexboxLayout>
  </Page>
</template>

<script >
import { required,email } from 'vuelidate/lib/validators'
import Register from './Register'
import App from './App';
import {LoadingIndicator,Mode} from '@nstudio/nativescript-loading-indicator';

const loader = new LoadingIndicator();
export default {
  data() {
    return {
      email: "stevenlam123@yahoo.com.hk",
      password: "11111111",
    };
  },
  methods:{
      register(){
         this.$navigateTo(Register);
        // console.log(this.$store.state.common.token);
      },
      login(){
        this.$v.$touch();
        
        if (this.$v.$invalid) {
          alert('Please fill the form correctly!');
        }else{
          loader.show();
          this.$store.dispatch('login',{email:this.email,password:this.password})
          .then(()=>{
             this.$navigateTo(App);
          }).catch((error)=>{
            alert(error.message);
            console.log(error);
          }).finally(()=>{
            loader.hide();
          });
        }
      }
  },
  validations: {
    email: {
      required,
      email 
    },
    password: {
      required
    }
  }
};
</script>

<style scoped>

</style>

