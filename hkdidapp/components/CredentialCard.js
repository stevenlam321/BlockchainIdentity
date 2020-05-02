import * as React from 'react';
import { Text } from 'react-native';

export default function CredentialCard({credential}) {
    return <Text>{credential.name}</Text>;
}
