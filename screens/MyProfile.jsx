import React from 'react';
import {useColorScheme, StyleSheet, View, Text} from 'react-native';
import {backgroundThemeColor, themeTextColor} from '../styles/globalStyles';

const MyProfile = () => {
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
      <View style={{alignItems: 'center'}}>
        <Text style={[textColorStyle, styles.textTitle]}>My Profile</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  textTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    padding: 2,
  },
});

export default MyProfile;
