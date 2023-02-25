import React, {useState} from 'react';
import {
  useColorScheme,
  StyleSheet,
  View,
  ScrollView,
  Text,
  Modal,
  // TextInput,
  TouchableOpacity,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';

import CustomTrackingBlock from '../components/CustomTrackingBlock';
import CustomButtons from '../components/CustomButtons';

import {backgroundThemeColor, themeTextColor} from '../styles/globalStyles';

const Log = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const [modalVisible, setModalVisible] = useState(false);
  const [userWeight, setUserWeight] = useState('');

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
      <View style={[styles.viewSectionTitle]}>
        <Text style={[styles.textSectionTitle, titleTextColor]}>Health</Text>
      </View>
      <CustomTrackingBlock
        blockLabel={'Weight'}
        onPressHandleFunction={() => setModalVisible(true)}
      />
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={[styles.modal, backgroundStyle]}>
          <View style={[styles.modalContent, backgroundStyle]}>
            <Text style={[styles.textSectionTitle, titleTextColor]}>
              Add Weight
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignContent: 'center',
                alignItems: 'center',
              }}>
              <TextInput
                label="WEIGHT"
                keyboardType="numeric"
                value={userWeight}
                onChangeText={inputText => setUserWeight(inputText.trimStart())}
                mode="outlined"
                style={{width: '100%', marginVertical: 8, marginTop: 20}}
              />
              <Button
                mode="contained"
                onPress={() => setModalVisible(false)}
                style={{
                  borderRadius: 20,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  marginHorizontal: 16,
                  marginBottom: 20,
                }}>
                Done
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewBody: {
    flex: 1,
    flexDirection: 'column',
    padding: 5,
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
  viewTrackingIcon: {
    borderRadius: 30,
    padding: 6,
    backgroundColor: '#f79700',
    marginEnd: 10,
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
  textInput: {
    width: 200,
    margin: 30,
    padding: 20,
  },
  modal: {
    flex: 1,
    padding: 10,
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
});

export default Log;
