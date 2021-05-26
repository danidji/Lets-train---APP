import React, { useState } from 'react';
import { Text, SafeAreaView, StyleSheet } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';

import validator from 'validator';

export default function Register({ route, navigation }) {

    const [register, setRegister] = useState({
        email: ""
        , password: ""
        , verifPass: ""
        , hidePassword: true
    })

    const [errors, setErrors] = useState({
        email: ""
        , password: ""
        , verifPass: ""
    });

    // console.log(`const[register,setRegister]=useState -> register`, register)

    const toRegister = () => {
        navigation.navigate("Connexion")
    }

    const hidePassword = () => {
        setRegister((register) => ({ ...register, hidePassword: !register.hidePassword }))
    }
    const onClick = () => {
        if (!validator.isEmail(register.email) || validator.isEmpty(register.email)) {
            setErrors({ ...errors, email: "Veuillez saisir un email valide" })
        }

        if (validator.isStrongPassword(register.password, { minLength: 6, minSymbols: 0 }) || validator.isEmpty(register.email)) {
            setErrors({ ...errors, password: "Saisir un mot de passe avec : 6 caractères min, au moins 1 majuscule et un 1 chiffre" })
        }

        if (register.password !== register.verifPass) {
            setErrors({ ...errors, verifPass: "Les mots de passe doivent être identique" })
        }

        // v Appel de la fonction pour renvoyer les infos au back


    }

    return (
        <SafeAreaView style={styles.main_container}>
            <Text>S'inscrire</Text>

            <Input
                placeholder="Adresse email"
                leftIcon={{ type: 'ionicon', name: 'mail-outline' }}
                textContentType="emailAddress"
                onChangeText={value => setRegister({ ...register, email: value })}
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
                onChangeText={value => setRegister({ ...register, password: value })}
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
                onChangeText={value => setRegister({ ...register, verifPass: value })}
                errorMessage={errors.verifPass}
            />

            <Button
                title="Inscription"
                onPress={onClick}
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
        flex: 1 // prends la largeur total de la colonne => flexDirection par défaut en colonne
        , padding: 10
        // , alignItems: "center"
        , justifyContent: "center"
    }
})