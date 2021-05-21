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
        <SafeAreaView>

            <FlatList
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={subPrograms}
                keyExtractor={(item) => item._id.toString()}
                renderItem={({ item, index }) => (
                    <>
                        <Text>{item.title}</Text>
                    </>
                )}
            />




        </SafeAreaView>
    )
}


export default connect(mapStateToProps)(Program);