import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack' // => permet d'englober l'ensemble de la navigation - une stack représente un bloc qui va permet de gérer la navigation entre les différents screens
import { NavigationContainer } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { userLogged, check } from "./store/actions";

// chargement des pages
import Home from './navigation/Home';
import Historic from './navigation/Historic';
import Account from './navigation/Account';
import Login from './navigation/Login'
import Register from './navigation/Register'


// chargement des screens-components
import Program from './navigation/Program'
import Player from './navigation/Player'
import Tabs from './navigation/Tabs'

// import du secureStore pour récupérer le JWT d'authentification
import * as SecureStore from "expo-secure-store";
import axios from 'axios';

// doc stack => https://reactnavigation.org/docs/stack-navigator/
const Stack = createStackNavigator();

export default function AppIntermediate() {

  const user = useSelector(({ userReducer }) => userReducer.user);
  const dispatch = useDispatch();

  const [jwt, setJwt] = useState();

  //Enregistrement du token dans l'état JWT
  useEffect(() => {
    SecureStore.getItemAsync("jwt_token").then((token) => {
      setJwt(token);
    })
  }, [])

  useEffect(() => {
    if (jwt) {
      //axios intercepte les requêtes , utilise la config(=> élément de la request avec tous ses éléments propres) pour y insérer le token
      axios.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${jwt}`;
        return config;
      })
      // si mon utilisateur est loggé 
      dispatch(check()).then((data) => {
        if (data.payload.user) {
          dispatch(userLogged(data.payload.user));
        }
      })
    }
  }, [jwt])

  const HomeNavigator = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Programmes"
        >
          {(props) => <Home {...props} />}
        </Stack.Screen>
        <Stack.Screen
          name="Programme"
        >
          {(props) => <Program {...props} />}
        </Stack.Screen>
        <Stack.Screen
          name="Player"
        >
          {(props) => <Player {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    )
  }

  const HistoricNavigator = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Historic"
        >
          {(props) => <Historic {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    )
  }
  const AccountNavigator = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Compte"
        >
          {(props) => <Account {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    )
  }

  const AuthNavigator = () => {
    return (
      <Stack.Navigator
        // headerMode="none"
        initialRouteName="Connexion"
        screenOptions={{
          headerShown: false, //supprime la barre du header
        }}
      >
        <Stack.Screen
          name="Connexion"

        >
          {(props) => <Login {...props} />}
        </Stack.Screen>

        <Stack.Screen
          name="Enregistrement"
        >
          {(props) => <Register {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    )
  }


  return (

    // <>
    //   {!user.email
    //     ? (<NavigationContainer>
    //       <AuthNavigator />
    //     </NavigationContainer>)
    //     : (<NavigationContainer>
    //       <Tabs
    //         HomeNavigator={HomeNavigator}
    //         HistoricNavigator={HistoricNavigator}
    //         AccountNavigator={AccountNavigator}
    //       />
    //     </NavigationContainer>)


    //   }
    // </>
    <NavigationContainer>
      {!user.email
        ? (
          <AuthNavigator />
        )
        : (
          <Tabs
            HomeNavigator={HomeNavigator}
            HistoricNavigator={HistoricNavigator}
            AccountNavigator={AccountNavigator}
          />)
      }
    </NavigationContainer>


  );
}
