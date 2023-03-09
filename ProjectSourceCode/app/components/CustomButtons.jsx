import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  TouchableHighlight,
} from 'react-native';

const CustomButtons = ({
  buttonText,
  onPressHandleFunction,
  width,
  height,
  customButtonBackgroundColor,
  customButtonTextColor,
}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const customButtonColor = {
    backgroundColor: customButtonBackgroundColor,
  };
  const customTextColor = {
    color: customButtonTextColor,
  };
  const defaultButtonColor = {
    backgroundColor: isDarkMode
      ? styles.backgroundTouchableColor.dark
      : styles.backgroundTouchableColor.light,
  };
  const defaultTextColor = {
    color: isDarkMode ? styles.textColor.dark : styles.textColor.dark,
  };
  const buttonBackgroundColor = customButtonBackgroundColor
    ? customButtonColor
    : defaultButtonColor;
  const textColor = customButtonTextColor ? customTextColor : defaultTextColor;
  return (
    <View>
      <TouchableHighlight onPress={onPressHandleFunction}>
        <View
          style={[
            styles.viewTouchable,
            buttonBackgroundColor,
            {width: width, height: height},
          ]}>
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
