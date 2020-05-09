import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View ,Text} from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import useLinking from './navigation/useLinking';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import CredentialDetailScreen from './screens/CredentialDetailScreen';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingMask from './components/LoadingMask';

import { ThemeProvider, Button } from 'react-native-elements';
import {setToken,setPerson} from './redux/actions';
import MainService from './services/MainService';
import Spinner from 'react-native-loading-spinner-overlay';
import { Provider,useDispatch,useSelector} from 'react-redux';
import store from './redux/store';
import agent from './services/agent';
import { AsyncStorage,Alert } from 'react-native';
import axios from 'axios';

const Stack = createStackNavigator();

const theme = {
  Button: {
    titleStyle: {
      color: 'white',
    },
  },
  Input:{
    containerStyle:{
      marginBottom:30
    }
  }
};


function App(props) { 
  const dispatch = useDispatch();
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();

  const token = useSelector(state => state.common.token);
  const initialRouteName = token? 'Root' : 'Login';
  const { getInitialState } = useLinking(containerRef);

 // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();

     //set token
    AsyncStorage.getItem('token',(error,token)=>{
      if(token){
          dispatch(setToken(token));
          axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
          agent.Auth.me()
          .then((person)=>{
              dispatch(setPerson(person));
          })
          .catch((error)=>{
            setTimeout(() => {
              Alert.alert(error.message);
            }, 100);
          });
    }
  });
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
        <ThemeProvider theme={theme}>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <LoadingMask/>
            <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
              <Stack.Navigator initialRouteName={initialRouteName}>
                <Stack.Screen name="Root" component={BottomTabNavigator}/>
                <Stack.Screen name="Login" component={LoginScreen}/>
                <Stack.Screen name="Register" component={RegisterScreen}/>
                <Stack.Screen name="CredentialDetail" component={CredentialDetailScreen}  options={({ route }) => ({ title: route.params.name,headerBackTitle:null })}/>
              </Stack.Navigator>
            </NavigationContainer>
          </View>
        </ThemeProvider>
    );
  }
}

export default function AppContainer(){
  return (
    <ErrorBoundary>
       <Provider store={store}>
          <App/>
      </Provider>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
