import React, {useEffect, useState} from 'react';
import {
  useColorScheme,
  View,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {Text, Avatar, Button} from 'react-native-paper';
import {useRecoilState} from 'recoil';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {backgroundThemeColor} from '../styles/globalStyles';
import {scheduledSessionsState} from '../atoms/schedule';
import {selectedCoachState} from '../atoms/coach';

const SelectedCoachScreen = ({route, navigation}) => {
  const {name, title, experience, location, description, profileImage} =
    route.params;

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
      {coach: name, date: date.toLocaleString()},
    ]);
  }, [date]);

  const showConfirmationAlert = (selectedDate) => {
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

  const onClickSubscribe = () => {
    setCoach([
      ...coach,
      {
        name: name,
        title: title,
        experience: experience,
        location: location,
        description: description,
        profileImage: profileImage,
      },
    ]);
    navigation.goBack();
  };

  return (
    <ScrollView style={[styles.body, backgroundStyle]}>
      <View style={styles.viewHeading}>
        <Text variant="headlineLarge">Coach</Text>
      </View>
      <View style={styles.header}>
        <Avatar.Image size={96} source={{uri: profileImage}} />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', marginBottom: 10}}>
          <Text variant="titleLarge">Experience: </Text>
          <Text variant="titleMedium">{experience}</Text>
        </View>
        <View style={{flexDirection: 'row', marginBottom: 10}}>
          <Text variant="titleLarge">Location: </Text>
          <Text variant="titleMedium">{location}</Text>
        </View>
        <Text variant="titleLarge">Description: </Text>
        <Text variant="titleMedium" style={{textAlign: 'justify'}}>
          {description}
        </Text>
        <Button
          mode="contained"
          onPress={() => setShowModal(true)}
          style={styles.scheduleButton}>
          Schedule Session
        </Button>
        <Button
          mode="contained"
          onPress={onClickSubscribe}
          style={styles.scheduleButton}>
          Subscribe
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 30,
    marginRight: 30,
  },
  viewHeading: {
    alignItems: 'center',
    padding: 25,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginTop: 5,
  },
  scheduleButton: {
    marginTop: 20,
    marginBottom: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalView: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
});

export default SelectedCoachScreen;
