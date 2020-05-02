import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {ScrollView } from 'react-native-gesture-handler';
import { Button} from 'react-native-elements';


export default function SettingScreen() {
  return (
    <View style={styles.container}>
        <Text>Person ID: P-ABCJSH</Text>
        <Text>Email: stevenlam123@yahoo.com.hk</Text>
        <Text>Mobile: 12345</Text>
        <Button title="Logout"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  }
});
