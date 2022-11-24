/**
 * Sample React Native AppStack
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {useState} from 'react';
 import {StatusBar, useColorScheme, StyleSheet, View} from 'react-native';
 import {NavigationContainer} from '@react-navigation/native';
 import {createStackNavigator} from '@react-navigation/stack';
 
 import {backgroundThemeColor} from './styles/globalStyles';
 import StackNavigator from './navigation/StackNavigator';
 import BottomTabNavigation from './navigation/BottomTabNavigation';
 
 const Stack = createStackNavigator();
 
 const AppStack = () => {
   const isDarkMode = useColorScheme() === 'dark';
 
   const backgroundStyle = {
     backgroundColor: isDarkMode
       ? backgroundThemeColor.dark
       : backgroundThemeColor.light,
   };
   const [isLoggedIn, setIsLoggedIn] = useState(true);
   return (
     <View style={[styles.body, backgroundStyle]}>
       <StatusBar
         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
         backgroundColor={backgroundStyle.backgroundColor}
       />
       <NavigationContainer>
         <Stack.Navigator initialRouteName="StackNavigator">
           {isLoggedIn ? (
             <Stack.Group screenOptions={{headerShown: false}}>
               <Stack.Screen
                 name="BottomTabNavigation"
                 component={BottomTabNavigation}
               />
             </Stack.Group>
           ) : (
             <Stack.Group screenOptions={{headerShown: false}}>
               <Stack.Screen name="StackNavigator" component={StackNavigator} />
             </Stack.Group>
           )}
         </Stack.Navigator>
       </NavigationContainer>
     </View>
   );
 };
 
 const styles = StyleSheet.create({
   body: {
     flex: 1,
   },
   textSize: {
     fontSize: 40,
   },
 });
 
 export default AppStack;
 