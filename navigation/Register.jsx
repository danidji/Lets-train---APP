import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, StyleSheet, Image, Keyboard } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';

import validator from 'validator';

export default function Register({ route, navigation }) {

    const [register, setRegister] = useState({
        email: ""
        , password: ""
        , verifPass: ""
        , hidePassword: true
        , keyboardShow: false
    })

    const [errors, setErrors] = useState({
        email: ""
        , password: ""
        , verifPass: ""
    });


    const onClick = () => {


        console.log(register)
        // v Appel de la fonction pour renvoyer les infos au back

    }

    const onChange = (value, type) => {
        //réinitialisation des messages d'erreur
        setErrors({ ...errors, email: "", password: "", verifPass: "" });

        //gestion des mails
        if (type === "email") {
            setRegister((register) => ({ ...register, email: value }))

            // console.log(register);
            if (!validator.isEmail(value)) {
                setErrors({ ...errors, email: "Veuillez saisir un email valide" })
            } else {
                setErrors({ ...errors, email: "" })
            }

        }

        //gestion des mots de passe
        if (type === "password") {
            setRegister((register) => ({ ...register, password: value }))
            if (!validator.isStrongPassword(value, { minLength: 6, minSymbols: 0 })) {
                setErrors({ ...errors, password: "Saisir un mot de passe avec : 6 caractères min, au moins 1 majuscule et un 1 chiffre" })
                if (register.verifPass && value !== register.verifPass) {
                    setErrors({ ...errors, password: "Les mots de passe doivent être identique" })
                }
            } else {
                setErrors({ ...errors, password: "" })
            }
        }

        //Gestion de la vérification de mot de passe 
        if (type === "verifPass") {
            setRegister((register) => ({ ...register, verifPass: value }))
            if (register.password !== value) {
                setErrors({ ...errors, verifPass: "Les mots de passe doivent être identique" })
            } else {
                setErrors({ ...errors, verifPass: "" })
            }
        }
    }

    // Activation du bouton que si il n'y a pas d'erreur
    const disabledButton = () => {
        let disabled = true
        if (!errors.email && !errors.password && !errors.verifPass && !validator.isEmpty(register.email) && !validator.isEmpty(register.password) && !validator.isEmpty(register.verifPass)) {
            disabled = false
        }
        return disabled
    }

    const toRegister = () => {
        navigation.navigate("Connexion")
    }

    const hidePassword = () => {
        setRegister((register) => ({ ...register, hidePassword: !register.hidePassword }))
    }


    const keyboardState = (etat) => {
        if (etat === "show") {
            setRegister({ ...register, keyboardShow: true })
        }
        if (etat === "hide") {
            setRegister({ ...register, keyboardShow: false })
        }
    }


    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', () => keyboardState('show'));
        Keyboard.addListener('keyboardDidHide', () => keyboardState('hide'));



        return () => {
            Keyboard.removeListener('keyboardDidShow', () => keyboardState('show'));
            Keyboard.removeListener('keyboardDidHide', () => keyboardState('hide'));
        }

    }, [])


    return (
        <SafeAreaView style={styles.main_container}>

            {!register.keyboardShow &&
                <Image
                    source={require('../assets/Icon3.png')}
                    style={styles.image}
                />
            }

            <Text style={styles.title}>inscrivez vous</Text>

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
                secureTextEntry={register.hidePassword}
                textContentType="password"
                rightIcon={
                    <Icon
                        type='ionicon'
                        name={register.hidePassword ? 'eye-outline' : 'eye-off-outline'}
                        onPress={hidePassword}
                    />
                }
                onChangeText={value => onChange(value, "password")}
                errorMessage={errors.password}
            />
            <Input
                placeholder="Vérifier le mot de passe"
                leftIcon={{ type: 'ionicon', name: 'lock-closed-outline' }}
                secureTextEntry={register.hidePassword}
                textContentType="password"
                rightIcon={
                    <Icon
                        type='ionicon'
                        name={register.hidePassword ? 'eye-outline' : 'eye-off-outline'}
                        onPress={hidePassword}
                    />
                }
                onChangeText={value => onChange(value, "verifPass")}
                errorMessage={errors.verifPass}
            />

            <Button
                title="Inscription"
                disabled={disabledButton()}
                onPress={onClick}
                buttonStyle={styles.button}
            />
            <Button
                title="Se connecter"
                type="clear"
                onPress={toRegister}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
        , padding: 20
        // , alignItems: "center"
        , justifyContent: "center"
    },
    image: {
        width: 200
        , height: 200
        , alignSelf: "center"
        // , position: "absolute"
        // , top: 15
    },
    title: {
        alignSelf: "center"
        , fontSize: 20
        , textTransform: "uppercase"
        , marginVertical: 20

    },
    button: {
        marginVertical: 20
        , paddingVertical: 10
    }


})