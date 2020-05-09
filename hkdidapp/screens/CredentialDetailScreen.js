import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View,Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
// import { Image } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import agent,{imagePath} from '../services/agent';

export default function CredentialDetailScreen({route,navigation}) {
  const { item } = route.params;
  const { name } = route.params;

  const labels = item.attributes.map((attribute)=>attribute.name);
  const values = item.attributes.map((attribute)=>attribute.value);

  return (
   
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.table}>
          <View style={styles.tableColumn}>
              {labels.map(label =><Text style={styles.tableCell}>{label}</Text>)}
          </View>
          <View>
              {values.map(value =><Text style={styles.tableCell}>{value}</Text>)}
          </View>
        </View>
        <Text style={{textAlign:'center',fontStyle:'italic',marginBottom:10}}>Issued By</Text>
        <Text style={{textAlign:'center',marginBottom:20}}>{item.organization_name}</Text>

        <View style={{ justifyContent: 'center',alignItems: 'center'}}>
          <Image
            source={{ uri: imagePath(item.organization_logo) }}
            style={{ width: 100, height: 100,resizeMode: 'contain'}}
          />
        </View>
      </ScrollView>
    </View>
   
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding:10,
  },
  table:{
    flexDirection:'row',
    marginBottom:30
  },
  tableCell:{
    marginBottom:5
  },
  tableColumn:{
    paddingRight:10
  }
});
