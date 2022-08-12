import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
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
import Heart from '../assets/images/heart.svg';
import Search from '../assets/images/search.svg';
import Setting from '../assets/images/setting.svg';

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
  //  'https://www.poemsurdu.com/wp-content/uploads/2016/08/Dil-Se-Maine-Dekha-Pakistan.mp3',

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
            height: moderateScale(50, 0.1),
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
              <Home
                width={moderateScale(25, 0.1)}
                height={moderateScale(25, 0.1)}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={Favorite}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={focused ? styles.focused : null}
              // onPress={() => {
              //   navigation.navigate('Home');
              // }}
            >
              {/* <Image source={heart} /> */}
              <Heart
                width={moderateScale(25, 0.1)}
                height={moderateScale(25, 0.1)}
              />
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
              {/* <Image source={search} /> */}
              <Search
                width={moderateScale(25, 0.1)}
                height={moderateScale(25, 0.1)}
              />
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
              {/* <Image source={setting} /> */}
              <Setting
                width={moderateScale(25, 0.1)}
                height={moderateScale(25, 0.1)}
              />
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
