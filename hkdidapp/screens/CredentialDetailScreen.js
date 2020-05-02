import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, ThemeProvider,CheckBox,ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function CredentialDetailScreen({route,navigation}) {
  const { itemId } = route.params;
  const { otherParam } = route.params;
  const { name } = route.params;
  

  return (
   
    <View style={styles.container}>
      <ScrollView style={styles.container}>
  <Text>itemId: {itemId}</Text>
  <Text>otherParam: {otherParam}</Text>
  <Text>name: {name}</Text>
      </ScrollView>
    </View>
   
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});
