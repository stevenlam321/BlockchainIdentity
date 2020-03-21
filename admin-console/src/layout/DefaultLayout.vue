<template>
<div>
    <Header/>
    <Loading/>
    <b-container class="content">
        <slot/>
    </b-container>
</div>
  
</template>

<script>
import Header from '../components/Header';
import Loading from '../components/Loading';

export default {
    name:"DefaultLayout",
     components: {
        Header,
        Loading
    },
}
</script>

<style>
.content{
    padding: 25px 15px;
}
</style>