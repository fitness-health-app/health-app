import React from 'react';
import {useColorScheme, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';

import {backgroundThemeColor} from '../styles/globalStyles';

const DisplayCurrentDate = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const dateFormat = new Date().toLocaleDateString();
  const dateDay = new Date();
  const dayOfWeek = weekdays[dateDay.getDay()]; // returns a string like "Monday"

  return (
    <View style={{padding: 10}}>
      <View style={{flexDirection: 'row'}}>
        {dateFormat && <Text variant="headlineSmall">{dayOfWeek} - </Text>}
        {dateFormat && <Text variant="headlineSmall">{dateFormat}</Text>}
      </View>
    </View>
  );
};
export default DisplayCurrentDate;
