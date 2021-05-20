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
                        <Icon
                            name='home-outline'
                            type='ionicon'
                        />
                    }
                }}
            />
            <Tab.Screen
                name="Historic"
                component={HistoricNavigator}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        <Icon
                            name='document-text-outline'
                            type='ionicon'
                        />
                    }
                }}
            />
            <Tab.Screen
                name="Account"
                component={AccountNavigator}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        <Icon
                            name='body-outline'
                            type='ionicon'
                        />
                    }
                }}
            />
        </Tab.Navigator >
    )
}