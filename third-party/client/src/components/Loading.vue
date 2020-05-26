<template>

    <div id='loading' v-if="loading">
        <b-spinner label="Spinning"></b-spinner>
    </div>
</template>

<script>
export default {
    name: "Loading",
    props:['loading'],
    methods:{
       
    },
//     data (){
//         return {
//             loading:true
//         }
//     }
}
</script>

<style>
#loading{
  width: 100%;
  height: 100%;
  background: rgba(0,0,0, 0.3);
  position: fixed;
  z-index: 1000;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
    top: 0;
    left:0;
    right: 0;
    bottom: 0;
}
</style>