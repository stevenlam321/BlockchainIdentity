<template>
  <div id="app">
    <Header/>
    <Loading v-bind:loading="loading"/>
    <b-container class="content">
        <Home @setLoading="setLoading"/>
    </b-container>
  </div>
</template>

<script>
import Header from './components/Header';
import Loading from './components/Loading';
import Home from './views/Home';

export default {
  name: 'App',
  components: {
   Header,Loading,Home
  },
  data(){
    return {
      loading:false
    };
  },
  methods:{
    setLoading(loading){
      this.loading = loading;
    }
  }
}
</script>

<style>

</style>
