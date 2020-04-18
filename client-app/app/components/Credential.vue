<template>
    <Page>
      <StackLayout>
        <Label :text="credential.name" class="credential-header"></Label>
        <StackLayout class='attribute' v-for="attribute in credential.attributes" :key="attribute.id" orientation='vertical'>
            <Label :text="attribute.name" class="attribute-name" />
            <Label :text="attribute.value" class="attribute-value" />
        </StackLayout>
        <StackLayout class='attribute' orientation='vertical'>
            <Label  text="Assigned By" class="attribute-name" />
            <Label :text="credential.organization_name"  class="attribute-value"/>
            <Image class='org-logo' :src="'http://localhost:8080/img/'+credential.organization_logo" stretch="aspectFit" /> 
        </StackLayout>
      </StackLayout>
    </Page>
</template>

<script >
  export default {
    props: ['credential'],
    data() {
      return {
      
      }
    },
    methods:{
    },
    created (){
      console.log(this.credential.attributes);
      //  console.log("===================================================");
      // console.log(this.ls);
    },
    computed:{
        labels(){
          return this.credential.attributes.map((attribute)=>attribute.name);
        },
         values(){
          return this.credential.attributes.map((attribute)=>attribute.value);
        },
        rows(){
          var rows = [];
           for (let i = 0; i < this.credential.attributes.length; i++) {
              rows.push("auto");
           }
           rows.push("auto");
           return rows.join(",");
        }
    }
  }
</script>

<style scoped>
.org-logo{
  width: 50;
  height: 50;
  horizontal-align:left;
}
Label{
  margin: 0;
}
.attribute{
  margin: 5 10;
}
.credential-header{
  font-size: 18;
  font-weight: bold;
  text-align: center;
  margin:15 0;
}
.attribute-name{
  font-weight: bold;
}
</style>
