import React, { useEffect } from 'react';
import { Text, SafeAreaView, FlatList, View, StyleSheet, ActivityIndicator } from 'react-native';

//Import redux
import { connect, useDispatch, useSelector } from "react-redux"
import { getSubPrograms } from '../store/actions';

//init variable de connection redux
const mapStateToProps = (state) => {
    return state;
}





function Program(props) {
    const { route } = props
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
            {subPrograms.length > 0
                ? (<FlatList
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={subPrograms}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={({ item, index }) => (
                        <>
                            <Text>{item.title}</Text>
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
        , marginTop: 10
        , padding: 10

        // , marginHorizontal: 10
    },
    loader: {
        flex: 1
    }

})

export default connect(mapStateToProps)(Program);