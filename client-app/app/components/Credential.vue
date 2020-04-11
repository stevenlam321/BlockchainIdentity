<template>
    <Page>
        <Label>Detail</Label>
    </Page>
</template>

<script >
  export default {
    data() {
      return {
        selectedIndex:0,
        credentials:[
          {
            name:"HKID A"
          }
        ]
      }
    },
    methods:{
      indexChange(){

      },
      onItemTap(){

      },
      showDetail(){
        console.log('hello');
      }
    }
  }
</script>

<style scoped>

</style>
