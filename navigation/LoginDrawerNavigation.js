import React, {useEffect, useState} from 'react';
import {useColorScheme, StyleSheet} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {createDrawerNavigator} from '@react-navigation/drawer';

import Dashboard from '../screens/Dashboard';
import MyProfile from '../screens/MyProfile';
import Settings from '../screens/Settings';
import Statistics from '../screens/Statistics';
import Tasks from '../screens/Tasks';
import Logout from '../screens/Logout';

const Drawer = createDrawerNavigator();

const LoginDrawerNavigator = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const drawerBackgroundColor = isDarkMode
    ? styles.backgroundColorTheme.dark
    : styles.backgroundColorTheme.light;

  const drawerTextColor = isDarkMode
    ? styles.textColor.light
    : styles.textColor.dark;

  return (
    <Drawer.Navigator
      hideStatusBar={false}
      overlayColor="#00000090"
      drawerStyle={{
        backgroundColor: '#e6e6e6',
        width: 250,
      }}
      screenOptions={{
        headerShown: true,
        swipeEnabled: true,
        gestureEnabled: true,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: drawerBackgroundColor,
        },
        headerTintColor: drawerTextColor,
        headerTitleStyle: {
          fontSize: 25,
          fontWeight: 'bold',
        },
      }}>
      <Drawer.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          title: 'Dashboard',
          drawerIcon: ({focused}) => (
            <FontAwesome5
              name="home"
              size={focused ? 25 : 20}
              color={focused ? '#0080ff' : '#999999'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          title: 'Settings',
          drawerIcon: ({focused}) => (
            <FontAwesome5
              name="cog"
              size={focused ? 25 : 20}
              color={focused ? '#0080ff' : '#999999'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="MyProfile"
        component={MyProfile}
        options={{
          title: 'My Profile',
          drawerIcon: ({focused}) => (
            <FontAwesome5
              name="user-circle"
              size={focused ? 25 : 20}
              color={focused ? '#0080ff' : '#999999'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Tasks"
        component={Tasks}
        options={{
          title: 'Tasks',
          drawerIcon: ({focused}) => (
            <FontAwesome5
              name="tasks"
              size={focused ? 25 : 20}
              color={focused ? '#0080ff' : '#999999'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Statistics"
        component={Statistics}
        options={{
          title: 'Statistics',
          drawerIcon: ({focused}) => (
            <FontAwesome5
              name="chart-bar"
              size={focused ? 25 : 20}
              color={focused ? '#0080ff' : '#999999'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Logout"
        component={Logout}
        options={{
          title: 'Logout',
          drawerIcon: ({focused}) => (
            <FontAwesome5
              name="sign-out-alt"
              size={focused ? 25 : 20}
              color={focused ? '#0080ff' : '#999999'}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  backgroundColorTheme: {
    dark: '#00155F',
    light: '#f0f0ed',
  },
  textColor: {
    dark: '#000000',
    light: '#FFFFFF',
  },
});

export default LoginDrawerNavigator;
