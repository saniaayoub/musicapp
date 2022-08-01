import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {moderateScale, s} from 'react-native-size-matters';
import {createStackNavigator} from '@react-navigation/stack';
// Icons
import Home from '../assets/images/home.svg';
import heart from '../assets/images/heart.png';
import setting from '../assets/images/setting.png';
import search from '../assets/images/search.png';
import Icon from 'react-native-vector-icons/FontAwesome';

// Screens
import UserHome from '../screens/Home';
import Favorite from '../screens/Favourite';
import Playlist from '../screens/Playlist';
import Profile from '../screens/Profile';
import NowPlaying from '../screens/NowPlaying';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="UserHome" component={UserHome} />
      <Stack.Screen name="Playlist" component={Playlist} />
      <Stack.Screen name="NowPlaying" component={NowPlaying} />
    </Stack.Navigator>
  );
};
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
            height: moderateScale(53, 0.1),
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
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={focused ? styles.focused : null}>
              <Home />
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
        name="Profile"
        component={Profile}
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
