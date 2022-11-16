import React from 'react';
import {
  StatusBar,
  useColorScheme,
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';

const Dashboard = ({navigation}) => {
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
        }}>
        <Image
          source={require('../assests/Dashboard.png')}
          style={{width: 380, height: 600}}
        />
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

export default Dashboard;
