import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import {useState,useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {ScrollView } from 'react-native-gesture-handler';
import { Button,Image} from 'react-native-elements';
import Modal from 'react-native-modal';
import { BarCodeScanner } from 'expo-barcode-scanner';
import layoutConstants from '../constants/Layout';
import CredentialCard from '../components/CredentialCard';
import {useSelector,useDispatch } from 'react-redux';
import agent from '../services/agent';
import {setLoading} from '../redux/actions';

const qrSize = layoutConstants.window.width * 0.75;

const credentials = [
  {
    exist:true,
    name: 'Hong Kong Identity Card',
    attributes:[
      {
          id: '123',
          name: "First Name",
          exist:true,
      },
      {
        id: '123423',
        name: "Last Name",
        exist:false,
      },
      {
        id: '456',
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
          id: '12334567',
          name: "First Name",
          exist:true,
      },
      {
        id: '12334567123',
        name: "Last Name",
        exist:false,
      },
      {
        id: '12334567123123',
        name: "Gender",
        exist:true,
    },
    ]
  }
];
export default function Scanner() {
  const person = useSelector(state => state.common.person);
  const loading = useSelector(state => state.common.loading);

  const dispatch = useDispatch();
  
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned,setScanned] = useState(false);
  const [requestInfo,setRequestInfo] = useState(null);


  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    const request = JSON.parse(data);
    const app_id = request.app_id;
    const person_id = person.id;
    const credentials_ = request.credentials;
    dispatch(setLoading(true));
   // setRequested(true);
   agent.Application.showApplicationRequest(app_id,person_id,credentials_).then(data=>{
      setRequestInfo(data);
     console.log(data);
   }).catch(error=> {
      console.log(error);
   }).finally(()=>{
      //setRequesting(false);
      dispatch(setLoading(false));
   });

  };

  const approveRequest = () =>{
    
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
        style={[StyleSheet.absoluteFill,{alignItems:'center'}]}
      >
      <Text style={{textAlign:'center',color:'#fff',fontSize:20,marginTop:20}}>Scan QR Code</Text>
      <Image
            source={require('../assets/images/qr.png')}
            style={{ width: qrSize, height: qrSize}}
            containerStyle={{marginTop:'10%',marginBottom:'10%'}}/>

      {!scanned && <Text style={{textAlign:'center',color:'#fff',fontSize:15,marginBottom:20}}>Scanning...</Text>}
      {scanned && !loading && <Button title={'Tap to Scan'} onPress={() => setScanned(false)} />} 
      </BarCodeScanner>
        <Modal isVisible={!!requestInfo} style={{marginTop:50,marginBottom:50}}>
          <ScrollView style={{backgroundColor:'#fff',flexDirection:'column'}}>
              {requestInfo && 
              <>
              <View style={{paddingTop:20}}>
                <Text style={{textAlign:'center',fontSize:25,fontWeight:'bold'}}>{requestInfo.application.name}</Text>
                <Text style={{textAlign:'center',fontWeight:'bold',marginBottom:10,marginTop:10}}>Is requesting</Text>
                {requestInfo.credentials.map((credential,index)=><CredentialCard credential={credential} key={index}/>)}
              </View>
              <View style={{flexDirection:'row',alignItems: 'stretch',margin:10}}>
                <Button title="Approve" onPress={()=>approveRequest()} containerStyle={{flex:1}}
                buttonStyle={{backgroundColor:'green',borderRadius:0}} />
                <Button title="Cancel" onPress={()=>setRequestInfo(null)} containerStyle={{flex:1}}
                buttonStyle={{backgroundColor:'#CA0909',borderRadius:0}}/>
              </View>
              </>
              }
          </ScrollView>
        </Modal>
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
