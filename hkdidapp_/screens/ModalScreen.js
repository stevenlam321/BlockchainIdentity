import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import {useState,useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {ScrollView } from 'react-native-gesture-handler';
import { Button} from 'react-native-elements';
import Modal from 'react-native-modal';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function ModalScreen() {
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
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFill}
      />
        <Modal isVisible={scanned} style={{backgroundColor:'yellow',marginTop:50,marginBottom:50}}>
          <ScrollView style={{backgroundColor:'green',flexDirection:'column'}}>
            <View><Text>Hello world</Text><Text>Hello world</Text><Text>Hello world</Text><Text>Hello world</Text><Text>Hello world</Text></View>
            <View style={{flexDirection:'row',alignItems: 'stretch'}}>
              <Button title="Approve" onPress={()=>approveRequest()} containerStyle={{flex:1}}/>
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
    backgroundColor: '#fafafa',
  }
});
