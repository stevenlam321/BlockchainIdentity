import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { Button,Input} from 'react-native-elements';
import mainStyle from '../themes/main';
export default function LoginScreen({navigation}) {
  return (
    <ScrollView style={styles.container}>
    <Input
      label="Email"
      placeholder='Enter email'
      keyboardType="email-address"
      inputContainerStyle={mainStyle.inputContainer}
    />
      <Input
        label="Password"
        placeholder='Enter password'
        secureTextEntry={true}
        inputContainerStyle={mainStyle.inputContainer}
    />
    <Button
      title="Register"
      containerStyle={mainStyle.buttonContainerStyle}
    />
    <Button
      title="Login"
      onPress={()=>navigation.navigate('Login')}
      buttonStyle={mainStyle.linkButtonStyle}
    />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  }
});
