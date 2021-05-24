import React from 'react';
import { Text, SafeAreaView } from 'react-native';

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Icon } from 'react-native-elements';

const Tab = createMaterialTopTabNavigator();

export default function Tabs(props) {
    const { HomeNavigator, HistoricNavigator, AccountNavigator } = props

    return (
        <Tab.Navigator
            swipeEnabled={true}
            animationEnable={false} //Permet d'améliorer les performances de l'appli
            initialRouteName="Home" //route de la screen à afficher lors du chargement du navigateur
            tabBarPosition="bottom"
            lazy={true}
            tabBarOptions={{
                activeBackgroundColor: "#fff",
                inactiveBackgroundColor: "#fff",
                activeTintColor: '#4c46fc',
                inactiveTintColor: "#9B9B9B",
                showIcon: true,
                indicatorStyle: { backgroundColor: '#4c46fc', top: 0 }
            }}
        >
            <Tab.Screen
                name="Accueil"
                component={HomeNavigator}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon
                            name='home-outline'
                            type='ionicon'
                            color={color}
                            size={20}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="Historique"
                component={HistoricNavigator}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon
                            name='document-text-outline'
                            type='ionicon'
                            color={color}
                            size={20}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="Compte"
                component={AccountNavigator}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon
                            name='body-outline'
                            type='ionicon'
                            color={color}
                            size={20}
                        />
                    )
                }}
            />
        </Tab.Navigator >
    )
}