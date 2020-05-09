import * as React from 'react';
import { Text ,View} from 'react-native';
import { Ionicons } from '@expo/vector-icons/';
import CredentialCardAttribute from './CredentialCardAttribute';

export default function CredentialCard({credential}) {
    var iconName = credential.exists ? 'md-checkmark-circle': 'md-close-circle';
    var color = credential.exists ? 'green':'red';
    return (
    <View style={{borderColor:color,borderWidth:1,margin:10,padding:10}}>
        <Text style={{textAlign:'center',fontSize:16,fontWeight:'bold',marginBottom:10}}>{credential.name}</Text>
        {credential.attributes.map((attribute)=><CredentialCardAttribute attribute={attribute} key={attribute.attribute_id}/>)}
    </View>
    )
}
