import React from 'react';
import { Text, SafeAreaView } from 'react-native';
//                                    v possibilité de récupéré le contenue du props de cette manière
export default function Historic({ route, navigation }) {
    const { name } = route;

    return (
        <SafeAreaView>
            <Text>{name}</Text>
        </SafeAreaView>
    )
}