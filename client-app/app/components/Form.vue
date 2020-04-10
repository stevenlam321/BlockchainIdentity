<template>
  <Page actionBarHidden='true'>
    <StackLayout backgroundColor="#3c495e">
     <TextField v-model="email" hint="Email" keyboardType="email"/>
     <TextField v-model="password" hint="Password" secure="true"/>
     <TextField v-model="mobile" hint="Mobile Phone" keyboardType="number"/>
      <Label :text="fucking" col="0" row="0"/>
         <RadDataForm :source="person">
    </RadDataForm>
    </StackLayout>
  </Page>
</template>

<script >
export default {
  data() {
    return {
      email: "",
      password: "",
       fucking:'hello11',
       person: {
        name: 'John',
        age: 23,
        email: 'john@company.com',
        city: 'New York',
        street: '5th Avenue',
        streetNumber: 11,
      }
    };
  }
};
</script>

<style scoped>
ActionBar {
  background-color: #53ba82;
  color: #ffffff;
}

.message {
  vertical-align: center;
  text-align: center;
  font-size: 20;
  color: #333333;
}
</style>
