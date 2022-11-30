import React, {useState, useEffect} from 'react';
import {useColorScheme, StyleSheet, View, Text} from 'react-native';
import {useRecoilState} from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {backgroundThemeColor, themeTextColor} from '../styles/globalStyles';
import {currentUserState} from '../atoms/users';
import CustomButtons from '../components/CustomButtons';

const Settings = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode
      ? backgroundThemeColor.dark
      : backgroundThemeColor.light,
  };
  const textColorStyle = {
    color: isDarkMode ? themeTextColor.light : themeTextColor.dark,
  };
  const [data, setData] = useState({
    id: null,
    name: null,
    email: null,
    role: null,
    provider: null,
    created_at: null,
    updated_at: null,
  });
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

  useEffect(() => {
    API = 'http://ec2-54-210-125-9.compute-1.amazonaws.com/api/users/me';
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${currentUser.access_token}`,
      },
    };
    fetch(API, options)
      .then(res => {
        return res.json();
      })
      .then(responseData => {
        setData(previousData => ({
          ...previousData,
          id: responseData.data.user.id,
          name: responseData.data.user.name,
          email: responseData.data.user.email,
          role: responseData.data.user.role,
          provider: responseData.data.user.provider,
          created_at: responseData.data.user.created_at,
          updated_at: responseData.data.user.updated_at,
        }));
      })
      .catch(err => {
        console.log(err.message);
      });
  }, []);

  const logoutAndClearStorage = () => {
    API = 'http://ec2-54-210-125-9.compute-1.amazonaws.com/api/auth/logout';
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${currentUser.access_token}`,
      },
    };
    fetch(API, options)
      .then(res => {
        return res.json();
      })
      .catch(err => {
        console.log(err.message);
      });
    const removeValue = async () => {
      try {
        await AsyncStorage.removeItem('@user');
        await AsyncStorage.removeItem('@access_token');
        await AsyncStorage.removeItem('@status');
        await AsyncStorage.removeItem('@message');
        await AsyncStorage.removeItem('@isLoggedIn');
      } catch (err) {
        console.log(err);
      }
    };
    setCurrentUser({
      name: '',
      access_token: '',
      status: '',
      message: '',
      isLoggedIn: false,
    });
    removeValue();
  };

  return (
    <View style={[styles.body, backgroundStyle]}>
      <View style={styles.viewHeading}>
        <Text style={[textColorStyle, styles.textTitle]}>Settings</Text>
      </View>
      <Text>ID: {data.id}</Text>
      <Text>Name: {data.name}</Text>
      <Text>Email: {data.email}</Text>
      <Text>Role: {data.role}</Text>
      <Text>Provider: {data.provider}</Text>
      <CustomButtons
        buttonText={'Logout'}
        onPressHandleFunction={logoutAndClearStorage}
        width={200}
        height={50}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  viewHeading: {
    alignItems: 'center',
    padding: 25,
  },
  textTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    padding: 2,
  },
});

export default Settings;
