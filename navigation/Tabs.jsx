import React from 'react';
import { Text, SafeAreaView } from 'react-native';

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createMaterialTopTabNavigator();

export default function Tabs(props) {
    const { HomeNavigator, HistoricNavigator, AccountNavigator } = props

    return (
        <Tab.Navigator
            swipeEnabled={true}
            animationEnable={false} //Permet d'améliorer les performances de l'appli
            initialRouteName="Home" //route de la screen à afficher lors du chargement du navigateur
            tabBarPosition="bottom"
            tabBarOptions={{
                activeBackgroundColor: "#fff",
                inactiveBackgroundColor: "#fff",
                activeTintColor: 'blue',
                inactiveTintColor: "#9B9B9B",
                showIcon: true,
                indicatorStyle: { backgroundColor: 'blue', top: 0 }
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeNavigator}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        <MaterialCommunityIcons name="home" size={20} />
                    }
                }}
            />
            <Tab.Screen
                name="Historic"
                component={HistoricNavigator}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        <MaterialCommunityIcons name="history" size={20} />
                    }
                }}
            />
            <Tab.Screen
                name="Account"
                component={AccountNavigator}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        <MaterialCommunityIcons name="account" size={20} />
                    }
                }}
            />
        </Tab.Navigator >
    )
}