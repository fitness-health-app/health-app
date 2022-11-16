import React from 'react';
import {
  StatusBar,
  useColorScheme,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Logout = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode
      ? styles.backgroundColorTheme.dark
      : styles.backgroundColorTheme.light,
  };
  const textColorStyle = {
    color: isDarkMode ? styles.textColor.light : styles.textColor.dark,
  };
  const buttonBackgroundColor = {
    backgroundColor: isDarkMode ? '#DDDDDD' : styles.backgroundColorTheme.dark,
  };

  const containerTextColor = {
    color: isDarkMode
      ? styles.containerLoginColor.light
      : styles.textColor.light,
  };

  const logoutClearData = async () => {
    try {
      await AsyncStorage.clear();
      navigation.navigate('Login');
    } catch (e) {
      console.log({e});
    }

    console.log('Done.');
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
        <View style={[styles.viewLoginButton]}>
          <TouchableHighlight
            activeOpacity={0.6}
            onPress={logoutClearData}>
            <View style={[styles.viewTouchableLogin, buttonBackgroundColor]}>
              <Text style={[styles.textTouchable, containerTextColor]}>
                Logout
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  viewLoginButton: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: 30,
  },
  viewTouchableLogin: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    padding: 10,
    width: 180,
  },
  textTouchable: {
    fontSize: 20,
    fontWeight: 'bold',
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
  containerLoginColor: {
    dark: '#5C6DFF',
    light: '#f79700',
  },
});

export default Logout;
