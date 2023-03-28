import React from 'react';
import {useColorScheme, StyleSheet, View} from 'react-native';
import {Avatar, Button, Title, Text, Divider} from 'react-native-paper';

import {useRecoilState} from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {backgroundThemeColor, themeTextColor} from '../styles/globalStyles';
import {currentUserState} from '../atoms/users';
import {API_URL} from '../config';

const Settings = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode
      ? backgroundThemeColor.dark
      : backgroundThemeColor.light,
  };
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

  const onPressHandleUpdateUser = () => {
    navigation.navigate('UpdateUser');
  };

  const logoutAndClearStorage = () => {
    const API = `${API_URL}/api/auth/logout`;
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
        await AsyncStorage.removeItem('@name');
        await AsyncStorage.removeItem('@email');
        await AsyncStorage.removeItem('@access_token');
        await AsyncStorage.removeItem('@status');
        await AsyncStorage.removeItem('@message');
        await AsyncStorage.removeItem('@isLoggedIn');
      } catch (err) {
        console.log(err);
      }
    };
    setCurrentUser(prevData => ({
      ...prevData,
      name: '',
      email: '',
      access_token: '',
      status: '',
      message: '',
      isLoggedIn: false,
    }));
    removeValue();
  };
  const initials = currentUser.name
    .split(' ')
    .map(word => word.charAt(0))
    .join('');

  return (
    <View style={[styles.container, backgroundStyle]}>
      <View style={styles.viewHeading}>
        <Text variant="headlineLarge">Settings</Text>
      </View>
      <View style={styles.avatarContainer}>
        <Avatar.Text label={initials} size={64} />
        <Title style={styles.avatarText}>{currentUser.name}</Title>
      </View>
      <Divider />
      <View style={[styles.viewDetailsContainer]}>
        <View style={[styles.viewTextTitle]}>
          <Text variant="titleLarge">Name</Text>
          <Text variant="bodyMedium">{currentUser.name}</Text>
        </View>
        <View style={[styles.viewTextTitle]}>
          <Text variant="titleLarge">Email</Text>
          <Text variant="bodyMedium">{currentUser.email}</Text>
        </View>
        <View style={[styles.viewTextTitle]}>
          <Text variant="titleLarge">ID</Text>
          <Text variant="bodyMedium">{currentUser.id}</Text>
        </View>
      </View>
      <View style={[styles.viewButtonsContainer]}>
        <Button
          mode="contained"
          onPress={onPressHandleUpdateUser}
          style={styles.button}>
          Update
        </Button>
        <Button
          mode="contained"
          onPress={logoutAndClearStorage}
          style={styles.button}>
          Logout
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  viewHeading: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    marginLeft: 16,
  },
  viewTextTitle: {
    marginTop: 15,
  },
  viewButtonsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  viewDetailsContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
  },
  textTitle: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 20,
    width: '45%',
    height: '15%',
  },
});

export default Settings;
