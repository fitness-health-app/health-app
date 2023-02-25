import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const CustomTrackingBlock = ({blockLabel, onPressHandleFunction}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const viewBackgroundColor = {
    backgroundColor: isDarkMode
      ? styles.backgroundViewColor.dark
      : styles.backgroundViewColor.light,
  };
  const viewTextColor = {
    color: isDarkMode ? styles.textColor.dark : styles.textColor.dark,
  };
  return (
    <View style={[styles.viewTracking, viewBackgroundColor]}>
      <Text style={[styles.textTracking, viewTextColor]}>{blockLabel}</Text>
      <TouchableOpacity
        activeOpacity={0.1}
        underlayColor="#F0CAAD"
        onPress={onPressHandleFunction}>
        <View style={[styles.viewTrackingIcon]}>
          <FontAwesome5 name="plus" size={20} color="#FFFFFF" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  viewTracking: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    width: 'auto',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  viewSectionTitle: {
    flex: 1,
    flexDirection: 'column',
  },
  viewTrackingIcon: {
    borderRadius: 30,
    padding: 6,
    backgroundColor: '#f79700',
    marginEnd: 10,
  },
  textTracking: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 2,
  },
  sectionTitleText: {
    fontSize: 25,
    fontWeight: 'bold',
    padding: 8,
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

export default CustomTrackingBlock;
