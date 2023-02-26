import React from 'react';
import {View, StyleSheet, useColorScheme, Image} from 'react-native';
import { Button, Text} from 'react-native-paper';

import LoginTypeTouchable from '../components/LoginTypeTouchable';
import {backgroundThemeColor} from '../styles/globalStyles';

const HomePage = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode
      ? backgroundThemeColor.dark
      : backgroundThemeColor.light,
  };
  const textColorStyle = {
    color: isDarkMode ? styles.textColor.light : styles.textColor.dark,
  };
  const onPressHandlerAbout = () => {
    navigation.navigate('About');
  };

  const onPressHandlerContactUs = () => {
    navigation.navigate('ContactUs');
  };

  const onPressHandleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={[styles.viewBody, backgroundStyle]}>
      <View style={styles.viewLoginRow}>
        <LoginTypeTouchable
          loginText={'Coach?'}
          onPressHandle={onPressHandleLogin}
        />
        <LoginTypeTouchable
          loginText={'User?'}
          onPressHandle={onPressHandleLogin}
        />
      </View>
      <View style={styles.viewTitleRow}>
        <Text style={[textColorStyle, styles.textTitle]}>Health App</Text>
      </View>
      <View style={styles.containerIntro}>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-around',
          }}>
          <View>
            <View style={styles.viewDescription}>
              <Image
                source={require('../assests/images/nutrition.png')}
                style={{width: 50, height: 40}}
              />
              <Text style={[styles.textImageDescription, textColorStyle]}>
                Track what you eat
              </Text>
            </View>
          </View>
          <View>
            <View style={styles.viewDescription}>
              <Image
                source={require('../assests/images/exercise.png')}
                style={{width: 80, height: 40}}
              />
              <Text style={[styles.textImageDescription, textColorStyle]}>
                Track what your exercises
              </Text>
            </View>
          </View>
          <View>
            <View style={[styles.viewDescription]}>
              <Image
                source={require('../assests/images/chart.png')}
                style={{width: 60, height: 60}}
              />
              <Text style={[styles.textImageDescription, textColorStyle]}>
                Track & follow a calorie budget
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={[styles.containerOtherLinks]}>
        <View style={[styles.viewButtons]}>
          <Button
            icon="information"
            mode="elevated"
            style={styles.buttonSize}
            labelStyle={{fontSize: 18}}
            onPress={onPressHandlerAbout}>
            About Us
          </Button>
          <Button
            icon="contacts"
            mode="elevated"
            style={styles.buttonSize}
            labelStyle={{fontSize: 18}}
            onPress={onPressHandlerContactUs}>
            Contact Us
          </Button>
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
  viewLoginRow: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    padding: 5,
  },
  viewTitleRow: {
    flex: 2,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  containerIntro: {
    flex: 3,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 30,
  },
  containerOtherLinks: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewButtons: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: 30,
  },
  viewDescription: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  buttonSize: {
    height: 60,
    width: 200,
    borderRadius: 30,
    padding: 10,
  },
  textImageDescription: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  textLogin: {
    color: '#FF6C87',
    fontSize: 18,
  },
  textTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    padding: 2,
  },
  textColor: {
    dark: '#000000',
    light: '#FFFFFF',
  },
  backgroundThemeColor: {
    dark: '#1c1e21',
    light: '#f0f0ed',
  },
  containerIntroColor: {
    dark: '#323437',
    light: '#f79700',
  },
});

export default HomePage;
