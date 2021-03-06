import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View,FlatList,Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, ThemeProvider,CheckBox,ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import agent,{imagePath} from '../services/agent';
import {useSelector,useDispatch } from 'react-redux';
import {useState,useEffect} from 'react';
import {setPerson} from '../redux/actions';


const renderItem = (item,navigation) => (
  <ListItem
  // key={item.id}
    title={item.name}
    leftAvatar={{ source: { uri: imagePath(item.organization_logo) } }}
    bottomDivider
    chevron
    onPress={()=> navigation.navigate('CredentialDetail',{
      name: item.name,
      item
    })}
  />
)
export default function HomeScreen({navigation}) {
  const dispatch = useDispatch();
  const [refreshing,setRefreshing] = useState(false);

  const person = useSelector(state => state.common.person);

  const refresh = ()=>{
    setRefreshing(true);

    agent.Auth.me()
    .then((person)=>{
        dispatch(setPerson(person));
    })
    .catch((error)=>{
      setTimeout(() => {
        Alert.alert(error.message);
      }, 100);
    }).finally(x=>setRefreshing(false));
   
  }

  return (
    <View style={styles.container}>
       {person && 
       <FlatList
        data={person.credentials}
        renderItem={({ item }) => renderItem(item,navigation)}
        keyExtractor={item => item.credential_id}
        refreshing={refreshing}
        onRefresh={refresh}
      />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
