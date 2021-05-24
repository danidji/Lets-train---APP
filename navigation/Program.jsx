import React, { useState, useEffect } from 'react';
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
    // console.log(`Program -> props`, props)
    const { route, navigation } = props
    // console.log(`Program -> props`, route.params.id)
    // On utilise un état pour faire apparaitre le Loading quand les données ne sont pas chargés
    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useDispatch();
    const subPrograms = useSelector(
        ({ subprogramsReducer }) => subprogramsReducer.subPrograms
    );

    useEffect(() => {
        // Une fois les sous programmes chargé, on passe l'état "isLoading" à faux
        dispatch(getSubPrograms(route.params.id)).then(() => {
            setIsLoading(false);
        });
    }, [dispatch])


    // console.log(`Program -> subPrograms`, subPrograms)

    return (
        <SafeAreaView style={styles.main_container}>
            <Text style={styles.title}>{route.params.title} (niveau{route.params.level})</Text>
            {!isLoading
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
                                        item: item
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