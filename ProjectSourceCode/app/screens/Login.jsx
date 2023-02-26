import React, {useEffect, useState} from 'react';
import {View, StyleSheet, useColorScheme, TouchableOpacity} from 'react-native';
import {Button, TextInput, Text} from 'react-native-paper';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {backgroundThemeColor, themeTextColor} from '../styles/globalStyles';
import {currentUserState} from '../atoms/users';
import {
  validateEmail,
  validatePassword,
  invalidLogin,
} from '../utils/validations';
import {API_URL} from '../config';
import {ScrollView} from 'react-native-gesture-handler';

const Login = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode
      ? backgroundThemeColor.dark
      : backgroundThemeColor.light,
  };
  const textColorStyle = {
    color: isDarkMode ? themeTextColor.light : themeTextColor.dark,
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState({access_token: null, status: null});
  const [stateUpdate, setStateUpdate] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const currentUser = useRecoilValue(currentUserState);
  const setCurrentUser = useSetRecoilState(currentUserState);

  const loginAndStoreData = () => {
    if (validateEmail(email) && validatePassword(password)) {
      fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then(response => {
          if (!response.ok) throw new Error(response.status);
          else return response.json();
        })
        .then(responseData => {
          setData(previousData => ({
            ...previousData,
            access_token: responseData.access_token,
            status: responseData.status,
          }));
        })
        .catch(err => {
          invalidLogin();
          console.log(err.message);
        });
    }
  };
  useEffect(() => {
    if (data.length !== 0 && data.status === 'success') {
      setCurrentUser(prevData => ({
        ...prevData,
        email: email,
        access_token: data.access_token,
        status: data.status,
        message: 'Logged In',
        isLoggedIn: true,
      }));
      setStateUpdate(true);
    } else {
      setCurrentUser(prevData => ({
        ...prevData,
        email: '',
        access_token: '',
        status: data.status,
        message: data.message ? data.message : '',
        isLoggedIn: false,
      }));
      setStateUpdate(false);
    }
  }, [data]);

  useEffect(() => {
    if (stateUpdate) {
      const storeData = async () => {
        try {
          if (
            currentUser.email !== null &&
            currentUser.access_token !== null &&
            currentUser.status !== null &&
            currentUser.message !== null &&
            currentUser.isLoggedIn !== null
          ) {
            const email = JSON.stringify(currentUser.email);
            const access_token = JSON.stringify(currentUser.access_token);
            const status = JSON.stringify(currentUser.status);
            const message = JSON.stringify(currentUser.message);
            const isLoggedIn = JSON.stringify(currentUser.isLoggedIn);

            await AsyncStorage.setItem('@email', email);
            await AsyncStorage.setItem('@access_token', access_token);
            await AsyncStorage.setItem('@status', status);
            await AsyncStorage.setItem('@message', message);
            await AsyncStorage.setItem('@isLoggedIn', isLoggedIn);
          }
        } catch (err) {
          console.log('Error in Login: ', err);
        }
      };
      storeData();
    }
  }, [stateUpdate]);

  const onPressHandlerSignup = () => {
    navigation.navigate('Signup');
  };

  const toggleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <ScrollView style={[styles.scrollViewBody, backgroundStyle]}>
      <View style={styles.viewHeading}>
        <Text variant="headlineLarge">Login</Text>
      </View>
      <View style={styles.container}>
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
          Login
        </Button>
      </View>
      <View style={styles.viewSignupContainer}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-around',
            padding: 30,
          }}>
          <TouchableOpacity
            onPress={onPressHandlerSignup}
            underlayColor={isDarkMode ? '#606163' : '#E8E8E8'}>
            <Text variant="bodyLarge" style={[{color: '#f79700'}]}>
              Don't have an account? Sign up!
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
    flexDirection: 'column',
    padding: 10,
  },
  viewHeading: {
    alignItems: 'center',
    marginTop: 10,
    padding: 25,
  },
  viewSignupContainer: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
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

export default Login;
