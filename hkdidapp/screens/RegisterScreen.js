import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import {useEffect} from 'react';
import { StyleSheet, Text,Alert, View } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { Button,Input} from 'react-native-elements';
import mainStyle from '../themes/main';
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required(),
  password_confirmation: yup.string().required().oneOf([yup.ref('password'), null], 'Passwords do not match')
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
    register({ name: "password_confirmation"});
  }, [register]);

  return (
    <ScrollView style={styles.container}>
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

    <Input
        label="Confirm Password"
        placeholder='Enter password'
        secureTextEntry={true}
        errorMessage={errors.password_confirmation?.message}
        onChangeText={text => setValue("password_confirmation", text, true)}
    />

    <Button
      title="Register"
      onPress={handleSubmit(onSubmit)}
      containerStyle={mainStyle.buttonContainerStyle} 
      disabled={!formState.isValid}
    />
    <Text onPress={()=>navigation.navigate('Login')} style={{textAlign:'center',marginTop:20}}>Login</Text>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  }
});
