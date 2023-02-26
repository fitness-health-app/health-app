import React, {useState} from 'react';
import {ScrollView, View, StyleSheet, useColorScheme} from 'react-native';
import {Button, Card, TextInput, Text} from 'react-native-paper';

import {backgroundThemeColor} from '../styles/globalStyles';

const ContactUs = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode
      ? backgroundThemeColor.dark
      : backgroundThemeColor.light,
  };

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    console.log('SUBMIT');
  };

  return (
    <ScrollView style={[styles.viewBody, backgroundStyle]}>
      <View style={styles.viewHeading}>
        <Text variant="headlineLarge">Contact Us</Text>
      </View>
      <View style={[styles.container]}>
        <Card style={styles.card}>
          <Card.Content>
            <TextInput
              label="Name"
              value={name}
              onChangeText={text => setName(text)}
              style={styles.input}
            />
            <TextInput
              label="Email"
              value={email}
              onChangeText={text => setEmail(text)}
              style={styles.input}
            />
            <TextInput
              label="Message"
              value={message}
              onChangeText={text => setMessage(text)}
              multiline
              style={styles.input}
            />
            <Button
              mode="contained"
              onPress={handleSubmit}
              style={styles.button}>
              Send
            </Button>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
  },
  viewHeading: {
    alignItems: 'center',
    marginTop: 10,
    padding: 25,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  card: {
    width: '100%',
    maxWidth: 500,
  },
  input: {
    marginVertical: 8,
  },
  button: {
    marginTop: 25,
  },
});

export default ContactUs;
