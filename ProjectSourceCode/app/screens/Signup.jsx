import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import {backgroundThemeColor, themeTextColor} from '../styles/globalStyles';
import CustomButtons from '../components/CustomButtons';
import {
  validateName,
  validateEmail,
  validateSignupPassword,
  invalidSignup,
  successValidation,
} from '../utils/validations';
import {API_URL} from '../config';
import {ScrollView} from 'react-native-gesture-handler';

const Signup = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode
      ? backgroundThemeColor.dark
      : backgroundThemeColor.light,
  };
  const textColorStyle = {
    color: isDarkMode ? themeTextColor.light : themeTextColor.dark,
  };

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [data, setData] = useState(null);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const loginAndStoreData = () => {
    if (
      validateName(name) &&
      validateEmail(email) &&
      validateSignupPassword(password, passwordConfirm)
    ) {
      fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          name: name,
          password: password,
          passwordConfirm: passwordConfirm,
        }),
      })
        .then(response => {
          if (!response.ok) throw new Error(response.status);
          else return response.json();
        })
        .then(res => {
          setData(res);
        })
        .then(() => {
          successValidation();
          navigation.navigate('Login');
        })
        .catch(err => {
          invalidSignup();
          console.log(err.message);
        });
    }
  };

  const onPressHandlerLogin = () => {
    navigation.navigate('Login');
  };
  const toggleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <ScrollView style={[styles.scrollViewBody, backgroundStyle]}>
      <View style={[styles.viewBody]}>
        <View style={styles.viewTitleRow}>
          <Text style={[textColorStyle, styles.textTitle]}>Sign Up</Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <TextInput
            style={styles.textInput}
            onChangeText={inputText => setName(inputText.trimStart())}
            value={name}
            maxLength={15}
            placeholder="NAME"
            color={isDarkMode ? '#d3d8dd' : '#00155F'}
            underlineColorAndroid={isDarkMode ? '#FFFFFF' : '#00155F'}
            placeholderTextColor={isDarkMode ? '#d3d8dd' : '#00155F'}
          />
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
            maxLength={15}
            placeholder="PASSWORD"
            color={isDarkMode ? '#d3d8dd' : '#00155F'}
            underlineColorAndroid={isDarkMode ? '#FFFFFF' : '#00155F'}
            placeholderTextColor={isDarkMode ? '#d3d8dd' : '#00155F'}
            secureTextEntry={secureTextEntry}
          />
          <TextInput
            style={styles.textInput}
            onChangeText={inputText => setPasswordConfirm(inputText.trim())}
            value={passwordConfirm}
            maxLength={15}
            placeholder="CONFIRM PASSWORD"
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
            buttonText={'Sign Up'}
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
              padding: 20,
            }}>
            <TouchableHighlight
              onPress={onPressHandlerLogin}
              underlayColor={isDarkMode ? '#606163' : '#E8E8E8'}>
              <Text style={[styles.textAlternateLogin, {color: '#f79700'}]}>
                Already have an account? Sign In!
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

export default Signup;
