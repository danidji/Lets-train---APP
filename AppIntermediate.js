import React from 'react';
import { createStackNavigator } from '@react-navigation/stack' // => permet d'englober l'ensemble de la navigation - une stack représente un bloc qui va permet de gérer la navigation entre les différents screens
import { NavigationContainer } from '@react-navigation/native';


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

// doc stack => https://reactnavigation.org/docs/stack-navigator/
const Stack = createStackNavigator();

export default function AppIntermediate() {
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
          name="Account"
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
    // <NavigationContainer>
    //   <Tabs
    //     HomeNavigator={HomeNavigator}
    //     HistoricNavigator={HistoricNavigator}
    //     AccountNavigator={AccountNavigator}
    //   />
    // </NavigationContainer>
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>


  );
}
