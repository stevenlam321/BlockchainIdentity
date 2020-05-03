import * as React from 'react';
import { Text ,View} from 'react-native';
import { Ionicons } from '@expo/vector-icons/';
import CredentialCardAttribute from './CredentialCardAttribute';

export default function CredentialCard({credential}) {
    var iconName = credential.exist ? 'md-checkmark-circle': 'md-close-circle';
    var color = credential.exist ? 'green':'red';
    return (
    <View style={{borderColor:color,borderWidth:1,margin:10,padding:10}}>
        <Text style={{textAlign:'center',fontSize:16,fontWeight:'bold',marginBottom:10}}>{credential.name}</Text>
        {credential.attributes.map((attribute)=><CredentialCardAttribute attribute={attribute}/>)}
    </View>
    )
}
