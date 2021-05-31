import React from 'react';
import { Text, SafeAreaView, StyleSheet, View } from 'react-native';
import { Image, Icon } from 'react-native-elements';


import { useSelector, useDispatch } from 'react-redux';
import { userLogout } from "./../store/actions";



export default function Account(props) {
    const { route } = props;
    const { name } = route;

    const user = useSelector(({ userReducer }) => userReducer.user);
    console.log(`Account -> user`, user)

    const dispatch = useDispatch();

    const logout = () => {
        dispatch(userLogout())
    }

    return (
        <SafeAreaView style={styles.main_container}>

            <Icon
                name='power'
                type='ionicon'
                onPress={logout}
                iconStyle={styles.button_logout}

            />

            <View style={styles.image_container}>
                <Image
                    source={user.avatar === "" ? require('../assets/funny_user_avatar.png') : require('../assets/Icon3.png')  /* require(`${user.avatar}`) */}
                    style={styles.avatar_image}
                />
            </View>


            <Text style={styles.username}>{user.email}</Text>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    main_container: {
        flex: 1
        , padding: 10
        // , alignItems: "center"
        // , justifyContent: "center"
    },
    avatar_image: {
        // flex: 1,
        resizeMode: "cover"
        , width: null
        , height: null

    },
    image_container: {
        borderRadius: 100
        , borderColor: "#d9d9d9"
        , borderStyle: "solid"
        , borderWidth: 5
        , width: 200
        , height: 200
        , justifyContent: "center"
        , alignItems: "center"
        , alignSelf: "center"
    },
    button_logout: {
        fontSize: 50
        , color: "#ff7c7c"
        , alignSelf: "flex-end"
        , marginTop: 20
        , marginRight: 20

    },
    username: {
        alignSelf: "center"
        , fontSize: 30
        , marginTop: 20

    }


})
