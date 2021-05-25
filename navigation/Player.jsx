import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Text, SafeAreaView, Button, Alert, View, StyleSheet } from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";
import { Icon } from 'react-native-elements';

//Import redux
import { connect, useDispatch, useSelector } from "react-redux"
import { getNextItem } from '../store/actions';

//init variable de connection redux
const mapStateToProps = (state) => {
    return state;
}

function format(time) {
    let mins = ~~(time / 60);
    let secs = ~~(time - mins * 60);

    let ret = "";

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
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


    //Hooks init 
    const [duration, setDuration] = useState(format(myItem.duration_indicator));
    const [playing, setPlaying] = useState(false);


    // Exposition des actions dans le dispatch
    useEffect(() => {
        dispatch(getNextItem(myItem.program, myItem.order + 1)).then((result) => {
        })
    }, [dispatch])


    //Fonction de gestion du timer
    const handleInterval = () => {
        // clear de l'interval initial si présent
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {


            // Si playerRef existe on appelle sa méthode getCurrentTime
            playerRef.current?.getCurrentTime().then((currentTime) => {
                playerRef.current?.getDuration().then((duration) => {

                    // setDuration(Math.round((duration - currentTime) / 60))
                    setDuration(parseInt(duration - currentTime))
                })
            })

        }, 1000)
    }


    // Gestion des changements d'états
    const onStateChange = (state) => {
        // console.log(`onStateChange -> state`, state)

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
        <SafeAreaView style={styles.main_container}>
            <View style={styles.header}>
                <Icon
                    name='logo-youtube'
                    type='ionicon'
                />

                <Text style={styles.title}>{myItem.title}</Text>
            </View>
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
                    disabled={nextProgram ? false : true}
                    iconStyle={styles.video_button}
                />

            </View>
            <View style={styles.duration}>


                <Text style={styles.text_duration}> Temps restant <Text style={duration <= 180 ? { ...styles.time, color: 'red' } : styles.time}>{format(duration)}</Text> min</Text>
            </View>

        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
    },
    player_button: {
        flexDirection: "row"
        , justifyContent: "center"
        , alignItems: "center"
    },
    header: {
        flexDirection: 'row'
        , justifyContent: 'center'
        , alignItems: 'center'
        , paddingVertical: 10

    },
    title: {
        fontSize: 20
        , marginLeft: 10
    },
    play_pause: {
        marginHorizontal: 30
        , fontSize: 50
        , color: '#3880FF'
    },
    video_button: {
        fontSize: 35
    },
    duration: {
        alignSelf: "center",
        position: "absolute"
        , bottom: 10
    },
    text_duration: {
        fontSize: 25
    },
    time: {
        fontWeight: "bold"
        , fontSize: 30
    }


})

export default connect(mapStateToProps)(Player);