import React, {useState, useEffect} from 'react';
import {useColorScheme, View, StyleSheet, ScrollView} from 'react-native';
import {Card, Title, Paragraph, Button} from 'react-native-paper';

import {backgroundThemeColor} from '../styles/globalStyles';
import {WORKOUTS, NUTRITION_DATA} from '../constants';

import DisplayCurrentDate from '../components/DisplayCurrentDate';

const RoutineScreen = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode
      ? backgroundThemeColor.dark
      : backgroundThemeColor.light,
  };

  // Helper function to randomly select a workout type
  const getDailyWorkout = () => {
    const workoutTypes = Object.keys(WORKOUTS);
    const randomIndex = Math.floor(Math.random() * workoutTypes.length);
    return WORKOUTS[workoutTypes[randomIndex]];
  };

  // Helper function to randomly select a meal for each mealtime
  const getDailyMeals = () => {
    return NUTRITION_DATA.map(mealtime => {
      const randomIndex = Math.floor(Math.random() * mealtime.meals.length);
      return {
        time: mealtime.time,
        meal: mealtime.meals[randomIndex],
      };
    });
  };

  const [dailyWorkout, setDailyWorkout] = useState(getDailyWorkout());
  const [dailyMeals, setDailyMeals] = useState(getDailyMeals());

  useEffect(() => {
    setDailyWorkout(getDailyWorkout());
    setDailyMeals(getDailyMeals());
  }, []);

  return (
    <ScrollView style={[styles.container, backgroundStyle]}>
      <View style={{marginTop: 10, marginLeft: 10}}>
        <DisplayCurrentDate />
      </View>
      <View style={styles.cotainer}>
        <View style={styles.section}>
          <Title style={styles.title}>Exercise Routine</Title>
          {dailyWorkout.map((exercise, index) => (
            <Card key={index} style={styles.card}>
              <Card.Content>
                <Title>{exercise.name}</Title>
                <Paragraph>{exercise.reps}</Paragraph>
              </Card.Content>
            </Card>
          ))}
        </View>
        <View style={styles.section}>
          <Title style={styles.title}>Nutrition Plan</Title>
          {dailyMeals.map((nutrition, index) => (
            <Card key={index} style={styles.card}>
              <Card.Content>
                <Title>{nutrition.time}</Title>
                <Paragraph>{nutrition.meal}</Paragraph>
              </Card.Content>
            </Card>
          ))}
          <View
            style={{
              flexDirection: 'row',
              alignContent: 'center',
              justifyContent: 'center',
            }}>
            <Button
              mode="contained"
              onPress={() => navigation.goBack()}
              style={styles.button}>
              Done
            </Button>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cotainer: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  title: {
    marginBottom: 15,
  },
  card: {
    marginBottom: 15,
  },
  button: {
    marginTop: 20,
    marginBottom: 20,
    width: '45%',
    height: '50%',
  },
});

export default RoutineScreen;
