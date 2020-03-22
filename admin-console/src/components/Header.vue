<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-container>
    <b-navbar-brand href="/">{{organization?organization.name:''}}</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
            <b-nav-item-dropdown text="Credential" right>
                <b-dropdown-item to="/credentials">List</b-dropdown-item>
                <b-dropdown-item to="/credentials/create">Create</b-dropdown-item>
            </b-nav-item-dropdown>
        </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-button variant="outline-info" class="my-2 my-sm-0" type="submit" @click="logout">Logout</b-button>
      </b-navbar-nav>
    </b-collapse>
</b-container>
  </b-navbar>
</template>

<script>
import {mapGetters,mapActions} from 'vuex';
export default {
    name: "Header",
    computed: mapGetters(['isLoggedIn','organization']),
    methods:{
        logout(){
             this.$store.dispatch('logout')
            .then(() => {
                this.$router.push('/login')
            })
        }
    },
    created(){
      
    }
}
</script>

<style>

</style>