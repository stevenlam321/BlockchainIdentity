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
import {setLoading,setToken,setPerson} from '../redux/actions';
import MainService from '../services/MainService';
import { AsyncStorage } from 'react-native';
import agent from '../services/agent';

const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required(),
});

export default function LoginScreen({navigation}) {
  const dispatch = useDispatch();
  const token = useSelector(state => state.common.token);
  const { register, setValue, handleSubmit, errors,formState } = useForm({
    validationSchema: schema,
    mode: "onChange",
    defaultValues:{
      email:'user1@hkdid.com',
      password: '12345678'
    }
  });
  const onSubmit = async (data) => {
   const {email,password} = data;
   
   dispatch(setLoading(true));

    agent.Auth.login(email,password)
    .then((data)=>{
        console.log(data);
        AsyncStorage.setItem('token', data.token,(error)=>{
          console.log(error);
        });
        dispatch(setToken(data.token));
        dispatch(setPerson(data.person));
        navigation.reset({
          index: 0,
          routes: [{ name: 'Root' }],
        });
    })
    .catch((error)=>{
      console.log(error);
    //  dispatch(setLoading(false));
      setTimeout(() => {
        Alert.alert(error.message);
      }, 100);
    }).finally(()=>dispatch(setLoading(false)));

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
