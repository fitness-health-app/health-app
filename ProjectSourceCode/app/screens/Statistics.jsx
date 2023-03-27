import React from 'react';
import {useColorScheme, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';

import CustomLineChart from '../components/CustomLineChart'

import {backgroundThemeColor} from '../styles/globalStyles';

const Statistics = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode
      ? backgroundThemeColor.dark
      : backgroundThemeColor.light,
  };

  const backgroundColorChart = {
    backgroundColor: isDarkMode ? '#bcbcbc' : '#f3f6f4',
  };

  return (
    <View style={[styles.body, backgroundStyle]}>
      <View style={styles.viewHeading}>
        <Text variant="headlineLarge">Statistics</Text>
        <CustomLineChart chartTitle='Calories' />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  viewHeading: {
    alignItems: 'center',
    padding: 25,
  },
  textTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    padding: 2,
  },
});

export default Statistics;
