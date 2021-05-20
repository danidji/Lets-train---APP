import React from 'react';
import { Text, SafeAreaView } from 'react-native';

export default function Account(props) {
    const { route } = props;
    const { name } = route;
    return (
        <SafeAreaView>
            <Text>{name}</Text>
        </SafeAreaView>
    )
}