import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  TouchableHighlight,
} from 'react-native';

const LoginTypeTouchable = ({loginText}) => {
  const onPressHandlerLogin = () => {
    console.log('Login');
  };
  return (
    <View>
      <TouchableHighlight onPress={onPressHandlerLogin}>
        <Text style={styles.textLogin}>{loginText}</Text>
      </TouchableHighlight>
    </View>
  );
};
const styles = StyleSheet.create({
  textLogin: {
    color: '#FF6C87',
    fontSize: 18,
  },
});
export default LoginTypeTouchable;
