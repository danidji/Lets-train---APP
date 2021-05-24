import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Text, SafeAreaView, Button, Alert, View, StyleSheet } from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";
import { Icon } from 'react-native-elements';

export default function Player({ route }) {
    //récupération des données de la vidéo en question
    let myItem = route.params.item;

    const playerRef = useRef();
    // console.log(`Player -> playerRef`, playerRef)

    // console.log(`useRef`, playerRef)
    const [duration, setDuration] = useState(0);

    const [playing, setPlaying] = useState(false);

    //TODO v--Utiliser cette methode pour gérer l'affichage du temps - lecture video ... 
    const onStateChange = useCallback((state) => {
        // console.log(`onStateChange -> state`, state)
        if (state === "ended") {
            setPlaying(false);
            Alert.alert("video has finished playing!");
        }
    }, []);

    const togglePlaying = useCallback(() => {
        setPlaying((prev) => !prev);
    }, []);

    const restartPlaying = () => {
        playerRef.current.seekTo(0, true);
    }

    // useEffect(() => {

    //     const interval = setInterval(() => {

    //         playerRef.current.getCurrentTime().then((data) => {
    //             console.log(Math.round(data / 60))
    //         })
    //         // setDuration(playerRef.current.getCurrentTime().then((data) => console.log(Math.round(data / 60))))
    //     }, 1000);
    //     return () => {
    //         clearInterval(interval)
    //     }
    // }, [])

    return (
        <SafeAreaView>
            <Text style={styles.title}>
                <Icon
                    name='logo-youtube'
                    type='ionicon'
                />

                {myItem.title}
            </Text>
            <YoutubePlayer
                height={300}
                play={playing}
                videoId={myItem.video_url}
                onChangeState={onStateChange}
                ref={playerRef}
            />
            <View style={styles.player_button}>
                <Icon
                    name='reload-outline'
                    type='ionicon'
                    onPress={restartPlaying}
                    iconStyle={styles.video_button}

                />
                {playing
                    ? (<Icon

                        name='pause-circle'
                        type='ionicon'
                        onPress={togglePlaying}
                        size={40}
                        iconStyle={styles.play_pause}

                    />)
                    : (<Icon
                        name='play'
                        type='ionicon'
                        onPress={togglePlaying}
                        size={40}
                        iconStyle={styles.play_pause}
                    />)

                }
                <Icon
                    name='play-skip-forward-outline'
                    type='ionicon'
                    // onPress={test}
                    iconStyle={styles.video_button}
                />

            </View>
            <Text>{/* duration */}m</Text>

        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    player_button: {
        flexDirection: "row"
        , justifyContent: "center"
    },
    title: {
        fontSize: 20
        , alignSelf: "center"
    },
    play_pause: {
        marginHorizontal: 20
        , color: '#3880FF'
    },
    video_button: {
        color: '#3880FF'
    },
    duration: {
        alignSelf: "flex-end"
    }


})