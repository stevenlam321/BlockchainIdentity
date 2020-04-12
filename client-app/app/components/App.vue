<template>
    <Page >
      <ActionBar v-bind:title="tabs[selectedIndex]" />
       <TabView :selectedIndex="selectedIndex" @selectedIndexChange="tabChange">
        <TabViewItem v-bind:title="tabs[0]">
          <ListView for="credential in credentials" @itemTap="onItemTap">
            <v-template>
              <StackLayout orientation="horizontal" class="credential">
                  <Label text="ABC"/>
                  <Label :text="credential.name"/>
              </StackLayout>
            </v-template>
          </ListView>
        </TabViewItem>
        <TabViewItem v-bind:title="tabs[1]">
          <Label text="Content for Tab 2" />
        </TabViewItem>
         <TabViewItem v-bind:title="tabs[2]">
          <Label text="Content for Tab 2" />
        </TabViewItem>
        <TabViewItem v-bind:title="tabs[3]">
           <StackLayout orientation="vertical">
              <GridLayout columns="auto,auto" rows="100,10,10,10">
                <StackLayout colSpan="2" rowSpan="1" row="0" col="0">
                  <Image src="~/assets/images/logo.png" stretch="aspectFit" class="logo m-b-30"/>
                </StackLayout>
                <Label text="Person ID: " row="1" col="0"/>
                <Label text="P-AUSHUSH" row="1" col="1"/>
                <Label text="Email: " row="2" col="0"/>
                <Label text="stevenlam123@yahoo.com.hk" row="2" col="1"/>
                <Label text="Mobile: " row="3" col="0"/>
                <Label text="123456" row="3" col="1"/>
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
import {mapGetters,mapActions} from 'vuex';
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
        ],
        credentials:[
          {
            name:"HKID A1"
          },
          {
            name:"HKID B"
          },
           {
            name:"HKID C"
          },
           {
            name:"HKID D"
          },
           {
            name:"HKID E"
          },
          {
            name:"HKID F"
          }
        ]
      }
    },
    methods:{
      tabChange(e){
        this.selectedIndex = e.value;
      },
      onItemTap(){
        var username = appSettings.getString('username');
      },
      showDetail(){
        this.$navigateTo(Credential);
      },
      logout(){
         this.$store.dispatch('logout');
           this.$navigateTo(Login);
      }
    },
    created(){
       appSettings.setString('username','Steven Lam');
       http.getJSON('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.json())
  .then(json => console.log(json))
    },
    computed: mapGetters(['allTodos'])
  }
</script>

<style scoped>
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
GridLayout{
  background: red;
}
.credential{
  height: 100;
  background: green;
}
</style>
