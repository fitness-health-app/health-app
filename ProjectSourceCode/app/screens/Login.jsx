import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
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
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({access_token: null, status: null});
  const [stateUpdate, setStateUpdate] = useState(false);
  const currentUser = useRecoilValue(currentUserState);
  const setCurrentUser = useSetRecoilState(currentUserState);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const loginAndStoreData = () => {
    if (validateEmail(email) && validatePassword(password)) {
      setIsLoading(true);
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
  const toggleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <ScrollView style={[styles.scrollViewBody, backgroundStyle]}>
      <View style={[styles.viewBody]}>
        <View style={styles.viewTitleRow}>
          <Text style={[textColorStyle, styles.textTitle]}>Login</Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <TextInput
            style={styles.textInput}
            onChangeText={inputText => setEmail(inputText.trim())}
            value={email}
            placeholder="EMAIL ADDRESS"
            color={isDarkMode ? '#d3d8dd' : '#00155F'}
            underlineColorAndroid={isDarkMode ? '#FFFFFF' : '#00155F'}
            placeholderTextColor={isDarkMode ? '#d3d8dd' : '#00155F'}
          />
          <TextInput
            style={styles.textInput}
            onChangeText={inputText => setPassword(inputText.trim())}
            value={password}
            placeholder="PASSWORD"
            color={isDarkMode ? '#d3d8dd' : '#00155F'}
            underlineColorAndroid={isDarkMode ? '#FFFFFF' : '#00155F'}
            placeholderTextColor={isDarkMode ? '#d3d8dd' : '#00155F'}
            secureTextEntry={secureTextEntry}
          />
          <View style={{marginTop: 5, marginBottom: 35}}>
            <TouchableOpacity onPress={toggleSecureTextEntry}>
              <Text style={[textColorStyle]}>
                {secureTextEntry ? 'Show' : 'Hide'} password
              </Text>
            </TouchableOpacity>
          </View>
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
              padding: 30,
            }}>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewBody: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
  },
  viewBody: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 30,
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
