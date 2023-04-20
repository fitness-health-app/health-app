import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Coach from '../screens/Coach';
import SelectedCoachScreen from '../screens/SelectedCoachScreen';
import RoutineScreen from '../screens/RoutineScreen';

const Stack = createStackNavigator();

const StackNavigatorCoach = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Coach" component={Coach} />
      <Stack.Screen
        name="SelectedCoachScreen"
        component={SelectedCoachScreen}
      />
      <Stack.Screen name="RoutineScreen" component={RoutineScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigatorCoach;
