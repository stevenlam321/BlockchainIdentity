import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View,FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, ThemeProvider,CheckBox,ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const list = [
  {
    id:1,
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    id:2,
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
]

const renderItem = (item,navigation) => (
  <ListItem
  // key={item.id}
    title={item.name}
    leftAvatar={{ source: { uri: item.avatar_url } }}
    bottomDivider
    chevron
    onPress={()=> navigation.navigate('CredentialDetail',{
      name: item.name
    })}
  />
)
export default function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
       <FlatList
        data={list}
        renderItem={({ item }) => renderItem(item,navigation)}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
