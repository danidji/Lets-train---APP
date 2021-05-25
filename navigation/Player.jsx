import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Text, SafeAreaView, Button, Alert, View, StyleSheet } from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";
import { Icon } from 'react-native-elements';

//Import redux
import { connect, useDispatch, useSelector } from "react-redux"
import { getSubPrograms, getNextItem } from '../store/actions';

//init variable de connection redux
const mapStateToProps = (state) => {
    return state;
}



function Player({ route, navigation }) {
    //récupération des données de la vidéo en question
    let myItem = route.params.item;
    // console.log(`Player ->myItem`, myItem)

    const playerRef = useRef();
    // on expose notre interval à l'ensemble de notre composant
    const intervalRef = useRef(null)
    const dispatch = useDispatch();

    const nextProgram = useSelector(
        ({ subprogramsReducer }) => subprogramsReducer.nextProgram
    );

    const subPrograms = useSelector(
        ({ subprogramsReducer }) => subprogramsReducer.subPrograms
    );

    //Hooks init 
    const [duration, setDuration] = useState(myItem.duration_indicator / 60);
    const [playing, setPlaying] = useState(false);


    // Exposition des actions dans le dispatch
    useEffect(() => {
        dispatch(getNextItem(myItem.program, myItem.order + 1)).then((result) => {
        })
    }, [dispatch])

    useEffect(() => {
        dispatch(getSubPrograms(myItem.program)).then(() => {

        });
    }, [dispatch])

    //Fonction de gestion du timer
    const handleInterval = () => {
        // clear de l'interval initial si présent
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            // Si playerRef existe on appelle sa méthode getCurrentTime
            playerRef.current?.getCurrentTime().then((currentTime) => {
                playerRef.current?.getDuration().then((duration) => {

                    setDuration(Math.round((duration - currentTime) / 60))
                })
            })

        }, 1000)
    }


    // Gestion des changements d'états
    const onStateChange = (state) => {

        // Quand la vidéo est lancé
        if (state === 'playing') {
            setPlaying(true);
            // je déclenche mon interval
            handleInterval();

        }
        if (state === 'paused') {
            setPlaying(false);
            // stop de l'interval
            clearInterval(intervalRef.current)
        }

        if (state === "ended") {
            setPlaying(false);
            clearInterval(intervalRef.current)
        }

    };


    const togglePlaying = useCallback(() => {
        setPlaying((prev) => !prev);
    }, []);

    const restartPlaying = () => {
        playerRef.current.seekTo(0, true);
    }

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
                    onPress={() => {
                        navigation.replace('Player', {
                            item: nextProgram
                        })
                    }}
                    disabled={myItem.order === subPrograms.length ? true : false}
                    iconStyle={styles.video_button}
                />

            </View>
            <Text>Temps restant {duration} min</Text>

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

export default connect(mapStateToProps)(Player);