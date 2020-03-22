<template>

    <div id='loading' v-if="loading">
        <b-spinner label="Spinning"></b-spinner>
    </div>
</template>

<script>
import {mapGetters,mapState} from 'vuex';
export default {
    name: "Loading",
    computed:
    mapState({
      loading: state => state.common.loading,
    }),
    methods:{
        logout(){
             this.$store.dispatch('logout')
            .then(() => {
                this.$router.push('/login')
            })
        }
    }
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
}
</style>