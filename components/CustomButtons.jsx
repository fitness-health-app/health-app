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
      ? styles.backgroundThemeColor.dark
      : styles.backgroundThemeColor.dark,
  };
  const textColor = {
    color: isDarkMode ? styles.textColor.dark : styles.textColor.light,
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
  backgroundThemeColor: {
    dark: '#606163',
    light: '#f0f0ed',
  },
  textColor: {
    dark: '#f79700',
    light: '#f0f0ed',
  },
});

export default CustomButtons;
