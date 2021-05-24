import React, { useEffect } from 'react';
import { Text, SafeAreaView, FlatList, View, StyleSheet, ActivityIndicator } from 'react-native';

import PlayerButton from '../components/PlayerButton'

//Import redux
import { connect, useDispatch, useSelector } from "react-redux"
import { getSubPrograms } from '../store/actions';

//init variable de connection redux
const mapStateToProps = (state) => {
    return state;
}





function Program(props) {
    console.log(`Program -> props`, props)
    const { route, navigation } = props
    // console.log(`Program -> props`, route.params.id)

    const dispatch = useDispatch();
    const subPrograms = useSelector(
        ({ subprogramsReducer }) => subprogramsReducer.subPrograms
    );

    useEffect(() => {
        dispatch(getSubPrograms(route.params.id));
    }, [dispatch])


    // console.log(`Program -> subPrograms`, subPrograms)

    return (
        <SafeAreaView style={styles.main_container}>
            <Text style={styles.title}>{route.params.title} (niveau{route.params.level})</Text>
            {subPrograms.length > 0
                ? (<FlatList
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={subPrograms}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={({ item, index }) => (
                        <>
                            <PlayerButton
                                onPress={() => {
                                    navigation.navigate('Player', {
                                        title: item.title
                                        , video: item.video_url
                                        , duration: item.duration_indicator
                                    })
                                }}
                                title={item.title}
                                image={item.poster_image}
                                duration={item.duration_indicator}
                                bgc={index % 2 ? "#F2F2F2" : "#fff"}

                            />
                        </>
                    )}
                />)
                : (<ActivityIndicator style={styles.loader} size="large" color="#00C4C1" />)
            }





        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
        , marginTop: 0
        , padding: 10

        // , marginHorizontal: 10
    },
    loader: {
        flex: 1
    },
    title: {
        fontSize: 30
        , fontWeight: "bold"
        , textAlign: "center"
    }

})

export default connect(mapStateToProps)(Program);