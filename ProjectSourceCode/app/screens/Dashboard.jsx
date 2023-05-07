import React, {useState, useEffect} from 'react';
import {useColorScheme, StyleSheet, View, Dimensions} from 'react-native';
import {Text, Divider, List} from 'react-native-paper';
import {PieChart, BarChart, ProgressChart} from 'react-native-chart-kit';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRecoilState, useRecoilValue} from 'recoil';

import DisplayCurrentDate from '../components/DisplayCurrentDate';

import {currentUserState} from '../atoms/users';
import {totalFoodMacro} from '../atoms/food';
import {totalExericesCalBurnt} from '../atoms/exercise';
import {scheduledSessionsState} from '../atoms/schedule';
import {selectedCoachState} from '../atoms/coach';
import {userGoalsState} from '../atoms/userGoals';

import {backgroundThemeColor} from '../styles/globalStyles';
import {EXERCISE_DATA} from '../constants';

import {API_URL} from '../config';
import {ScrollView} from 'react-native-gesture-handler';

const Dashboard = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode
      ? backgroundThemeColor.dark
      : backgroundThemeColor.light,
  };

  const [data, setData] = useState({
    id: null,
    name: null,
    email: null,
    role: null,
    provider: null,
    created_at: null,
    updated_at: null,
  });
  const [exerciseData, setExerciseData] = useState(EXERCISE_DATA);

  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const currentFoodMacro = useRecoilValue(totalFoodMacro);
  const currentExericesCalBurnt = useRecoilValue(totalExericesCalBurnt);
  const coach = useRecoilValue(selectedCoachState);
  const scheduledSessions = useRecoilValue(scheduledSessionsState);
  const userGoals = useRecoilValue(userGoalsState);

  useEffect(() => {
    const API = `${API_URL}/api/users/me`;
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${currentUser.access_token}`,
      },
    };
    fetch(API, options)
      .then(res => {
        return res.json();
      })
      .then(responseData => {
        setData(previousData => ({
          ...previousData,
          id: responseData.data.user.id,
          name: responseData.data.user.name,
          email: responseData.data.user.email,
          role: responseData.data.user.role,
          provider: responseData.data.user.provider,
          created_at: responseData.data.user.created_at,
          updated_at: responseData.data.user.updated_at,
        }));
      })
      .catch(err => {
        console.log(err.message);
      });
    if (
      currentExericesCalBurnt &&
      currentExericesCalBurnt.caloriesBurned !== 0 &&
      exerciseData.length === 7
    ) {
      const updatedExercises = [
        ...exerciseData.pop(),
        currentExericesCalBurnt.caloriesBurned,
      ];
      setExerciseData(updatedExercises);
    } else {
      setExerciseData([...exerciseData, 0]);
    }
  }, []);

  useEffect(() => {
    if (data.id !== null) {
      setCurrentUser(prevData => ({
        ...prevData,
        name: data.name,
        id: data.id,
        email: data.email,
        isLoggedIn: true,
      }));
    }
    const storeData = async () => {
      try {
        if (data.name !== null) {
          const name = JSON.stringify(data.name);
          await AsyncStorage.setItem('@name', name);
        }
      } catch (err) {
        console.log('Error in Login: ', err);
      }
    };
    storeData();
  }, [data]);
  return (
    <ScrollView style={[styles.body, backgroundStyle]}>
      <View style={styles.viewHeading}>
        <Text variant="headlineLarge">Dashboard</Text>
      </View>
      <DisplayCurrentDate />

      <List.Section>
        <List.Subheader style={styles.subheader}>Nutrition</List.Subheader>
        {currentFoodMacro && (
          <>
            <View style={styles.dataContainer}>
              <View style={styles.dataItem}>
                <MaterialCommunityIcons
                  name="silverware-fork-knife"
                  size={30}
                  color={isDarkMode ? '#FFFFFF' : '#121212'}
                />
                <Text variant="titleLarge">Calories</Text>
                <Text variant="titleMedium">
                  {currentFoodMacro.Calories ? currentFoodMacro.Calories : 0}
                </Text>
              </View>
            </View>
            <ProgressChart
              data={{
                labels: ['g Protein', 'g Carbs', 'g Fat'],
                data: [
                  currentFoodMacro.Protein
                    ? currentFoodMacro.Protein / userGoals.dailyProtein
                    : 0,
                  currentFoodMacro.Carbohydrate
                    ? currentFoodMacro.Carbohydrate / userGoals.dailyCarbs
                    : 0,
                  currentFoodMacro.Fat
                    ? currentFoodMacro.Fat / userGoals.dailyFat
                    : 0,
                ],
              }}
              width={Dimensions.get('window').width - 16}
              height={220}
              strokeWidth={16}
              radius={32}
              chartConfig={{
                backgroundColor: isDarkMode ? '#1c1e21' : '#fff',
                backgroundGradientFrom: isDarkMode ? '#1c1e21' : '#fff',
                backgroundGradientTo: isDarkMode ? '#1c1e21' : '#fff',
                color: (opacity = 1) =>
                  isDarkMode
                    ? `rgba(26, 255, 146, ${opacity})`
                    : `rgba(26, 255, 146, ${opacity})`,
                labelColor: (opacity = 1) =>
                  isDarkMode
                    ? `rgba(255, 255, 255, ${opacity})`
                    : `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              hideLegend={false}
            />
          </>
        )}
      </List.Section>

      <Divider />

      <List.Section>
        <List.Subheader style={styles.subheader}>Workout</List.Subheader>
        {currentExericesCalBurnt && (
          <>
            <View style={styles.dataContainer}>
              <View style={styles.dataItem}>
                <MaterialCommunityIcons
                  name="fire"
                  size={30}
                  color={isDarkMode ? '#FFFFFF' : '#121212'}
                />
                <Text variant="titleLarge">Calories Burned</Text>
                <Text variant="titleMedium">
                  {currentExericesCalBurnt.caloriesBurned
                    ? currentExericesCalBurnt.caloriesBurned
                    : 0}
                </Text>
              </View>
            </View>
            <BarChart
              data={{
                labels: [
                  'Day 1',
                  'Day 2',
                  'Day 3',
                  'Day 4',
                  'Day 5',
                  'Day 6',
                  'Day 7',
                ],
                datasets: [
                  {
                    data: exerciseData,
                  },
                ],
              }}
              width={Dimensions.get('window').width - 16}
              height={220}
              chartConfig={{
                backgroundColor: isDarkMode ? '#121212' : '#fff',
                backgroundGradientFrom: isDarkMode ? '#121212' : '#fff',
                backgroundGradientTo: isDarkMode ? '#121212' : '#fff',
                color: (opacity = 1) =>
                  isDarkMode
                    ? `rgba(255, 255, 255, ${opacity})`
                    : `rgba(0, 0, 0, ${opacity})`,
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </>
        )}
      </List.Section>

      <Divider />

      <List.Section>
        <List.Subheader style={styles.subheader}>User Goals</List.Subheader>
        <View style={styles.dataContainer}>
          <View style={styles.dataItem}>
            <MaterialCommunityIcons
              name="target"
              size={30}
              color={isDarkMode ? '#FFFFFF' : '#121212'}
            />
            <Text variant="titleLarge">Calories</Text>
            <Text variant="titleMedium">{userGoals.dailyCalories}</Text>
          </View>
          <View style={styles.dataItem}>
            <MaterialCommunityIcons
              name="target"
              size={30}
              color={isDarkMode ? '#FFFFFF' : '#121212'}
            />
            <Text variant="titleLarge">Protein</Text>
            <Text variant="titleMedium">{userGoals.dailyProtein}</Text>
          </View>
          <View style={styles.dataItem}>
            <MaterialCommunityIcons
              name="target"
              size={30}
              color={isDarkMode ? '#FFFFFF' : '#121212'}
            />
            <Text variant="titleLarge">Carbs</Text>
            <Text variant="titleMedium">{userGoals.dailyCarbs}</Text>
          </View>
          <View style={styles.dataItem}>
            <MaterialCommunityIcons
              name="target"
              size={30}
              color={isDarkMode ? '#FFFFFF' : '#121212'}
            />
            <Text variant="titleLarge">Fat</Text>
            <Text variant="titleMedium">{userGoals.dailyFat}</Text>
          </View>
        </View>
      </List.Section>

      <Divider />

      <List.Section>
        <List.Subheader style={styles.subheader}>Summary</List.Subheader>
        {currentExericesCalBurnt && currentFoodMacro && (
          <View style={styles.dataContainer}>
            <View style={styles.dataItem}>
              <MaterialCommunityIcons
                name="chart-timeline-variant"
                size={30}
                color={isDarkMode ? '#FFFFFF' : '#121212'}
              />
              <Text variant="titleLarge">Total Calories</Text>
              <Text variant="titleMedium">
                {Math.round(
                  currentFoodMacro.Calories ? currentFoodMacro.Calories : 0,
                ) -
                  (currentExericesCalBurnt.caloriesBurned
                    ? currentExericesCalBurnt.caloriesBurned
                    : 0)}
              </Text>
            </View>
          </View>
        )}
      </List.Section>

      <Divider />
      {coach && coach.length !== 0 && (
        <List.Section>
          <List.Subheader style={styles.subheader}>Coach</List.Subheader>
          <View style={styles.dataContainer}>
            <View style={styles.dataItem}>
              <MaterialCommunityIcons
                name="account-tie"
                size={30}
                color={isDarkMode ? '#FFFFFF' : '#121212'}
              />
              <Text variant="titleLarge">Your Coach</Text>
              <Text variant="titleMedium">{coach[0].name}</Text>
            </View>
          </View>
        </List.Section>
      )}

      <Divider />

      {scheduledSessions &&
        scheduledSessions.length !== 0 &&
        scheduledSessions[scheduledSessions.length - 1].date && (
          <List.Section>
            <List.Subheader style={styles.subheader}>
              Next Appointment
            </List.Subheader>
            <View style={styles.dataContainer}>
              <View style={styles.dataItem}>
                <MaterialCommunityIcons
                  name="calendar"
                  size={30}
                  color={isDarkMode ? '#FFFFFF' : '#121212'}
                />
                <Text variant="titleLarge">Date</Text>
                <Text variant="titleMedium">
                  {scheduledSessions[scheduledSessions.length - 1].date}
                </Text>
              </View>
            </View>
          </List.Section>
        )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  viewHeading: {
    alignItems: 'center',
    padding: 25,
  },
  subheader: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 2,
  },
  dataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
    flexWrap: 'wrap', // Add this line
  },
  dataItem: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default Dashboard;
