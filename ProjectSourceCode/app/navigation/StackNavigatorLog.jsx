import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Log from '../screens/Log';
import TrackNutrition from '../screens/TrackNutrition';
import TrackFitness from '../screens/TrackFitness';

const Stack = createStackNavigator();

const StackNavigatorLog = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Log" component={Log} />
      <Stack.Screen name="TrackNutrition" component={TrackNutrition} />
      <Stack.Screen name="TrackFitness" component={TrackFitness} />
    </Stack.Navigator>
  );
};

export default StackNavigatorLog;
