import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Image } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function CredentialDetailScreen({route,navigation}) {
  const { itemId } = route.params;
  const { otherParam } = route.params;
  const { name } = route.params;
  const logo = 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg';

  return (
   
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.table}>
          <View style={styles.tableColumn}>
              <Text style={styles.tableCell}>Person ID</Text>
              <Text style={styles.tableCell}>Email</Text>
              <Text style={styles.tableCell}>Mobile</Text>
          </View>
          <View>
              <Text style={styles.tableCell}>P-ABCJSH1</Text>
              <Text style={styles.tableCell}>stevenlam123@yahoo.com.hk</Text>
              <Text style={styles.tableCell}>12345</Text>
          </View>
        </View>
        <Text style={{textAlign:'center',fontStyle:'italic',marginBottom:20}}>Issued By Hong Kong Immigration Department</Text>
        <View style={{ justifyContent: 'center',alignItems: 'center'}}>
          <Image
            source={{ uri: logo }}
            style={{ width: 100, height: 100}}
            containerStyle={{alignItems:'center'}}
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
