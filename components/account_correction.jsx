// Account.js

import * as ImagePicker from "expo-image-picker";
import * as SecureStore from "expo-secure-store";

import { Avatar, Button, Icon } from "react-native-elements";

import {
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    ScrollView,
    RefreshControl,
    ActivityIndicator
} from "react-native";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { editAvatar, resetUser } from "./../store/actions";
import { DEFAULT_AVATAR_IMAGE } from "@env";
import { HOST_IP } from "@env";


const Account = (props) => {
    const dispatch = useDispatch();
    const [image, setImage] = useState(null);
    const user = useSelector(({ userReducer }) => userReducer.user);
    const [refreshing, setRefreshing] = useState(false);

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
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1 // 0 à 1
        });

        let uriParts = result.uri.split(".");
        let fileType = uriParts[uriParts.length - 1]; //jpg

        let imageName = user.username.replace(/\./g, "").split("@")[0]; //toto sur toto@gmail.com
        let formData = new FormData();
        formData.append("image", {
            uri: result.uri,
            name: `${imageName}.${fileType}`,
            type: `image/${fileType}`
        })
        dispatch(editAvatar(formData));
        if (!result.cancelled) {
            setImage(result.uri);
        }

    }
    return (

        <SafeAreaView style={styles.center}>
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }

            >
                <>
                    <View style={styles.disconnectView}>
                        <Button
                            onPress={handleDisconnect}
                            type="clear"
                            icon={
                                <Icon
                                    type="feather"
                                    style={{ marginRight: 10 }}
                                    name="power"
                                    size={30}
                                    color="black"
                                />
                            }
                            title=""
                        />
                    </View>
                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                        {image ? (
                            <>
                                <ActivityIndicator color="#e9520e" style={{ transform: [{ scale: 5.2 }], position: "absolute" }} />
                                <Avatar
                                    onPress={pickImage}
                                    style={styles.avatar}
                                    source={{
                                        uri: image,
                                        cache: "reload"
                                    }}
                                />
                            </>
                        ) : (
                            <Avatar
                                onPress={pickImage}
                                style={styles.avatar}
                                rounded
                                source={{
                                    uri: user.avatar
                                        ? `${HOST_IP}/uploads/${user.avatar}?${new Date()}`
                                        : DEFAULT_AVATAR_IMAGE,
                                    cache: "reload",
                                }} />
                        )}
                    </View>

                    <View>
                        <Text>{user.username}</Text>
                    </View>
                </>
            </ScrollView>
        </SafeAreaView>
    )


}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: "flex-start",
        padding: 20,
        alignItems: "center",
        textAlign: "center",
    },
    disconnectView: {
        alignSelf: "flex-end",
        marginBottom: 20,
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 150,
        overflow: "hidden",
        elevation: 10,
    },
});
export default Account;