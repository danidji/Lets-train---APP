import React from 'react';
import { createStackNavigator } from '@react-navigation/stack' // => permet d'englober l'ensemble de la navigation - une stack représente un bloc qui va permet de gérer la navigation entre les différents screens
import { NavigationContainer } from '@react-navigation/native';

import store from "./store";

//Redux 
import { Provider } from 'react-redux';


// chargement des pages
import Home from './navigation/Home';
import Historic from './navigation/Historic';
import Account from './navigation/Account';
// chargement des screens-components
import Program from './navigation/Program'
import Player from './navigation/Player'

import Tabs from './navigation/Tabs'

// doc stack => https://reactnavigation.org/docs/stack-navigator/
const Stack = createStackNavigator();

export default function App() {
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


  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tabs
          HomeNavigator={HomeNavigator}
          HistoricNavigator={HistoricNavigator}
          AccountNavigator={AccountNavigator}
        />
      </NavigationContainer>
    </Provider>


  );
}
