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
import HomePage from './screens/HomePage';
import {backgroundThemeColor} from './styles/globalStyles';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode
      ? backgroundThemeColor.dark
      : backgroundThemeColor.light,
  };

  return (
    <View style={[styles.body, backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <HomePage />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  textSize: {
    fontSize: 40,
  },
  backgroundThemeColor: {
    dark: '#1c1e21',
    light: '#f0f0ed',
  },
});

export default App;
