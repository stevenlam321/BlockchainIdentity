import * as React from 'react';
import { Text ,View} from 'react-native';
import { Ionicons } from '@expo/vector-icons/';
import CredentialCardAttribute from './CredentialCardAttribute';

export default function BasicCredentialCard({credential}) {
    console.log(credential);
    var iconName = 'md-checkmark-circle';
    var color = 'green';
    return (
    <View style={{borderColor:color,borderWidth:1,margin:10,padding:10}}>
        <Text style={{textAlign:'center',fontSize:16,fontWeight:'bold',marginBottom:10}}>Basic Identity</Text>
        {credential.email && <CredentialCardAttribute attribute={{"name":"Email",exists:true}}/>}

        {credential.mobile && <CredentialCardAttribute attribute={{"name":"Mobile",exists:true}}/>}
    </View>
    )
}
