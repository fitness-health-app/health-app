import React from 'react';
import {StatusBar, useColorScheme, StyleSheet, View, Text} from 'react-native';

const About = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode
      ? styles.backgroundColorTheme.dark
      : styles.backgroundColorTheme.light,
  };
  const textColorStyle = {
    color: isDarkMode ? styles.textColor.light : styles.textColor.dark,
  };
  return (
    <View style={[styles.body, backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 20,
        }}>
        <Text
          style={[
            textColorStyle,
            {fontSize: 30, fontWeight: 'bold', textAlign: 'justify'},
          ]}>
          About Us
        </Text>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 20,
          }}>
          <Text
            style={[
              textColorStyle,
              {fontSize: 20, fontWeight: 'regular', textAlign: 'justify'},
            ]}>
            A digital health and wellness application with services such as
            calorie tracking and advice on nutrition and fitness. It is
            available on the Android and iOS platforms, and can be used with
            wearable technology such as activity trackers.
            {'\n\n'}
            Tell us what you want to acheive and receive personalized goals.
            Learn about the foods you’re eating and keep your calories within
            your daily budget. Reach your goals and continue to set new ones for
            a happier, healthier you!
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  text: {
    color: '#0F0F0F',
    fontSize: 40,
  },
  backgroundColorTheme: {
    dark: '#00155F',
    light: '#f0f0ed',
  },
  textColor: {
    dark: '#000000',
    light: '#FFFFFF',
  },
});

export default About;
