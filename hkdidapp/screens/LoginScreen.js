import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import {useEffect} from 'react';
import { StyleSheet, Text, View,Alert,TextInput,Button as LinkButton } from 'react-native';
import { Button,Input} from 'react-native-elements';
import { useForm, Controller } from "react-hook-form";
import mainStyle from '../themes/main';
import * as yup from "yup";
import {useSelector,useDispatch } from 'react-redux';
import {setLoading} from '../redux/actions';
import MainService from '../services/MainService';

const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required(),
});

export default function LoginScreen({navigation}) {
  const dispatch = useDispatch();

  const { register, setValue, handleSubmit, errors,formState } = useForm({
    validationSchema: schema,
    mode: "onChange",
    defaultValues:{
      email:'stevenlam123@yahoo.com.hk',
      password: '12345678'
    }
  });
  const onSubmit = data => {
      dispatch(setLoading(true));
      MainService.load(()=>{
        console.log('finished');
         dispatch(setLoading(false));
        });
     //Alert.alert("Form Data", JSON.stringify(data))
    };

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
    <Text onPress={()=>navigation.navigate('Register')} style={{textAlign:'center',marginTop:20}}>Register</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff'
  }
});
