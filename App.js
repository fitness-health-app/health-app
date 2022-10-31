/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {StatusBar, useColorScheme, StyleSheet, View, Text} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import HomePage from './screens/HomePage';
import Login from './screens/Login';
import Signup from './screens/Signup';
import About from './screens/About';

import Dashboard from './screens/Dashboard';
import MyProfile from './screens/MyProfile';
import Settings from './screens/Settings';
import Statistics from './screens/Statistics';
import Tasks from './screens/Tasks';
import Logout from './screens/Logout';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const LoginDrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="MyProfile" component={MyProfile} />
      <Drawer.Screen name="Tasks" component={Tasks} />
      <Drawer.Screen name="Statistics" component={Statistics} />
      <Drawer.Screen name="Logout" component={Logout} />
    </Drawer.Navigator>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode
      ? styles.backgroundColorTheme.dark
      : styles.backgroundColorTheme.light,
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    try {
      AsyncStorage.getItem('userName').then(value => {
        if (value != null) {
          setIsLoggedIn(true);
          console.log({value});
        }
      });
    } catch (error) {
      console.log({error});
    }
  };

  return (
    <View style={[styles.body, backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="HomePage" component={HomePage} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="About" component={About} />
          <Stack.Screen
            name="LoginDrawerNavigator"
            component={LoginDrawerNavigator}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  text: {
    color: '#0F0F0F',
    fontSize: 40,
  },
  backgroundColorTheme: {
    dark: '#00155F',
    light: '#f0f0ed',
  },
  textColor: {
    dark: '#000000',
    light: '#FFFFFF',
  },
});

export default App;
