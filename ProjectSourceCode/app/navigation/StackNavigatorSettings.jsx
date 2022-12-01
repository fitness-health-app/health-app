import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Settings from '../screens/Settings';
import UpdateUser from '../screens/UpdateUser';

const Stack = createStackNavigator();

const StackNavigatorSettings = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="UpdateUser" component={UpdateUser} />
    </Stack.Navigator>
  );
};

export default StackNavigatorSettings;
