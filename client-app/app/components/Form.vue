<template>
  <Page>
    <ActionBar title="BarcodeScanner demo"></ActionBar>

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

  export default {
    data() {
      return {
        isIOS
      }
    },
    methods: {
      onScanResult(evt) {
        console.log(`onScanResult: ${evt.text} (${evt.format})`);
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
