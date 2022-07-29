import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {moderateScale, s} from 'react-native-size-matters';
import home from '../assets/images/home.png';
import heart from '../assets/images/heart.png';
import setting from '../assets/images/setting.png';
import search from '../assets/images/search.png';
import Icon from 'react-native-vector-icons/FontAwesome';

// Screens
import SignIn from '../screens/signIn';
import SignUp from '../screens//signUp';
import ForgetPassword from '../screens//ForgetPass';
import GetStarted from '../screens//GetStarted';
import UserHome from '../screens/Home';
import Favorite from '../screens/Favourite';
import Playlist from '../screens/Playlist';
const Tab = createBottomTabNavigator();

const bottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: [
          {
            display: 'flex',
            paddingVertical: moderateScale(5, 0.1),
            backgroundColor: '#000000',
            width: '100%',
            height: moderateScale(55, 0.1),
            borderTopLeftRadius: moderateScale(25, 0.1),
            borderTopRightRadius: moderateScale(25, 0.1),
            elevation: 0,
            position: 'absolute',
          },
          null,
        ],
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="UserHome"
        component={UserHome}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={focused ? styles.focused : null}>
              <Image source={home} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={Favorite}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={focused ? styles.focused : null}>
              <Image source={heart} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Playlist"
        component={Playlist}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={focused ? styles.focused : null}>
              <Image source={search} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="GetStarted"
        component={GetStarted}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={focused ? styles.focused : null}>
              <Image source={setting} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default bottomTabs;

const styles = StyleSheet.create({
  focused: {
    backgroundColor: '#C26AF8',
    borderRadius: moderateScale(50, 0.1),
    padding: moderateScale(8, 0.1),
  },
});
