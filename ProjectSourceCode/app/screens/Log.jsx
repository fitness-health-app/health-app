import React from 'react';
import {
  useColorScheme,
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';

import CustomTrackingBlock from '../components/CustomTrackingBlock';
import {backgroundThemeColor, themeTextColor} from '../styles/globalStyles';

const Log = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode
      ? backgroundThemeColor.dark
      : backgroundThemeColor.light,
  };
  const titleTextColor = {
    color: isDarkMode ? themeTextColor.light : themeTextColor.dark,
  };

  const viewBackgroundColor = {
    backgroundColor: isDarkMode
      ? styles.backgroundViewColor.dark
      : styles.backgroundViewColor.light,
  };
  const viewTextColor = {
    color: isDarkMode ? styles.textColor.dark : styles.textColor.dark,
  };

  const onPressHandleNutrition = () => {
    navigation.navigate('TrackNutrition');
  };
  const onPressHandleFitness = () => {
    navigation.navigate('TrackFitness');
  };

  const foodTrackList = [
    {id: 1, label: 'Breakfast'},
    {id: 2, label: 'Morning Snack'},
    {id: 3, label: 'Lunch'},
    {id: 4, label: 'Evening Snack'},
    {id: 5, label: 'Dinner'},
  ];

  return (
    <ScrollView style={[styles.scrollViewBody, backgroundStyle]}>
      <View style={styles.viewHeading}>
        <Text style={[titleTextColor, styles.textTitle]}>Track</Text>
      </View>
      <View style={[styles.viewSectionTitle]}>
        <Text style={[styles.textSectionTitle, titleTextColor]}>Food</Text>
      </View>
      {foodTrackList.map(item => (
        <View key={item.id}>
          <CustomTrackingBlock
            blockLabel={item.label}
            onPressHandleFunction={onPressHandleNutrition}
          />
        </View>
      ))}
      <View style={[styles.viewSectionTitle]}>
        <Text style={[styles.textSectionTitle, titleTextColor]}>Exercise</Text>
      </View>
      <CustomTrackingBlock
        blockLabel={'Workouts'}
        onPressHandleFunction={onPressHandleFitness}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewBody: {
    flex: 1,
    flexDirection: 'column',
  },
  viewHeading: {
    alignItems: 'center',
    marginTop: 10,
  },
  viewSectionTitle: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 30,
    marginLeft: 10,
  },
  textTitle: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  textSectionTitle: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  backgroundViewColor: {
    dark: '#606163',
    light: '#d0d0d0',
  },
  textColor: {
    dark: '#f79700',
    light: '#f0f0ed',
  },
});

export default Log;
