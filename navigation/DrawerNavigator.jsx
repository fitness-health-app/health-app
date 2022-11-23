import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import MyProfile from '../screens/MyProfile';
import Settings from '../screens/Settings';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="MyProfile"
        component={MyProfile}
        options={{
          title: 'My Profile',
          drawerIcon: ({focused}) => (
            <FontAwesome5
              name="user-circle"
              size={focused ? 25 : 20}
              color={focused ? '#f79700' : '#999999'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          title: 'Settings',
          drawerIcon: ({focused}) => (
            <FontAwesome5
              name="cog"
              size={focused ? 25 : 20}
              color={focused ? '#f79700' : '#999999'}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
