<template>
  <Page actionBarHidden='true'>
    <FlexboxLayout flexDirection="column" justifyContent='center'>
      <StackLayout class="nt-form" orientation='vertical'>
        <Image src="~/assets/images/logo.png" stretch="aspectFit" class="logo m-b-30"/>
        <TextField v-model="email"  hint="Email" keyboardType="email" autocorrect="false" autocapitalizationType="none"/>
        <TextField v-model="password" hint="Password" secure="true" autocorrect="false" autocapitalizationType="none"/>
        <Button text="Login" @tap="login"/>
        <Label text="Do not have an account?" class="text-center m-t-20" @tap="register"/>
      </StackLayout>
    </FlexboxLayout>
  </Page>
</template>

<script >
export default {
  data() {
    return {
      email: "",
      password: "",
      mobile:""
    };
  },
  methods:{
      register(){
        console.log(this.email);
      },
      login(){
        console.log('fuck');
      }
  }
};
</script>

<style scoped>

</style>
