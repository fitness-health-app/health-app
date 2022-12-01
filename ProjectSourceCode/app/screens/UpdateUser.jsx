import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {backgroundThemeColor, themeTextColor} from '../styles/globalStyles';
import CustomButtons from '../components/CustomButtons';
import {currentUserState} from '../atoms/users';

const UpdateUser = ({navigation}) => {
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
      fetch('http://ec2-54-210-125-9.compute-1.amazonaws.com/api/auth/update', {
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
    <View style={[styles.viewBody, backgroundStyle]}>
      <View style={styles.viewTitleRow}>
        <Text style={[textColorStyle, styles.textTitle]}>Update User</Text>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View>
          <Text style={[secondaryTextColorStyle]}>Name</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={setName}
            value={name}
            placeholder="NAME"
            color={isDarkMode ? '#d3d8dd' : '#00155F'}
            underlineColorAndroid={isDarkMode ? '#FFFFFF' : '#00155F'}
            placeholderTextColor={isDarkMode ? '#d3d8dd' : '#00155F'}
          />
        </View>
      </View>
      <View style={{flex: 2}}>
        <CustomButtons
          buttonText={'Submit'}
          onPressHandleFunction={updateAndStoreData}
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

export default UpdateUser;
