import React from 'react';
import {useColorScheme, StyleSheet, View, Text} from 'react-native';
import {backgroundThemeColor, themeTextColor} from '../styles/globalStyles';

const Statistics = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode
      ? backgroundThemeColor.dark
      : backgroundThemeColor.light,
  };
  const textColorStyle = {
    color: isDarkMode ? themeTextColor.light : themeTextColor.dark,
  };

  return (
    <View style={[styles.body, backgroundStyle]}>
      <View style={styles.viewHeading}>
        <Text style={[textColorStyle, styles.textTitle]}>Statistics</Text>
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
