import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Dashboard from '../screens/Dashboard';
import Statistics from '../screens/Statistics';
import Tasks from '../screens/Tasks';

import DrawerNavigator from './DrawerNavigator';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        tabBarActiveTintColor: '#f79700',
        headerShown: false,
      }}>
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <FontAwesome5 name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Statistics"
        component={Statistics}
        options={{
          tabBarLabel: 'Statistics',
          tabBarIcon: ({color, size}) => (
            <FontAwesome5 name="chart-line" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Tasks"
        component={Tasks}
        options={{
          tabBarLabel: 'Tasks',
          tabBarIcon: ({color, size}) => (
            <FontAwesome5 name="list-ul" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="DrawerNavigator"
        component={DrawerNavigator}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({color, size}) => (
            <FontAwesome5 name="user-circle" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
