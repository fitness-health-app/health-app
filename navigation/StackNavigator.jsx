import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import HomePage from '../screens/HomePage';
import About from '../screens/About';
import ContactUs from '../screens/ContactUs';
import Login from '../screens/Login';
import Signup from '../screens/Signup';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomePage" component={HomePage} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="ContactUs" component={ContactUs} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
