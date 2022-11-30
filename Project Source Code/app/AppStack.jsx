/**
 * Sample React Native AppStack
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {StatusBar, useColorScheme, StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useRecoilState} from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {backgroundThemeColor} from './styles/globalStyles';
import StackNavigator from './navigation/StackNavigator';
import BottomTabNavigation from './navigation/BottomTabNavigation';
import {currentUserState} from './atoms/users';

const Stack = createStackNavigator();

const AppStack = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode
      ? backgroundThemeColor.dark
      : backgroundThemeColor.light,
  };
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const user = await AsyncStorage.getItem('@user');
        const access_token = await AsyncStorage.getItem('@access_token');
        const status = await AsyncStorage.getItem('@status');
        const message = await AsyncStorage.getItem('@message');
        const isLoggedIn = await AsyncStorage.getItem('@isLoggedIn');

        if (
          access_token !== null &&
          user !== null &&
          status !== null &&
          message !== null &&
          isLoggedIn !== null
        ) {
          setCurrentUser({
            name: JSON.parse(user),
            access_token: JSON.parse(access_token),
            status: JSON.parse(status),
            message: JSON.parse(message),
            isLoggedIn: JSON.parse(isLoggedIn),
          });
        }
      } catch (err) {
        console.log('Error in AppStack: ', err);
      }
    };
    getUserData();
  }, []);

  return (
    <View style={[styles.body, backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="StackNavigator">
          {currentUser.isLoggedIn ? (
            <Stack.Group screenOptions={{headerShown: false}}>
              <Stack.Screen
                name="BottomTabNavigation"
                component={BottomTabNavigation}
              />
            </Stack.Group>
          ) : (
            <Stack.Group screenOptions={{headerShown: false}}>
              <Stack.Screen name="StackNavigator" component={StackNavigator} />
            </Stack.Group>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  textSize: {
    fontSize: 40,
  },
});

export default AppStack;
