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
import {backgroundThemeColor} from './styles/globalStyles';
import HomePage from './screens/HomePage';
import Login from './screens/Login';
import Signup from './screens/Signup';
import ContactUs from './screens/ContactUs';
import About from './screens/About';
import Dashboard from './screens/Dashboard';
import Statistics from './screens/Statistics';

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
      {/* <HomePage /> */}
      {/* <Login /> */}
      {/* <Signup /> */}
      {/* <ContactUs /> */}
      {/* <About /> */}
      {/* <Dashboard /> */}
      {/* <Statistics /> */}
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
});

export default App;
