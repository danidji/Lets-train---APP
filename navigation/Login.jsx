import React, { useState } from 'react';
import { Text, SafeAreaView, StyleSheet } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';

import validator from 'validator';

export default function Login({ route, navigation }) {


    const [login, setLogin] = useState({
        email: ""
        , password: ""
        , hidePassword: true
    });
    const [errors, setErrors] = useState({
        email: null
        , password: null
    });


    const onClick = () => {

        setErrors({ ...errors, email: null, password: null, getErrors: false });
        // setLogin({ ...login, disabledButton: false })

        // if (validator.isEmpty(login.email)) {
        //     setErrors((errors) => ({ ...errors, email: "Veuillez saisir un email", getErrors: true }))
        //     setLogin({ ...login, disabledButton: true })
        // }

        // if (validator.isEmpty(login.password)) {
        //     setErrors((errors) => ({ ...errors, password: "Mot de passe obligatoire", getErrors: true }))
        //     setLogin({ ...login, disabledButton: true })
        // }

        // console.log(`Login -> errors`, errors)
        // v Appel de la fonction pour renvoyer les infos au back
    }
    const onChange = (value, type) => {
        setErrors({ ...errors, email: null, password: null });
        if (type === "email") {
            setLogin((login) => ({ ...login, email: value }))

            // console.log(login);
            if (!validator.isEmail(login.email) || validator.isEmpty(login.email)) {
                setErrors((errors) => ({ ...errors, email: "Veuillez saisir un email valide" }))
            }

        }

        console.log(errors)
        if (type === "password") {
            setLogin({ ...login, password: value })

        }
    }

    const disabledButton = () => {
        let disabled = false
        if (!errors.email && !errors.password) {
            disabled = true
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
            <Text>Se connecter</Text>

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
                disabled={disabledButton}
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
        flex: 1 // prends la largeur total de la colonne => flexDirection par défaut en colonne
        , padding: 10
        // , alignItems: "center"
        , justifyContent: "center"
    }
})