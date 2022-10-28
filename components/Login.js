import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  TextInput,
  TouchableHighlight,
} from 'react-native';

const Login = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode
      ? styles.backgroundColorTheme.dark
      : styles.backgroundColorTheme.light,
  };
  const textColorStyle = {
    color: isDarkMode ? styles.textColor.light : styles.textColor.dark,
  };
  const containerBackgroundStyle = {
    backgroundColor: isDarkMode
      ? styles.containerLoginColor.dark
      : styles.containerLoginColor.light,
  };
  const containerTextColor = {
    color: isDarkMode
      ? styles.containerLoginColor.light
      : styles.textColor.light,
  };
  const buttonBackgroundColor = {
    backgroundColor: isDarkMode ? '#DDDDDD' : styles.backgroundColorTheme.dark,
  };

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={[styles.viewBody, backgroundStyle]}>
      <View style={styles.viewTitleRow}>
        <Text style={[textColorStyle, styles.textTitle]}>Health App</Text>
      </View>
      <View style={{alignItems: 'center'}}>
        <Text style={[textColorStyle, styles.textLogin]}>LOGIN</Text>
      </View>
      <View style={[styles.containerLogin, containerBackgroundStyle]}>
        <TextInput
          style={styles.textInput}
          onChangeText={setUser}
          value={user}
          placeholder="Email"
          color={isDarkMode ? '#d3d8dd' : '#00155F'}
          underlineColorAndroid="#FFFFFF"
          placeholderTextColor={isDarkMode ? '#d3d8dd' : '#00155F'}
        />
        <TextInput
          style={styles.textInput}
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          color={isDarkMode ? '#d3d8dd' : '#00155F'}
          underlineColorAndroid="#FFFFFF"
          placeholderTextColor={isDarkMode ? '#d3d8dd' : '#00155F'}
          secureTextEntry
        />
        <View style={[styles.viewLoginButton]}>
          <TouchableHighlight
            activeOpacity={0.6}
            onPress={() => alert('Login Pressed!')}>
            <View style={[styles.viewTouchableLogin, buttonBackgroundColor]}>
              <Text style={[styles.textTouchable, containerTextColor]}>
                Login
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
      <View style={styles.viewAlternateLogin}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <Text style={[styles.textAlternateLogin, textColorStyle]}>OR</Text>
          <Text style={[styles.textAlternateLogin, textColorStyle]}>
            Google+
          </Text>
          <Text style={[styles.textAlternateLogin, textColorStyle]}>
            Forgot Password?
          </Text>
          <Text style={[styles.textAlternateLogin, {color: '#f79700'}]}>
            Don't have an account? Sign up!
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
  },
  viewTitleRow: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  containerLogin: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    margin: 40,
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
  viewAlternateLogin: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
  },
  textTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    padding: 2,
  },
  textInput: {
    width: 250,
    margin: 12,
    padding: 10,
  },
  textLogin: {
    fontSize: 23,
    fontWeight: 'bold',
  },
  textTouchable: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  textAlternateLogin: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  textColor: {
    dark: '#000000',
    light: '#FFFFFF',
  },
  backgroundColorTheme: {
    dark: '#00155F',
    light: '#f0f0ed',
  },
  containerLoginColor: {
    dark: '#5C6DFF',
    light: '#f79700',
  },
});

export default Login;
