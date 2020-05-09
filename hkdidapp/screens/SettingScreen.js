import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {ScrollView } from 'react-native-gesture-handler';
import { Button} from 'react-native-elements';
import { AsyncStorage } from 'react-native';
import {useSelector,useDispatch } from 'react-redux';

export default function SettingScreen({navigation}) {
  const person = useSelector(state => state.common.person);


  const logout = () => {
    AsyncStorage.removeItem('token');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };



  return (
    <View style={styles.container}>
      <View style={styles.table}>
        <View style={styles.tableColumn}>
            <Text style={styles.tableCell}>Person ID</Text>
            <Text style={styles.tableCell}>Email</Text>
            <Text style={styles.tableCell}>Mobile</Text>
        </View>
        <View>
            <Text style={styles.tableCell}>{person.id}</Text>
            <Text style={styles.tableCell}>{person.email}</Text>
            <Text style={styles.tableCell}>{person.mobile}</Text>
        </View>
      </View>
        <Button title="Logout"  onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    padding:10,
  },
  table:{
    flexDirection:'row',
    marginBottom:30
  },
  tableCell:{
    marginBottom:5,
  },
  tableColumn:{
    paddingRight:10
  }
});
