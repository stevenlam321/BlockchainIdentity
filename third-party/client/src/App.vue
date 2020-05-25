<template>
  <div id="app">
    <Header/>
    <Loading/>
    <b-container class="content">
        <Home/>
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
  }
}
</script>

<style>

</style>
