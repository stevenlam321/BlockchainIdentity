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
import {useSelector,useDispatch } from 'react-redux';
import {setLoading} from '../redux/actions';
import agent from '../services/agent';

const schema = yup.object().shape({
  email: yup.string().required().email(),
  mobile: yup.number().required(),
  password: yup.string().required().min(8),
  password_confirmation: yup.string().required().oneOf([yup.ref('password'), null], 'Passwords do not match')
});
export default function RegisterScreen({navigation}) {
  const dispatch = useDispatch();

  const { register, setValue, handleSubmit, errors,formState,reset,watch } = useForm({
    validationSchema: schema,
    mode: "onChange",
  });
  const values = watch();
  const onSubmit = data => {
    
    const {email,mobile,password} = data;
   
    dispatch(setLoading(true));
      agent.Auth.register(email,mobile,password)
      .then((data)=>{
        reset();
        setTimeout(() => {
          Alert.alert("Register success");
        }, 100);
      })
      .catch((error)=>{
        setTimeout(() => {
          Alert.alert(error.response.data.message);
        }, 100);
      }).finally(()=>dispatch(setLoading(false)));
   }
  
  useEffect(() => {
    register({ name: "email"});
    register({ name: "mobile"});
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
      value={values.email}
      onChangeText={text => setValue("email", text, true)}
    />

    <Input
      label="Mobile"
      placeholder='Enter mobile'
      keyboardType="number-pad"
      errorMessage={errors.mobile?.message}
      value={values.mobile}
      onChangeText={text => setValue("mobile", text, true)}
    />
    
    
    <Input
        label="Password"
        placeholder='Enter password'
        secureTextEntry={true}
        errorMessage={errors.password?.message}
        value={values.password}
        onChangeText={text => setValue("password", text, true)}
    />

    <Input
        label="Confirm Password"
        placeholder='Enter password'
        secureTextEntry={true}
        errorMessage={errors.password_confirmation?.message}
        value={values.password_confirmation}
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
