import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {ScrollView } from 'react-native-gesture-handler';
import { Button} from 'react-native-elements';


export default function SettingScreen({navigation}) {
  const logout = () => {
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
            <Text style={styles.tableCell}>P-ABCJSH1</Text>
            <Text style={styles.tableCell}>stevenlam123@yahoo.com.hk</Text>
            <Text style={styles.tableCell}>12345</Text>
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
