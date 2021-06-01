import React, { useState, useEffect, useCallback } from 'react';
import { Text, SafeAreaView, StyleSheet, View, Image, Platform, ScrollView, RefreshControl } from 'react-native';
import { Icon, Avatar } from 'react-native-elements';

import * as ImagePicker from 'expo-image-picker';
import { useSelector, useDispatch } from 'react-redux';
import { userLogout, editAvatar } from "./../store/actions";



export default function Account(props) {


    const [image, setImage] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const user = useSelector(({ userReducer }) => userReducer.user);

    const dispatch = useDispatch();

    const logout = () => {
        dispatch(userLogout())
    }
    // Gestion de rafraichissement de la screen
    const wait = (timeout) => {
        return new Promise((resolve) => setTimeout(resolve, timeout));
    }
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(1000).then(() => {
            setRefreshing(false);
            dispatch(getUser());
        })
    });

    //Gestion de l'image Avatar
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        //Récupération de l'extension du fichier 
        let uriParts = result.uri.split(".");
        let fileType = uriParts[uriParts.length - 1];

        let imageName = user.username.replace(/\./g, "").split("@")[0]; //toto sur toto@gmail.com

        let formData = new FormData();
        formData.append("image", {
            uri: result.uri,
            name: `${imageName}.${fileType}`,
            type: `image/${fileType}`
        })
        // console.log(result);

        dispatch(editAvatar(formData));
        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    return (
        <SafeAreaView style={styles.main_container}>
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <>
                    <Icon
                        name='power'
                        type='ionicon'
                        onPress={logout}
                        iconStyle={styles.button_logout}

                    />

                    <View style={styles.image_container}>
                        {image ? (
                            <Avatar
                                source={{
                                    uri: image,
                                    cache: "reload"
                                }}
                                avatarStyle={!image && styles.avatar_image}
                                size={175}
                                rounded
                            ><Avatar.Accessory
                                    style={{
                                        width: 40
                                        , height: 40
                                        , borderRadius: 40
                                    }}
                                    iconStyle={{ fontSize: 30 }}
                                    onPress={pickImage}
                                /></Avatar>
                        ) : (
                            <Avatar
                                source={{
                                    uri: user.avatar
                                        ? `${HOST_IP}/uploads/${user.avatar}?${new Date()}`
                                        : require('../assets/funny_user_avatar.png')
                                }}
                                avatarStyle={!image && styles.avatar_image}
                                size={175}
                                rounded
                            ><Avatar.Accessory
                                    style={{
                                        width: 40
                                        , height: 40
                                        , borderRadius: 40
                                    }}
                                    iconStyle={{ fontSize: 30 }}
                                    onPress={pickImage}
                                /></Avatar>
                        )}

                    </View>


                    <Text style={styles.username}>{user.email}</Text>
                </>
            </ScrollView>
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
        width: 175
        , height: 175
        , alignSelf: "center"
    },
    image_container: {
        borderRadius: 100
        , borderColor: "#d9d9d9"
        , borderStyle: "solid"
        , backgroundColor: "#d9d9d9"
        , borderWidth: 5
        , width: 175
        , height: 175
        , justifyContent: "center"
        , alignItems: "center"
        , alignSelf: "center"
        , elevation: 5



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
