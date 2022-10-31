import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  TextInput,
  TouchableHighlight,
} from 'react-native';

const ContactUs = ({navigation}) => {
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
      ? styles.containerSignupColor.dark
      : styles.containerSignupColor.light,
  };
  const containerTextColor = {
    color: isDarkMode
      ? styles.containerSignupColor.light
      : styles.textColor.light,
  };
  const buttonBackgroundColor = {
    backgroundColor: isDarkMode ? '#DDDDDD' : styles.backgroundColorTheme.dark,
  };

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  return (
    <View style={[styles.viewBody, backgroundStyle]}>
      <View style={{alignItems: 'center'}}>
        <Text style={[textColorStyle, styles.textLogin]}>Contact Us</Text>
      </View>
      <View style={[styles.containerSignup, containerBackgroundStyle]}>
        <TextInput
          style={styles.textInput}
          onChangeText={setName}
          value={name}
          placeholder="Name"
          color={isDarkMode ? '#d3d8dd' : '#00155F'}
          underlineColorAndroid="#FFFFFF"
          placeholderTextColor={isDarkMode ? '#d3d8dd' : '#00155F'}
        />
        <TextInput
          style={styles.textInput}
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
          color={isDarkMode ? '#d3d8dd' : '#00155F'}
          underlineColorAndroid="#FFFFFF"
          placeholderTextColor={isDarkMode ? '#d3d8dd' : '#00155F'}
        />
        <TextInput
          style={styles.textInput}
          onChangeText={setMessage}
          value={message}
          placeholder="Your Messsage"
          color={isDarkMode ? '#d3d8dd' : '#00155F'}
          underlineColorAndroid="#FFFFFF"
          placeholderTextColor={isDarkMode ? '#d3d8dd' : '#00155F'}
          secureTextEntry
        />
        <View style={[styles.viewButtonSignup]}>
          <TouchableHighlight
            activeOpacity={0.6}
            onPress={() => alert('Submit Pressed!')}>
            <View style={[styles.viewTouchableSignup, buttonBackgroundColor]}>
              <Text style={[styles.textTouchable, containerTextColor]}>
                Submit
              </Text>
            </View>
          </TouchableHighlight>
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
  containerSignup: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    margin: 40,
  },
  viewButtonSignup: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: 30,
  },
  viewTouchableSignup: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    padding: 10,
    width: 180,
  },
  viewAlternateSignup: {
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
  textAlternateSignup: {
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
  containerSignupColor: {
    dark: '#5C6DFF',
    light: '#f79700',
  },
});

export default ContactUs;
