import React from 'react';
import {useColorScheme, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';

const Splash = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode
      ? styles.backgroundThemeColor.dark
      : styles.backgroundThemeColor.light,
  };

  return (
    <View style={[styles.body, backgroundStyle]}>
      <View style={{justifyContent: 'space-around'}}>
        <Text variant="displayLarge">Health App</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundThemeColor: {
    dark: '#1c1e21',
    light: '#f0f0ed',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 40,
  },
});

export default Splash;
