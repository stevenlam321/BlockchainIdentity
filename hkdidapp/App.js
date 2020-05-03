import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
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
import { ThemeProvider, Button } from 'react-native-elements';
import {login} from './redux/actions';
import MainService from './services/MainService';
import Spinner from 'react-native-loading-spinner-overlay';
const Stack = createStackNavigator();
// Stack.Navigator.headerBackTitleVisible = false;
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

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();

  MainService.load(()=> setLoading(false) );

  //console.log(login('abc@abc.com','1234'));

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
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <ErrorBoundary>
        <ThemeProvider theme={theme}>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <Spinner
            visible={loading}
            textContent={'Loading...'}
            textStyle={{color:'#fff'}}
          />
            <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
              <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Root" component={BottomTabNavigator}/>
                <Stack.Screen name="Login" component={LoginScreen}/>
                <Stack.Screen name="Register" component={RegisterScreen}/>
                <Stack.Screen name="CredentialDetail" component={CredentialDetailScreen}  options={({ route }) => ({ title: route.params.name,headerBackTitle:null })}/>
              </Stack.Navigator>
            </NavigationContainer>
          </View>
        </ThemeProvider>
      </ErrorBoundary>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
