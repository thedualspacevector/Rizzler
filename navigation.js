
import React from "react";
import { TouchableOpacity, View } from "react-native";

import { DarkTheme, NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import FontAwesome from "react-native-vector-icons/FontAwesome5";

import Home from "./screens/Home";
import Profile from "./screens/Profile";
import OutputScreen from "./screens/OutputScreen";
import RizzBot from "./screens/RizzBot";
import SearchScreen from "./screens/SearchScreen";

import LinearGradient from "react-native-linear-gradient";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const SignedIn = () => {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: "#fff",
          tabBarInactiveTintColor: "#6c757d",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: 'transparent',
            borderTopColor: 'transparent',
            height: 70,
            elevation: 3 ,
            zIndex: 0,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            position: 'absolute',
          },
          tabBarButton: (props) => <TouchableOpacity {...props} />,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home"
            } else if (route.name === "Profile") {
              iconName = focused ? "user" : "user";
            } else if (route.name === "RizzBot") {
              iconName = focused ? "ghost" : "ghost";
            } else if (route.name === "SearchScreen") {
              iconName = focused ? "search" : "search";
            }

            if (focused) {
              size = 30;
            } else {
              size = 24;
            }

            return <FontAwesome name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="RizzBot" component={RizzBot} options={
          {
            tabBarVisible: false,
            headerShown: false,
            tabBarStyle: {
              display: 'none'
            }
          }
        }
        />
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="SearchScreen" component={SearchScreen} />
      </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator
        initialRouteName="SignedIn"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="SignedIn" component={SignedIn} />
        <Stack.Screen name="Output" component={OutputScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;