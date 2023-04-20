import React, {useEffect, useState} from 'react';
import {useColorScheme, StyleSheet, View, ScrollView} from 'react-native';
import {Card, Text, Button, Avatar} from 'react-native-paper';
import {useRecoilState} from 'recoil';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {backgroundThemeColor} from '../styles/globalStyles';
import {TRAINERS} from '../constants';
import {selectedCoachState} from '../atoms/coach';
import {scheduledSessionsState} from '../atoms/schedule';

import DisplayCoachDetails from '../components/DisplayCoachDetails';

const Coach = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode
      ? backgroundThemeColor.dark
      : backgroundThemeColor.light,
  };

  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const [scheduledSessions, setScheduledSessions] = useRecoilState(
    scheduledSessionsState,
  );
  const [coach, setCoach] = useRecoilState(selectedCoachState);

  useEffect(() => {
    setScheduledSessions([
      ...scheduledSessions,
      {coach: coach.name, date: date.toLocaleString()},
    ]);
  }, [date]);

  const handleOnClick = trainer => {
    navigation.navigate('SelectedCoachScreen', {
      name: trainer.name,
      title: trainer.title,
      experience: trainer.experience,
      location: trainer.location,
      description: trainer.description,
      profileImage: trainer.profileImage,
    });
    console.log('Clicked on', trainer.name);
  };

  const handleAccessRoutine = () => {
    navigation.navigate('RoutineScreen');
  };

  const showConfirmationAlert = selectedDate => {
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    }).format(selectedDate);

    const formattedTime = new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(selectedDate);

    Alert.alert(
      'Appointment Scheduled',
      `You have scheduled an appointment with ${name} on:\n\n${formattedDate}\n${formattedTime}`,
      [
        {
          text: 'OK',
          onPress: () => console.log('OK Pressed'),
        },
      ],
      {cancelable: false},
    );
  };

  const onDateChange = selectedDate => {
    setDate(selectedDate);
    showConfirmationAlert(selectedDate);
    setShowModal(false);
  };

  if (coach.length !== 0) {
    return (
      <ScrollView style={[styles.body, backgroundStyle]}>
        <View style={styles.viewHeading}>
          <Text variant="headlineLarge">Your Coach</Text>
          <DisplayCoachDetails
            name={coach[0].name}
            title={coach[0].title}
            experience={coach[0].experience}
            location={coach[0].location}
            description={coach[0].description}
            profileImage={coach[0].profileImage}
          />
          <Button
            mode="contained"
            onPress={handleAccessRoutine}
            style={styles.scheduleButton}>
            Access Routine
          </Button>
          <Button
            mode="contained"
            onPress={() => setShowModal(true)}
            style={styles.scheduleButton}>
            Schedule Session
          </Button>
          <DateTimePickerModal
            isVisible={showModal}
            mode="datetime"
            onConfirm={onDateChange}
            onCancel={() => setShowModal(false)}
          />
        </View>
      </ScrollView>
    );
  } else {
    return (
      <ScrollView style={[styles.body, backgroundStyle]}>
        <View style={styles.viewHeading}>
          <Text variant="headlineLarge">Coach List</Text>
        </View>
        <View style={styles.cotainer}>
          {TRAINERS.map((trainer, index) => (
            <Card key={index} style={styles.card}>
              <Card.Title
                title={trainer.name}
                subtitle={trainer.title}
                left={() => (
                  <Avatar.Image
                    size={48}
                    source={{uri: trainer.profileImage}}
                  />
                )}
              />
              <Card.Content>
                <Text>Experience: {trainer.experience} years</Text>
                <Text>Location: {trainer.location}</Text>
              </Card.Content>
              <Card.Actions>
                <Button mode="contained" onPress={() => handleOnClick(trainer)}>
                  View Profile
                </Button>
              </Card.Actions>
            </Card>
          ))}
        </View>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  cotainer: {
    flex: 1,
  },
  viewHeading: {
    alignItems: 'center',
    padding: 25,
  },
  card: {
    margin: 10,
  },
  scheduleButton: {
    marginTop: 20,
    marginBottom: 20,
  },
});

export default Coach;
