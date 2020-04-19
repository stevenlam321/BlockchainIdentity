<template>
    <Page >
    
<ActionBar :title="tabs[selectedIndex]">
  <ActionItem @tap="openScanner"
    ios.systemIcon="15" ios.position="right"
    text="delete" android.position="popup" />
</ActionBar>
       <TabView :selectedIndex="selectedIndex" @selectedIndexChange="tabChange">
        <TabViewItem v-bind:title="tabs[0]">
         <ListView for="credential in person.credentials" @itemTap="showDetail" v-if="person">
            <v-template>
              <StackLayout orientation="horizontal" class="credential">
                  <Image class='org-logo' :src="'http://localhost:8080/img/'+credential.organization_logo" stretch="aspectFit" />
                  <Label :text="credential.name"/>
              </StackLayout>
            </v-template>
          </ListView>
          <Label v-else >No credentials</Label>
        </TabViewItem>
        <TabViewItem v-bind:title="tabs[1]">
          <Label text="Content for Tab 2" />
        </TabViewItem>
         <TabViewItem v-bind:title="tabs[2]">
          <Label text="Content for Tab 2" />
        </TabViewItem>
        <TabViewItem v-bind:title="tabs[3]">
           <StackLayout orientation="vertical">
              <GridLayout columns="auto,auto" rows="20,20,20" class="person-detail" v-if="person">
                <Label text="Person ID: " row="0" col="0" class="label"/>
                <Label :text="person.id" row="0" col="1"/>
                <Label text="Email: " row="1" col="0" class="label"/>
                <Label :text="person.email" row="1" col="1"/>
                <Label text="Mobile: " row="2" col="0" class="label"/>
                <Label :text="person.mobile" row="2" col="1"/>
            </GridLayout>
            <Button text="Logout" @tap="logout"/>
          </StackLayout>
        </TabViewItem>
      </TabView>
    </Page>
</template>

<script >
import Credential from './Credential'
import Login from './Login'
import Form from './Form'
import {mapGetters,mapActions,mapState} from 'vuex';
import * as appSettings from 'tns-core-modules/application-settings';
import * as http from 'tns-core-modules/http'
  export default {
    data() {
      return {
        selectedIndex:0,
       // todos:this.$store.allTodos,
        tabs:[
          "Credentials",
          "Requests",
          "Histories",
          "Settings"
        ]
      }
    },
    methods:{
      openScanner(){
          this.$navigateTo(Form)
      },
      tabChange(e){
        this.selectedIndex = e.value;
      },
      showDetail(e){
        const index = e.index;
        const credential = e.item;
        // console.log('================================');
        // console.debug(item);
        this.$navigateTo(Credential,{props:{credential:credential}});
      },
      logout(){
          this.$store.dispatch('logout');
          this.$navigateTo(Login)
      }
    },
    created(){
      if(!this.person){
          this.$store.dispatch('init');
      }
    },
    beforeCreated(){
      if(!this.person){
          this.$store.dispatch('init');
      }
    },
    computed: {
     ...mapState({
        person: state => state.person.person,
        // credentials:state => state.person.person.credentials,
      })
    }
  }
</script>

<style scoped>
.scanner-btn{
  text-align: right;
  background: green;
}
.person-detail{
  padding: 15;
}
ActionBar {
    background-color: #53ba82;
    color: #ffffff;
}

.message {
    vertical-align: center;
    text-align: center;
    font-size: 20;
    color: #333333;
}
.credential{
  height: 60;
}
.org-logo{
  width: 40;
  height: 40;
}
</style>
