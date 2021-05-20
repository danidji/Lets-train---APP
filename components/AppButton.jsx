import React from 'react';
import { Text, Image, View, TouchableOpacity, StyleSheet } from 'react-native';


TouchableOpacity.defaultProps = { activeOpacity: 0.4 } // On définit l'opacité appliqué au clic/press



export default function AppButton({ onPress, title, image, color, textPosition }) {

    return (
        <TouchableOpacity // doc : https://reactnative.dev/docs/touchableopacity
            onPress={onPress}
            style={{ ...styles.appButtonContainer, backgroundColor: color }}
        >
            <Image style={styles.image} //doc :https://reactnative.dev/docs/image
                source={{
                    uri: image
                }}

            />

            <Text
                style={[
                    styles.appButtonText,
                    textPosition === "right" ? styles.textRight : styles.textLeft

                ]}
            >{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    appButtonContainer: {
        height: 150
        , marginHorizontal: 10
        , borderRadius: 5
    },
    image: {
        flex: 1,
        width: null, // par défaut 
        height: null, //par défaul
        resizeMode: "cover"
    },
    appButtonText: {
        fontSize: 25, // par défaut à 14
        color: "#fff",
        fontWeight: "200",
        textTransform: "uppercase",
        position: "absolute"


    },
    textRight: {
        alignSelf: 'flex-end'
        , right: 10
    },
    textLeft: {
        alignSelf: 'flex-start'
        , left: 10
    }
})