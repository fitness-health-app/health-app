import React, {useEffect, useState} from 'react';
import {
  useColorScheme,
  StyleSheet,
  View,
  FlatList,
  Modal,
  Image,
} from 'react-native';
import {Text, Searchbar, Button, Card, IconButton} from 'react-native-paper';
import {useRecoilState, useRecoilValue} from 'recoil';

import {currentUserState} from '../atoms/users';
import {totalFoodMacro} from '../atoms/food';
import {API_URL} from '../config';

import {backgroundThemeColor} from '../styles/globalStyles';
import {EXERCISE_DATA} from '../utils/constants';
import {toTitleCase} from '../utils/utils';

const AddExercise = ({visible, closeModal, data, backgroundStyle}) => {
  const [exerciseSetCount, setExerciseSetCount] = useState(0);

  const decrementSetCount = () => {
    setExerciseSetCount(exerciseSetCount - 1);
  };

  const incrementSetCount = () => {
    setExerciseSetCount(exerciseSetCount + 1);
  };

  const handleClose = () => {
    setExerciseSetCount(0);
    closeModal();
  };

  const clearData = () => {
    setExerciseSetCount(0);
  };

  if (!data) {
    return null;
  } else {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={visible}
        onRequestClose={closeModal}>
        <View style={[styles.modal, backgroundStyle]}>
          <View style={[styles.modalContent]}>
            <Text variant="headlineLarge">Add Workout</Text>
            <View
              style={{
                padding: 20,
                flexDirection: 'column',
                justifyContent: 'space-around',
              }}>
              <Text variant="headlineSmall" style={{marginBottom: 10}}>
                {toTitleCase(data.Name)}
              </Text>
              <View style={{padding: 10, marginBottom: 20}}>
                <Image
                  style={{
                    width: 300,
                    height: 200,
                    resizeMode: 'contain',
                  }}
                  source={{
                    uri: data.ImageURL,
                  }}
                />
              </View>
              <Text variant="titleMedium">Add Number of Sets</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 10,
                }}>
                <IconButton
                  icon="minus"
                  size={24}
                  onPress={decrementSetCount}
                  disabled={exerciseSetCount === 0}
                />
                <View style={{paddingHorizontal: 8}}>
                  <Text>{exerciseSetCount}</Text>
                </View>
                <IconButton icon="plus" size={24} onPress={incrementSetCount} />
              </View>
            </View>
            <View style={[styles.viewButtonsContainer]}>
              <Button
                mode="contained"
                onPress={() => console.log('BUTTON')}
                style={{
                  borderRadius: 20,
                }}>
                Add
              </Button>
              <Button
                mode="contained"
                onPress={clearData}
                style={{
                  borderRadius: 20,
                }}>
                Clear
              </Button>
              <Button
                mode="contained"
                onPress={handleClose}
                style={{
                  borderRadius: 20,
                }}>
                Done
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
};

const TrackFitness = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState('');

  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

  const onChangeSearch = query => setSearchQuery(query);

  const backgroundStyle = {
    backgroundColor: isDarkMode
      ? backgroundThemeColor.dark
      : backgroundThemeColor.light,
  };

  const onPressSearchExercise = () => {
    // API = `${API_URL}/api/=${searchQuery}`;
    // const options = {
    //   method: 'GET',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${currentUser.access_token}`,
    //   },
    // };
    // fetch(API, options)
    //   .then(res => {
    //     return res.json();
    //   })
    //   .then(res => setData(res))
    //   .catch(err => {
    //     console.log(err.message);
    //   });
    setData(EXERCISE_DATA);
  };

  const handleOpenModal = item => {
    setModalData(item);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={[styles.body, backgroundStyle]}>
      <View style={styles.viewHeading}>
        <Text variant="headlineLarge">Search Workout</Text>
      </View>
      <View style={{padding: 10}}>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
        <View style={{marginTop: 20, alignItems: 'center', padding: 5}}>
          <Button
            icon="search-web"
            mode="contained"
            style={styles.buttonStyle}
            onPress={onPressSearchExercise}>
            Search
          </Button>
        </View>
        <View>
          {data && (
            <FlatList
              data={data.data}
              renderItem={({item}) => (
                <View style={{padding: 10}}>
                  <Card>
                    <Card.Content style={{marginBottom: 5}}>
                      <Text variant="titleLarge">{toTitleCase(item.Name)}</Text>
                    </Card.Content>
                    <Card.Cover source={{uri: `${item.ImageURL}`}} />
                    <Card.Actions>
                      <Button
                        icon="plus"
                        mode="contained"
                        onPress={() => handleOpenModal(item)}>
                        Add
                      </Button>
                    </Card.Actions>
                  </Card>
                </View>
              )}
            />
          )}
          {data && (
            <AddExercise
              visible={modalVisible}
              closeModal={handleCloseModal}
              data={modalData}
              backgroundStyle={backgroundStyle}
            />
          )}
        </View>
      </View>
    </View>
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
  viewButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  textTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    padding: 2,
  },
  buttonStyle: {
    height: 40,
    width: 150,
    borderRadius: 10,
  },
  modal: {
    flex: 1,
    padding: 10,
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default TrackFitness;
