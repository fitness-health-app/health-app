import React, {useEffect} from 'react';
import {useColorScheme, StyleSheet, View, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {backgroundThemeColor, themeTextColor} from '../styles/globalStyles';

const Dashboard = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode
      ? backgroundThemeColor.dark
      : backgroundThemeColor.light,
  };
  const textColorStyle = {
    color: isDarkMode ? themeTextColor.light : themeTextColor.dark,
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        const access_token = await AsyncStorage.getItem('@access_token');
        const user = await AsyncStorage.getItem('@user');
        if (access_token !== null && user !== null) {
          console.log('Dashboard :: data :: access_token: ', {access_token});
          console.log('Dashboard :: data :: user: ', {user});
        }
      } catch (err) {
        console.log('Error in Dashboard: ', err);
      }
    };
    getUserData();
  }, []);

  return (
    <View style={[styles.body, backgroundStyle]}>
      <View style={styles.viewHeading}>
        <Text style={[textColorStyle, styles.textTitle]}>Dashboard</Text>
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

export default Dashboard;
