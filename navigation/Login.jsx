import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, StyleSheet, Image, Keyboard } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';

import validator from 'validator';

export default function Login({ route, navigation }) {


    const [login, setLogin] = useState({
        email: ""
        , password: ""
        , hidePassword: true
        , showImage: true
    });
    const [errors, setErrors] = useState({
        email: null
        , password: null
    });

    // useEffect(() => {
    //     Keyboard.addListener('keyboardDidShow', setLogin((login) => ({ ...login, showImage: !login.showImage })));
    //     Keyboard.addListener('keyboardDidHide', setLogin((login) => ({ ...login, showImage: !login.showImage })));


    //     console.log(login.showImage)

    //     return () => {
    //         Keyboard.removeListener('keyboardDidShow', setLogin((login) => ({ ...login, showImage: !login.showImage })));
    //         Keyboard.removeListener('keyboardDidHide', setLogin((login) => ({ ...login, showImage: !login.showImage })));
    //     }

    // }, [])

    const onClick = () => {

        setErrors({ ...errors, email: null, password: null });

        // v Appel de la fonction pour renvoyer les infos au back
    }

    const onChange = (value, type) => {
        //réinitialisation des messages d'erreur
        setErrors({ ...errors, email: null, password: null });

        //gestion des mails
        if (type === "email") {
            setLogin((login) => ({ ...login, email: value }))

            // console.log(login);
            if (!validator.isEmail(value) /* || validator.isEmpty(login.email) */) {
                setErrors((errors) => ({ ...errors, email: "Veuillez saisir un email valide" }))
            }

        }

        //gestion des mots de passe
        if (type === "password") {
            setLogin({ ...login, password: value })
            if (!validator.isLength(value, { min: 6 })) {
                setErrors({ ...errors, password: "Minimun 6 caractères !" })
            }
        }
    }


    // Activation du bouton que si il n'y a pas d'erreur
    const disabledButton = () => {
        let disabled = true
        if (!errors.email && !errors.password && !validator.isEmpty(login.email) && !validator.isEmpty(login.password)) {
            disabled = false
        }
        return disabled
    }



    const toRegister = () => {
        navigation.navigate("Enregistrement")
    }
    const hidePassword = () => {
        setLogin((login) => ({ ...login, hidePassword: !login.hidePassword }))
    }

    return (
        <SafeAreaView style={styles.main_container}>
            {login.showImage &&
                <Image
                    source={require('../assets/Icon3.png')}
                    style={styles.image}
                />
            }


            <Text style={styles.title}>Connectez vous</Text>

            <Input
                placeholder="Adresse email"
                leftIcon={{ type: 'ionicon', name: 'mail-outline' }}
                textContentType="emailAddress"
                onChangeText={value => onChange(value, "email")}
                spellCheck={false}
                autoCorrect={false}
                keyboardType="email-address"
                errorMessage={errors.email}
            />
            <Input
                placeholder="Mot de passe"
                leftIcon={{ type: 'ionicon', name: 'lock-closed-outline' }}
                secureTextEntry={login.hidePassword}
                textContentType="password"
                rightIcon={
                    <Icon
                        type='ionicon'
                        name={login.hidePassword ? 'eye-outline' : 'eye-off-outline'}
                        onPress={hidePassword}
                    />
                }
                onChangeText={value => onChange(value, "password")}
                errorMessage={errors.password}
            />

            <Button
                title="Connexion"
                onPress={onClick}
                disabled={disabledButton()}
                buttonStyle={styles.button}
            />
            <Button
                title="S'inscrire"
                type="clear"
                onPress={toRegister}
            />


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
        , padding: 10
        // , alignItems: "center"
        , justifyContent: "center"
    },
    image: {
        width: 200
        , height: 200
        , alignSelf: "center"
        , position: "absolute"
        , top: 40
    },
    title: {
        alignSelf: "center"
        , fontSize: 20
        , textTransform: "uppercase"
        , marginBottom: 20
    },
    button: {
        marginVertical: 20
        , paddingVertical: 10
    }


})