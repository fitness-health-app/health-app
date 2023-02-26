import React, {useState} from 'react';
import {View, ScrollView, StyleSheet, useColorScheme} from 'react-native';
import {Button, TextInput, Text} from 'react-native-paper';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {backgroundThemeColor} from '../styles/globalStyles';
import {currentUserState} from '../atoms/users';
import {API_URL} from '../config';

const UpdateUser = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode
      ? backgroundThemeColor.dark
      : backgroundThemeColor.light,
  };
  const currentUser = useRecoilValue(currentUserState);
  const setCurrentUser = useSetRecoilState(currentUserState);

  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({email: null, name: null});

  const storeData = async () => {
    try {
      if (currentUser.name !== null) {
        const name = JSON.stringify(currentUser.name);
        await AsyncStorage.setItem('@name', name);
      }
    } catch (err) {
      console.log('Error in Update: ', err);
    }
    navigation.navigate('Settings');
  };

  const updateAndStoreData = () => {
    if (email.length !== 0 && name.length !== 0) {
      setIsLoading(true);
      fetch(`${API_URL}/api/auth/update`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          email: email,
          name: name,
        }),
      })
        .then(res => {
          return res.json();
        })
        .then(responseData => {
          setData(previousData => ({
            ...previousData,
            name: responseData.name,
          }));
        })
        .then(setIsLoading(false))
        .catch(err => {
          console.log(err.message);
        });

      setCurrentUser(prevData => ({
        ...prevData,
        name: name,
      }));
      storeData();
    }
  };

  return (
    <ScrollView style={[styles.scrollViewBody, backgroundStyle]}>
      <View style={styles.viewHeading}>
        <Text variant="headlineLarge">Update User</Text>
      </View>
      <View style={styles.container}>
        <TextInput
          label="Name"
          value={name}
          onChangeText={text => setName(text)}
          mode="outlined"
          style={styles.input}
        />
      </View>
      <Button
        mode="contained"
        onPress={updateAndStoreData}
        style={styles.button}>
        Update
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewBody: {
    flex: 1,
    padding: 10,
  },
  viewHeading: {
    alignItems: 'center',
    marginTop: 10,
    padding: 25,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    width: '100%',
    marginBottom: 16,
  },
  button: {
    marginTop: 5,
    marginLeft: 15,
    width: '45%',
  },
});

export default UpdateUser;
