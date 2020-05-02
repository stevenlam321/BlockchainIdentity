import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import {useEffect} from 'react';
import { StyleSheet, Text, View,Alert,TextInput } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { Button,Input} from 'react-native-elements';
import { useForm, Controller } from "react-hook-form";
import mainStyle from '../themes/main';
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required(),
});

export default function LoginScreen({navigation}) {
  const { register, setValue, handleSubmit, errors,formState } = useForm({
    validationSchema: schema,
    mode: "onChange"
  });
  const onSubmit = data => Alert.alert("Form Data", JSON.stringify(data));
  
  useEffect(() => {
    register({ name: "email"});
    register({ name: "password"});
  }, [register]);
  
  return (
    <View style={styles.container}>
      
      
    <Input
      label="Email"
      placeholder='Enter email'
      keyboardType="email-address"
      errorMessage={errors.email?.message}
      onChangeText={text => setValue("email", text, true)}
    />
   
      <Input
        label="Password"
        placeholder='Enter password'
        secureTextEntry={true}
        errorMessage={errors.password?.message}
        onChangeText={text => setValue("password", text, true)}
    />
    <Button
      title="Login"
      onPress={handleSubmit(onSubmit)}
      containerStyle={mainStyle.buttonContainerStyle} 
      disabled={!formState.isValid}
    />
    <Button
      title="Register"
      onPress={()=>navigation.navigate('Register')}
      buttonStyle={mainStyle.linkButtonStyle}
    />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
