import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  TouchableHighlight,
} from 'react-native';

const CustomButtons = ({buttonText, onPressHandleFunction}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const buttonBackgroundColor = {
    backgroundColor: isDarkMode
      ? styles.backgroundTouchableColor.dark
      : styles.backgroundTouchableColor.light,
  };
  const textColor = {
    color: isDarkMode ? styles.textColor.dark : styles.textColor.dark,
  };
  return (
    <View>
      <TouchableHighlight activeOpacity={0.6} onPress={onPressHandleFunction}>
        <View style={[styles.viewTouchable, buttonBackgroundColor]}>
          <Text style={[styles.textTouchable, textColor]}>{buttonText}</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  viewTouchable: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 10,
    width: 350,
    height: 50,
  },
  textTouchable: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  backgroundTouchableColor: {
    dark: '#606163',
    light: '#d0d0d0',
  },
  textColor: {
    dark: '#f79700',
    light: '#f0f0ed',
  },
});

export default CustomButtons;
