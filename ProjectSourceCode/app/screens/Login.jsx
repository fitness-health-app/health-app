import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {backgroundThemeColor, themeTextColor} from '../styles/globalStyles';
import CustomButtons from '../components/CustomButtons';
import {currentUserState} from '../atoms/users';
import {
  validateEmail,
  validatePassword,
  invalidLogin,
} from '../utils/validations';

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
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({access_token: null, status: null});
  const [stateUpdate, setStateUpdate] = useState(false);
  const currentUser = useRecoilValue(currentUserState);
  const setCurrentUser = useSetRecoilState(currentUserState);

  const loginAndStoreData = () => {
    if (validateEmail(email) && validatePassword(password)) {
      setIsLoading(true);
      fetch('http://ec2-54-210-125-9.compute-1.amazonaws.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
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
        .then(setIsLoading(false))
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
  // const onPressHandlerGoogle = () => {
  //   console.log('Login with Google');
  // };

  return (
    <View style={[styles.viewBody, backgroundStyle]}>
      <View style={styles.viewTitleRow}>
        <Text style={[textColorStyle, styles.textTitle]}>LOGIN</Text>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TextInput
          style={styles.textInput}
          onChangeText={setEmail}
          value={email}
          placeholder="EMAIL ADDRESS"
          color={isDarkMode ? '#d3d8dd' : '#00155F'}
          underlineColorAndroid={isDarkMode ? '#FFFFFF' : '#00155F'}
          placeholderTextColor={isDarkMode ? '#d3d8dd' : '#00155F'}
        />
        <TextInput
          style={styles.textInput}
          onChangeText={setPassword}
          value={password}
          placeholder="PASSWORD"
          color={isDarkMode ? '#d3d8dd' : '#00155F'}
          underlineColorAndroid={isDarkMode ? '#FFFFFF' : '#00155F'}
          placeholderTextColor={isDarkMode ? '#d3d8dd' : '#00155F'}
          secureTextEntry
        />
        <CustomButtons
          buttonText={'Sign In'}
          onPressHandleFunction={loginAndStoreData}
          width={200}
          height={50}
        />
      </View>
      <View style={styles.viewAlternateLogin}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          {/* <View style={{padding: 5}}>
            <Text style={[textColorStyle]}>-or-</Text>
          </View>
          <TouchableHighlight
            onPress={onPressHandlerGoogle}
            underlayColor={isDarkMode ? '#606163' : '#E8E8E8'}>
            <Text style={{color: '#FF0000', fontSize: 16, fontWeight: 'bold'}}>
              Google+
            </Text>
          </TouchableHighlight> */}
          <Text style={[styles.textAlternateLogin, textColorStyle]}>
            Forgot Password?
          </Text>
          <TouchableHighlight
            onPress={onPressHandlerSignup}
            underlayColor={isDarkMode ? '#606163' : '#E8E8E8'}>
            <Text style={[styles.textAlternateLogin, {color: '#f79700'}]}>
              Don't have an account? Sign up!
            </Text>
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
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 10,
  },
  viewTitleRow: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    padding: 10,
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
    width: 300,
    margin: 8,
    padding: 10,
  },
  textAlternateLogin: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default Login;
