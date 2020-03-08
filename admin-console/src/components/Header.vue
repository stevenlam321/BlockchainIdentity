<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand href="#">NavBar</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
            <b-nav-item-dropdown text="Credential" right>
                <b-dropdown-item to="/">First Action</b-dropdown-item>
                <b-dropdown-item to="/about">First Action</b-dropdown-item>
            </b-nav-item-dropdown>
        </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <template v-slot:button-content>
            <em>User</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-button variant="outline-info" class="my-2 my-sm-0" type="submit" @click="logout">Logout</b-button>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import {mapGetters,mapActions} from 'vuex';
export default {
    name: "Header",
    computed: mapGetters(['isLoggedIn']),
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