<template>
    <Page>
      <StackLayout>
        <Label :text="item.name" class="credential-header"></Label>
        <GridLayout columns="auto,auto" :rows="rows" class="credential-data">
        <Label v-for="(label,index) in labels" :text="label" :key="index" :row="index" col="0" />
        <Label v-for="(value,index) in values" :text="value" :key="index" :row="index" col="1" />
</GridLayout>
      </StackLayout>
    </Page>
</template>

<script >
  export default {
    props: ['item'],
    data() {
      return {
      
      }
    },
    methods:{
    },
    created (){
      console.log(this.item.attributes);
      //  console.log("===================================================");
      // console.log(this.ls);
    },
    computed:{
        labels(){
          return this.item.attributes.map((attribute)=>attribute.name);
        },
         values(){
          return this.item.attributes.map((attribute)=>attribute.value);
        },
        rows(){
          var rows = [];
           for (let i = 0; i < this.item.attributes.length; i++) {
              rows.push("auto");
           }
           return rows.join(",");
        }
    }
  }
</script>

<style scoped>
Label{
  margin: 5;
}
.credential-header{
  font-size: 18;
  font-weight: bold;
}
</style>
