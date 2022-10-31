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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Vulputate sapien nec sagittis aliquam malesuada bibendum arcu. Lacus
            suspendisse faucibus interdum posuere lorem ipsum dolor sit amet.
            Arcu cursus euismod quis viverra nibh cras pulvinar mattis.
            Ullamcorper sit amet risus nullam eget felis. Cursus turpis massa
            tincidunt dui ut ornare. Metus aliquam eleifend mi in nulla.{'\n\n'}
            Tortor aliquam nulla facilisi cras fermentum odio. Urna condimentum
            mattis pellentesque id nibh tortor id. Aliquam etiam erat velit
            scelerisque in dictum. Et odio pellentesque diam volutpat commodo
            sed. Fusce ut placerat orci nulla pellentesque dignissim enim sit
            amet. Odio facilisis mauris sit amet massa.
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
