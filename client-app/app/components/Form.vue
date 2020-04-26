<template>
  <Page>
    <ActionBar title="Application Scanner"></ActionBar>

    <GridLayout columns="*" rows="auto, auto, auto, auto">
      <BarcodeScanner
          row="1"
          height="300"
          formats="QR_CODE, EAN_13, UPC_A"
          beepOnScan="true"
          reportDuplicates="true"
          preferFrontCamera="false"
          @scanResult="onScanResult"
          v-if="isIOS">
      </BarcodeScanner>

     </GridLayout>
  </Page>
</template>

<script>
  import {isIOS} from "tns-core-modules/platform";
  import {BarcodeScanner} from "nativescript-barcodescanner";
import axios from 'axios';
import Test from './Test';
  export default {
    data() {
      return {
        isIOS
      }
    },
    methods: {
      onScanResult(evt) {
         this.$navigateTo(Test);
        //  var qr_data = JSON.parse(evt.text);
        // const API_PATH = 'http://192.168.1.183:8080/';
        // var data = {
        //   app_id: qr_data.app_id,
        //   person_id:"P-hbj3rx00c7",
        //   credentials:qr_data.credentials
        // };
        //    axios.post(API_PATH+'applications/request_info',data).then((res)=>{
        //        console.log(res.data);
        //     }).catch((err)=>{
        //         console.log(err);
        //     }); 
       
      },
  
    }
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
</style>
