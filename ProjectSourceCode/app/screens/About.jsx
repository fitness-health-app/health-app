import React from 'react';
import {ScrollView, useColorScheme, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';

import {backgroundThemeColor, themeTextColor} from '../styles/globalStyles';

const About = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode
      ? backgroundThemeColor.dark
      : backgroundThemeColor.light,
  };
  const textColorStyle = {
    color: isDarkMode ? themeTextColor.light : themeTextColor.dark,
  };
  return (
    <ScrollView style={[styles.body, backgroundStyle]}>
      <View style={styles.viewHeading}>
        <Text variant="headlineLarge">About</Text>
      </View>
      <View style={styles.viewDescription}>
        <Text variant="bodyMedium">
          A digital health and wellness application with services such as
          calorie tracking and advice on nutrition and fitness. It is available
          on the Android and iOS platforms, and can be used with wearable
          technology such as activity trackers.
          {'\n\n'}
          Tell us what you want to acheive and receive personalized goals. Learn
          about the foods you’re eating and keep your calories within your daily
          budget. Reach your goals and continue to set new ones for a happier,
          healthier you! {'\n\n'}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Viverra
          nam libero justo laoreet. Pellentesque eu tincidunt tortor aliquam
          nulla facilisi cras fermentum odio. Senectus et netus et malesuada
          fames ac turpis egestas sed. Mattis enim ut tellus elementum sagittis
          vitae. Ut porttitor leo a diam sollicitudin tempor id eu. Pretium quam
          vulputate dignissim suspendisse in. Neque laoreet suspendisse interdum
          consectetur libero id faucibus nisl. Pellentesque massa placerat duis
          ultricies lacus. Ac turpis egestas sed tempus urna et pharetra
          pharetra massa. Non sodales neque sodales ut etiam sit.
          {'\n\n'}
          Scelerisque eu ultrices vitae auctor eu augue ut lectus arcu. Praesent
          semper feugiat nibh sed pulvinar proin. Ornare quam viverra orci
          sagittis eu volutpat. Ut sem nulla pharetra diam sit amet nisl
          suscipit. Viverra tellus in hac habitasse platea dictumst vestibulum
          rhoncus est. Eleifend quam adipiscing vitae proin. Diam sit amet nisl
          suscipit adipiscing bibendum est. Cursus risus at ultrices mi tempus
          imperdiet nulla. Egestas purus viverra accumsan in. Amet mauris
          commodo quis imperdiet massa tincidunt nunc pulvinar. Urna nunc id
          cursus metus aliquam eleifend mi in. Aliquam faucibus purus in massa
          tempor. At quis risus sed vulputate. Eros in cursus turpis massa
          tincidunt dui ut ornare. Scelerisque fermentum dui faucibus in ornare.
          {'\n\n'}
          Tortor dignissim convallis aenean et. Quis lectus nulla at volutpat
          diam ut venenatis. Porttitor eget dolor morbi non arcu risus. Feugiat
          nisl pretium fusce id. Nibh nisl condimentum id venenatis a. Urna duis
          convallis convallis tellus id interdum. Nec ultrices dui sapien eget
          mi. Risus viverra adipiscing at in tellus integer feugiat. Quis enim
          lobortis scelerisque fermentum dui. Mattis nunc sed blandit libero
          volutpat sed. Sit amet massa vitae tortor condimentum lacinia. Gravida
          in fermentum et sollicitudin ac orci phasellus egestas. Bibendum at
          varius vel pharetra vel turpis nunc eget. Condimentum lacinia quis vel
          eros. Tortor posuere ac ut consequat. Duis convallis convallis tellus
          id interdum velit laoreet. Semper auctor neque vitae tempus quam
          pellentesque. Bibendum arcu vitae elementum curabitur vitae nunc sed.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  textTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    padding: 2,
  },
  viewDescription: {
    padding: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  viewHeading: {
    alignItems: 'center',
    padding: 25,
  },
  textDescription: {
    fontSize: 20,
    fontWeight: 'regular',
    textAlign: 'justify',
  },
});

export default About;
