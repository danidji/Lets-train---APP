import React from 'react';
import { Text, Image, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';



function PlayerButton({ onPress, title, image, duration, bgc }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{ ...styles.program_button, backgroundColor: bgc }}
        >
            <Image
                source={{
                    uri: image
                }}
                style={styles.image}
            />
            <View style={styles.infos}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.duration}>
                    <Icon
                        name='timer-outline'
                        type='ionicon'
                    />
                    <Text>{duration / 60} min</Text>
                </View>
            </View>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    program_button: {

        flex: 1
        , flexDirection: "row"
        , justifyContent: "space-between"
        , padding: 10
    },
    image: {
        width: 100
        , height: 100
        , borderRadius: 10

    },
    infos: {
        justifyContent: "space-between"
    },
    duration: {
        flexDirection: "row"
        , justifyContent: "flex-end"
    },
    title: {
        fontWeight: "bold"
    }


})

export default PlayerButton;