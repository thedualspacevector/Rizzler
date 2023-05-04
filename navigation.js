
import React from "react";
import { TouchableOpacity } from "react-native";

import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import FontAwesome from "react-native-vector-icons/FontAwesome";

import Home from "./screens/Home";
import Profile from "./screens/Profile";
import OutputScreen from "./screens/OutputScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Default = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({

                headerShown: false,
                 tabBarActiveTintColor : "#000000",
                 tabBarInactiveTintColor : "gray",
                 tabBarStyle : {
                    backgroundColor: '#fff',
                    borderTopColor: 'transparent',
                    height: 60,
                    paddingTop: 5,
                    paddingBottom: 5,
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 10,
                    },
                    shadowOpacity: 0.53,
                    shadowRadius: 13.97,
                },
                
                tabBarButton: (props) => <TouchableOpacity {...props} />,
                
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === "Home") {
                        iconName = focused ? "home" : "home";
                    } else if (route.name === "Profile") {
                        iconName = focused ? "user" : "user";
                    }
                    return <FontAwesome name={iconName} size={size} color={color} />;
                },
            })}
            >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
};

const SignedIn = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions= {{headerShown: false}}>
               <Stack.Screen name="Default" component={Default} />
               <Stack.Screen name="Output" component={ OutputScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default SignedIn;
