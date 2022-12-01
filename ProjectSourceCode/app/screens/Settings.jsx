import React, {useState, useEffect} from 'react';
import {useColorScheme, StyleSheet, View, Text} from 'react-native';
import {useRecoilState} from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {backgroundThemeColor, themeTextColor} from '../styles/globalStyles';
import {currentUserState} from '../atoms/users';
import CustomButtons from '../components/CustomButtons';

const Settings = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode
      ? backgroundThemeColor.dark
      : backgroundThemeColor.light,
  };
  const textColorStyle = {
    color: isDarkMode ? themeTextColor.light : themeTextColor.dark,
  };
  const secondaryTextColorStyle = {
    color: isDarkMode ? themeTextColor.light : '#757575',
  };
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

  const onPressHandleUpdateUser = () => {
    navigation.navigate('UpdateUser');
  };

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

  return (
    <View style={[styles.body, backgroundStyle]}>
      <View style={styles.viewHeading}>
        <Text style={[textColorStyle, styles.textTitle]}>Settings</Text>
      </View>
      <View
        style={{
          flexDirection: 'column',
          paddingTop: 5,
          paddingLeft: 15,
        }}>
        <View style={{padding: 10}}>
          <FontAwesome5 name="user-circle" size={80} />
        </View>
        <View
          style={{
            padding: 5,
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <View style={[styles.viewTextAlignment]}>
          <View>
            <Text style={[secondaryTextColorStyle]}>Name</Text>
            <Text style={[textColorStyle]}>{currentUser.name}</Text>
          </View>
          <View style={[styles.viewTextAlignment]}>
            <Text style={[secondaryTextColorStyle]}>Email</Text>
            <Text style={[textColorStyle]}>{currentUser.email}</Text>
          </View>
          <View style={[styles.viewTextAlignment]}>
            <Text style={[secondaryTextColorStyle]}>ID</Text>
            <Text style={[textColorStyle]}>{currentUser.id}</Text>
          </View>
          <View style={[styles.viewTextAlignment]}>
            <CustomButtons
              buttonText={'Update'}
              onPressHandleFunction={onPressHandleUpdateUser}
              width={200}
              height={50}
            />
          </View>
          <View style={[styles.viewTextAlignment]}>
            <CustomButtons
              buttonText={'Logout'}
              onPressHandleFunction={logoutAndClearStorage}
              width={200}
              height={50}
            />
          </View>
        </View>
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
  viewTextAlignment: {
    paddingTop: 25,
    justifyContent: 'space-evenly',
  },
});

export default Settings;
