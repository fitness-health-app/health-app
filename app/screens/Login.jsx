import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  TextInput,
  TouchableHighlight,
  Alert,
} from 'react-native';
import {useRecoilState} from 'recoil';
import {backgroundThemeColor, themeTextColor} from '../styles/globalStyles';
import CustomButtons from '../components/CustomButtons';
import {currentUserState} from '../atoms/users';

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

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

  const loginAndStoreData = () => {
    if (user.length !== 0 && password.length !== 0) {
      setCurrentUser({name: user, isLoggedIn: true});
    }
  };

  const onPressHandlerSignup = () => {
    navigation.navigate('Signup');
  };
  const onPressHandlerGoogle = () => {
    console.log('Login with Google');
  };

  return (
    <View style={[styles.viewBody, backgroundStyle]}>
      <View style={styles.viewTitleRow}>
        <Text style={[textColorStyle, styles.textTitle]}>LOGIN</Text>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TextInput
          style={styles.textInput}
          onChangeText={setUser}
          value={user}
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
          <View style={{padding: 5}}>
            <Text style={[textColorStyle]}>-or-</Text>
          </View>
          <TouchableHighlight
            onPress={onPressHandlerGoogle}
            underlayColor={isDarkMode ? '#606163' : '#E8E8E8'}>
            <Text style={{color: '#FF0000', fontSize: 16, fontWeight: 'bold'}}>
              Google+
            </Text>
          </TouchableHighlight>
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
