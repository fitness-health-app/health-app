import React, {useEffect, useState} from 'react';
import {useColorScheme, View, StyleSheet, ScrollView} from 'react-native';
import {Text, Avatar} from 'react-native-paper';

import {backgroundThemeColor} from '../styles/globalStyles';

const DisplayCoachDetails = ({
  name,
  title,
  experience,
  location,
  description,
  profileImage,
}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode
      ? backgroundThemeColor.dark
      : backgroundThemeColor.light,
  };

  return (
    <ScrollView style={[styles.body, backgroundStyle]}>
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
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewHeading: {
    alignItems: 'center',
    padding: 25,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
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
});

export default DisplayCoachDetails;
