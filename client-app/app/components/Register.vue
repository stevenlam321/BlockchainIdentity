<template>
  <Page actionBarHidden='true'>
    <FlexboxLayout flexDirection="column" justifyContent='center'>
      <StackLayout class="nt-form" orientation='vertical'>
        <ActivityIndicator busy="true"/>
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
import { required,email,minLength,sameAs} from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      email: "",
      password: "",
      conf_password:"",
      mobile:""
    };
  },
  methods:{
      register(){
        this.$v.$touch();
        if (this.$v.$invalid) {
          alert('Please fill the form correctly!');
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
