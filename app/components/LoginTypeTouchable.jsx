import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';

const LoginTypeTouchable = ({loginText, onPressHandle}) => {
  return (
    <View>
      <TouchableHighlight onPress={onPressHandle}>
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
