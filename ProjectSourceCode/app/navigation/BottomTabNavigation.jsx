import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Dashboard from '../screens/Dashboard';
import Coach from '../screens/Coach';
import Log from '../screens/Log';
import StackNavigatorLog from './StackNavigatorLog';
import StackNavigatorSettings from './StackNavigatorSettings';
import StackNavigatorCoach from './StackNavigatorCoach';
import Settings from '../screens/Settings';

const Tab = createMaterialBottomTabNavigator();

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
      }}
      activeColor="#f79700"
      inactiveColor="#f0edf6"
      barStyle={{backgroundColor: '#515151'}}>
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <FontAwesome5 name="home" size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="StackNavigatorLog"
        component={StackNavigatorLog}
        options={{
          tabBarLabel: 'Log',
          tabBarIcon: ({color}) => (
            <FontAwesome5 name="list-ul" size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="StackNavigatorCoach"
        component={StackNavigatorCoach}
        options={{
          tabBarLabel: 'Coach',
          tabBarIcon: ({color}) => (
            <FontAwesome5 name="chart-line" size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="StackNavigatorSettings"
        component={StackNavigatorSettings}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({color}) => (
            <FontAwesome5 name="user-circle" size={22} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
