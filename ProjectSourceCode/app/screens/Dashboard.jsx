import React, {useState, useEffect} from 'react';
import {useColorScheme, StyleSheet, View, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRecoilState} from 'recoil';

import {currentUserState} from '../atoms/users';
import {backgroundThemeColor, themeTextColor} from '../styles/globalStyles';

import {API_URL} from '../config';

const Dashboard = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode
      ? backgroundThemeColor.dark
      : backgroundThemeColor.light,
  };
  const textColorStyle = {
    color: isDarkMode ? themeTextColor.light : themeTextColor.dark,
  };
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const [data, setData] = useState({
    id: null,
    name: null,
    email: null,
    role: null,
    provider: null,
    created_at: null,
    updated_at: null,
  });

  useEffect(() => {
    API = `${API_URL}/api/users/me`;
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

  useEffect(() => {
    if (data.id !== null) {
      setCurrentUser(prevData => ({
        ...prevData,
        name: data.name,
        id: data.id,
        email: data.email,
        isLoggedIn: true,
      }));
    }
    const storeData = async () => {
      try {
        if (data.name !== null) {
          const name = JSON.stringify(data.name);
          await AsyncStorage.setItem('@name', name);
        }
      } catch (err) {
        console.log('Error in Login: ', err);
      }
    };
    storeData();
  }, [data]);

  return (
    <View style={[styles.body, backgroundStyle]}>
      <View style={styles.viewHeading}>
        <Text style={[textColorStyle, styles.textTitle]}>Dashboard</Text>
      </View>
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

export default Dashboard;
