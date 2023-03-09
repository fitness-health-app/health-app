import React, {useState} from 'react';
import {View, StyleSheet, useColorScheme, TouchableOpacity} from 'react-native';
import {Button, TextInput, Text} from 'react-native-paper';

import {backgroundThemeColor, themeTextColor} from '../styles/globalStyles';
import {
  validateName,
  validateEmail,
  validateSignupPassword,
  invalidSignup,
  successValidation,
} from '../utils/validations';
import {API_URL} from '../config';
import {ScrollView} from 'react-native-gesture-handler';

const Signup = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode
      ? backgroundThemeColor.dark
      : backgroundThemeColor.light,
  };
  const textColorStyle = {
    color: isDarkMode ? themeTextColor.light : themeTextColor.dark,
  };

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [data, setData] = useState(null);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const loginAndStoreData = () => {
    if (
      validateName(name) &&
      validateEmail(email) &&
      validateSignupPassword(password, passwordConfirm)
    ) {
      fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          name: name,
          password: password,
          passwordConfirm: passwordConfirm,
        }),
      })
        .then(response => {
          if (!response.ok) throw new Error(response.status);
          else return response.json();
        })
        .then(res => {
          setData(res);
        })
        .then(() => {
          successValidation();
          navigation.navigate('Login');
        })
        .catch(err => {
          invalidSignup();
          console.log(err.message);
        });
    }
  };

  const onPressHandlerLogin = () => {
    navigation.navigate('Login');
  };
  const toggleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <ScrollView style={[styles.scrollViewBody, backgroundStyle]}>
      <View style={styles.viewHeading}>
        <Text variant="headlineLarge">Sign Up</Text>
      </View>
      <View style={styles.container}>
        <TextInput
          label="Name"
          value={name}
          onChangeText={text => setName(text)}
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          mode="outlined"
          secureTextEntry={secureTextEntry}
          style={styles.input}
        />
        <TextInput
          label="Confirm Password"
          value={passwordConfirm}
          onChangeText={text => setPasswordConfirm(text)}
          mode="outlined"
          secureTextEntry={secureTextEntry}
          style={styles.input}
        />
        <View style={{marginTop: 15, marginBottom: 35}}>
          <TouchableOpacity onPress={toggleSecureTextEntry}>
            <Text style={[textColorStyle]}>
              {secureTextEntry ? 'Show' : 'Hide'} password
            </Text>
          </TouchableOpacity>
        </View>
        <Button
          mode="contained"
          onPress={loginAndStoreData}
          style={styles.button}>
          Sign Up
        </Button>
      </View>
      <View style={styles.viewAlternateLogin}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-around',
            padding: 20,
          }}>
          <TouchableOpacity
            onPress={onPressHandlerLogin}
            underlayColor={isDarkMode ? '#606163' : '#E8E8E8'}>
            <Text variant="bodyLarge" style={[{color: '#f79700'}]}>
              Already have an account? Sign In!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewBody: {
    flex: 1,
    padding: 10,
  },
  viewHeading: {
    alignItems: 'center',
    marginTop: 10,
    padding: 25,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    width: '100%',
    marginBottom: 16,
  },
  button: {
    width: '100%',
  },
});

export default Signup;
