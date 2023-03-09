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

const calculateBaseMacros = (defaultWeight, defaultMacros) => {
  const ratio = 100 / defaultWeight;
  return {
    Calories: Math.round(defaultMacros.Calories * ratio),
    Protein: parseFloat((defaultMacros.Protein * ratio).toFixed(1)),
    Fat: parseFloat((defaultMacros.Fat * ratio).toFixed(1)),
    Carbohydrate: parseFloat((defaultMacros.Carbohydrate * ratio).toFixed(1)),
    Fiber: Math.round(defaultMacros.Fiber * ratio),
  };
};

const calculateMacros = (baseMacros, targetWeight) => {
  const ratio = targetWeight / 100;
  const targetMacros = {};
  for (const [macro, value] of Object.entries(baseMacros)) {
    targetMacros[macro] = parseFloat((value * ratio).toFixed(1));
  }
  return targetMacros;
};

const AddFoodQuantity = ({visible, closeModal, data, backgroundStyle}) => {
  const [hundredCount, setHundredCount] = useState(0);
  const [tensCount, setTensCount] = useState(0);
  const [targetFoodWeight, setTargetFoodWeight] = useState(0);
  const [baseMacros, setBaseMacros] = useState({
    Calories: 0,
    Protein: 0,
    Fat: 0,
    Carbohydrate: 0,
    Fiber: 0,
  });

  const [targetFoodMacros, setTargetFoodMacros] = useState(null);

  const [currentFoodMacro, setCurrentFoodMacro] =
    useRecoilState(totalFoodMacro);

  useEffect(() => {
    if (data) {
      setBaseMacros(calculateBaseMacros(data['Measures'][0]['weight'], data));
      setTargetFoodWeight(hundredCount + tensCount);
    }
  }, [hundredCount, tensCount]);

  useEffect(() => {
    setTargetFoodMacros(calculateMacros(baseMacros, targetFoodWeight));
  }, [targetFoodWeight]);

  const incrementHundredCount = () => {
    setHundredCount(hundredCount + 100);
  };

  const decrementHundredCount = () => {
    setHundredCount(hundredCount - 100);
  };

  const incrementTensCount = () => {
    setTensCount(tensCount + 10);
  };

  const decrementTensCount = () => {
    setTensCount(tensCount - 10);
  };

  const handleClose = () => {
    setHundredCount(0);
    setTensCount(0);
    closeModal();
  };

  const onAdd = () => {
    if (targetFoodMacros) {
      if (currentFoodMacro.Calories) {
        setCurrentFoodMacro(prevData => ({
          ...prevData,
          Calories:
            Number(targetFoodMacros.Calories) + Number(prevData.Calories),
          Carbohydrate:
            Number(targetFoodMacros.Carbohydrate) +
            Number(prevData.Carbohydrate),
          Fat: Number(targetFoodMacros.Fat) + Number(prevData.Fat),
          Fiber: Number(targetFoodMacros.Fiber) + Number(prevData.Fiber),
          Protein: Number(targetFoodMacros.Protein) + Number(prevData.Protein),
        }));
      } else {
        setCurrentFoodMacro(prevData => ({
          ...prevData,
          Calories: Number(targetFoodMacros.Calories),
          Carbohydrate: Number(targetFoodMacros.Carbohydrate),
          Fat: Number(targetFoodMacros.Fat),
          Fiber: Number(targetFoodMacros.Fiber),
          Protein: Number(targetFoodMacros.Protein),
        }));
      }
    }
    setHundredCount(0);
    setTensCount(0);
    closeModal();
  };

  const clearData = () => {
    setHundredCount(0);
    setTensCount(0);
    setTargetFoodWeight(0);
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
            <Text variant="headlineLarge">Add Quantity</Text>
            <View
              style={{
                padding: 20,
                flexDirection: 'column',
                justifyContent: 'space-around',
              }}>
              <Text variant="headlineSmall" style={{marginBottom: 10}}>
                {data.Name}
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
              <Text variant="titleMedium">Add Weight in Grams</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 5,
                  justifyContent: 'space-evenly',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 10,
                  }}>
                  <IconButton
                    icon="minus"
                    size={24}
                    onPress={decrementHundredCount}
                    disabled={hundredCount === 0}
                  />
                  <View style={{paddingHorizontal: 8}}>
                    <Text>{hundredCount}</Text>
                  </View>
                  <IconButton
                    icon="plus"
                    size={24}
                    onPress={incrementHundredCount}
                  />
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <IconButton
                    icon="minus"
                    size={24}
                    onPress={decrementTensCount}
                    disabled={tensCount === 0}
                  />
                  <View style={{paddingHorizontal: 8}}>
                    <Text>{tensCount}</Text>
                  </View>
                  <IconButton
                    icon="plus"
                    size={24}
                    onPress={incrementTensCount}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  marginBottom: 10,
                  alignItems: 'center',
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Text variant="titleLarge">Calories: </Text>
                  <Text variant="titleMedium">{targetFoodMacros.Calories}</Text>
                </View>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row', marginBottom: 10}}>
                  <Text variant="titleLarge">Protein: </Text>
                  <Text variant="titleMedium">{targetFoodMacros.Protein}g</Text>
                </View>
                <View style={{flexDirection: 'row', marginBottom: 10}}>
                  <Text variant="titleLarge">Fat: </Text>
                  <Text variant="titleMedium">{targetFoodMacros.Fat}g</Text>
                </View>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row', marginBottom: 10}}>
                  <Text variant="titleLarge">Carbohydrate: </Text>
                  <Text variant="titleMedium">
                    {targetFoodMacros.Carbohydrate}g
                  </Text>
                </View>
                <View style={{flexDirection: 'row', marginBottom: 10}}>
                  <Text variant="titleLarge">Fiber: </Text>
                  <Text variant="titleMedium">{targetFoodMacros.Fiber}g</Text>
                </View>
              </View>
            </View>
            <View style={[styles.viewButtonsContainer]}>
              <Button
                mode="contained"
                onPress={onAdd}
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

const TrackNutrition = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState('');

  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const currentFoodMacro = useRecoilValue(totalFoodMacro);

  const onChangeSearch = query => setSearchQuery(query);

  const backgroundStyle = {
    backgroundColor: isDarkMode
      ? backgroundThemeColor.dark
      : backgroundThemeColor.light,
  };

  const onPressSearchFood = () => {
    API = `${API_URL}/api/food/list?limit=10&search=${searchQuery}`;
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
      .then(res => setData(res))
      .catch(err => {
        console.log(err.message);
      });
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
        <Text variant="headlineLarge">Search Food</Text>
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
            onPress={onPressSearchFood}>
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
                      <Text variant="titleLarge">{item.Name}</Text>
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
            <AddFoodQuantity
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
});

export default TrackNutrition;
