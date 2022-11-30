import React, {useState} from 'react';
import {View, Text, StyleSheet, useColorScheme, TextInput} from 'react-native';
import {backgroundThemeColor, themeTextColor} from '../styles/globalStyles';
import CustomButtons from '../components/CustomButtons';

const ContactUs = () => {
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
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    console.log('SUBMIT');
  };

  return (
    <View style={[styles.viewBody, backgroundStyle]}>
      <View style={{alignItems: 'center'}}>
        <Text style={[textColorStyle, styles.textTitle]}>Contact Us</Text>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TextInput
          style={styles.textInput}
          onChangeText={setName}
          value={name}
          placeholder="Name"
          color={isDarkMode ? '#d3d8dd' : '#00155F'}
          underlineColorAndroid="#FFFFFF"
          placeholderTextColor={isDarkMode ? '#d3d8dd' : '#00155F'}
        />
        <TextInput
          style={styles.textInput}
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
          color={isDarkMode ? '#d3d8dd' : '#00155F'}
          underlineColorAndroid="#FFFFFF"
          placeholderTextColor={isDarkMode ? '#d3d8dd' : '#00155F'}
        />
        <TextInput
          style={[styles.textInput, {height: 200}]}
          onChangeText={setMessage}
          value={message}
          placeholder="Your Messsage"
          color={isDarkMode ? '#d3d8dd' : '#00155F'}
          underlineColorAndroid="#FFFFFF"
          multiline={true}
          placeholderTextColor={isDarkMode ? '#d3d8dd' : '#00155F'}
        />
        <View style={[styles.viewButtonSignup]}></View>
        <CustomButtons
          buttonText={'Submit'}
          onPressHandleFunction={handleSubmit}
          width={200}
          height={50}
        />
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
  viewButtonSignup: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: 30,
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
});

export default ContactUs;
