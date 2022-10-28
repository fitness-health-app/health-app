import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  TouchableHighlight,
} from 'react-native';

const HomePage = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode
      ? styles.backgroundColorTheme.dark
      : styles.backgroundColorTheme.light,
  };
  const textColorStyle = {
    color: isDarkMode ? styles.textColor.light : styles.textColor.dark,
  };
  const containerBackgroundStyle = {
    backgroundColor: isDarkMode
      ? styles.containerIntroColor.dark
      : styles.containerIntroColor.light,
  };
  const containerTextColor = {
    color: isDarkMode
      ? styles.containerIntroColor.light
      : styles.textColor.light,
  };
  const buttonBackgroundColor = {
    backgroundColor: isDarkMode ? '#DDDDDD' : styles.backgroundColorTheme.dark,
  };
  return (
    <View style={[styles.viewBody, backgroundStyle]}>
      <View style={styles.viewLoginRow}>
        <Text style={styles.textLogin}>Coach?</Text>
        <Text style={styles.textLogin}>User?</Text>
      </View>
      <View style={styles.viewTitleRow}>
        <Text style={[textColorStyle, styles.textTitle]}>Health App</Text>
      </View>
      <View style={[styles.containerIntro, containerBackgroundStyle]}>
        <View style={styles.viewTextTitle}>
          <Text style={[styles.textTitle, containerTextColor]}>
            Start Your Daily Workout Now!
          </Text>
        </View>
        <View style={styles.viewTextDescription}>
          <Text style={[styles.textDescription, containerBackgroundStyle]}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sapien,
            elit mauris, leo in
          </Text>
        </View>
      </View>
      <View style={[styles.containerOtherLinks, containerBackgroundStyle]}>
        <View style={[styles.viewButtons]}>
          <TouchableHighlight
            activeOpacity={0.6}
            onPress={() => alert('About Pressed')}>
            <View style={[styles.viewTouchable, buttonBackgroundColor]}>
              <Text style={[styles.textTouchable, containerTextColor]}>
                About
              </Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            activeOpacity={0.6}
            onPress={() => alert('Contact Us Pressed')}>
            <View style={[styles.viewTouchable, buttonBackgroundColor]}>
              <Text style={[styles.textTouchable, containerTextColor]}>
                Contact Us
              </Text>
            </View>
          </TouchableHighlight>
        </View>
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
  viewLoginRow: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    padding: 5,
  },
  viewTitleRow: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  containerIntro: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    margin: 40,
  },
  containerOtherLinks: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    margin: 40,
  },
  viewButtons: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: 30,
  },
  viewTouchable: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    padding: 10,
    width: 180,
  },
  viewTextTitle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewTextDescription: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 40,
  },
  textLogin: {
    color: '#FF6C87',
    fontSize: 18,
  },
  textTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    padding: 2,
  },
  textDescription: {
    fontSize: 20,
    padding: 3,
    justifyContent: 'center',
  },
  textTouchable: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  textColor: {
    dark: '#000000',
    light: '#FFFFFF',
  },
  backgroundColorTheme: {
    dark: '#00155F',
    light: '#f0f0ed',
  },
  containerIntroColor: {
    dark: '#5C6DFF',
    light: '#f79700',
  },
});

export default HomePage;
