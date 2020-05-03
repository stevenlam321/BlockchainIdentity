import * as React from 'react';
import { Text ,View} from 'react-native';
import { Ionicons } from '@expo/vector-icons/';
export default function CredentialCardAttribute({attribute}) {
    var iconName = attribute.exist ? 'md-checkmark-circle': 'md-close-circle';
    var iconColor = attribute.exist ? 'green':'red';
    return (
        <View style={{flexDirection:'row',alignItems:'center'}}>
            <Text style={{flex:1}}>{attribute.name}</Text>
            <View><Ionicons name={iconName} size={32} color={iconColor} /></View>
        </View>
    )
}
