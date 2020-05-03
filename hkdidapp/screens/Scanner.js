import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import {useState,useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {ScrollView } from 'react-native-gesture-handler';
import { Button} from 'react-native-elements';
import Modal from 'react-native-modal';
import { BarCodeScanner } from 'expo-barcode-scanner';
import layoutConstants from '../constants/Layout';
import CredentialCard from '../components/CredentialCard';

const qrSize = layoutConstants.window.width * 0.7;
const credentials = [
  {
    exist:true,
    name: 'Hong Kong Identity Card',
    attributes:[
      {
          name: "First Name",
          exist:true,
      },
      {
        name: "Last Name",
        exist:false,
      },
      {
        name: "Gender",
        exist:true,
    },
    ]
  },
  {
    exist:false,
    name: 'Hong Kong Identity Card',
    attributes:[
      {
          name: "First Name",
          exist:true,
      },
      {
        name: "Last Name",
        exist:false,
      },
      {
        name: "Gender",
        exist:true,
    },
    ]
  }
];
export default function Scanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned,setScanned] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    console.log(data);
  };

  const approveRequest = () =>{
    console.log('approved');
    fetch('https://jsonplaceholder.typicode.com/todos/')
  .then(response => response.json())
  .then(json => {
    console.log(json);
    setScanned(false);
  
  })
  }

  const cancelScan = () =>{
    console.log('scan scan');
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>  
      <BarCodeScanner
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFill}
      >
      {/* <Text>Scan your QR code</Text>
      <Text>Scan your QR code</Text> */}
      </BarCodeScanner>
        <Modal isVisible={true} style={{backgroundColor:'yellow',marginTop:50,marginBottom:50}}>
          <ScrollView style={{backgroundColor:'#fff',flexDirection:'column'}}>
            <View style={{paddingTop:20}}>
              <Text style={{textAlign:'center',fontSize:25,fontWeight:'bold'}}>Hello world</Text>
              <Text style={{textAlign:'center',fontWeight:'bold',marginBottom:10,marginTop:10}}>Is requesting</Text>
              {credentials.map((credential)=><CredentialCard credential={credential}/>)}
            </View>
            <View style={{flexDirection:'row',alignItems: 'stretch',margin:10}}>
              <Button title="Approve" onPress={()=>approveRequest()} containerStyle={{flex:1}} disabled/>
              <Button title="Cancel" onPress={()=>setScanned(false)} containerStyle={{flex:1}}/>
            </View>
          </ScrollView>
        </Modal>
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />} 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
  }
});
