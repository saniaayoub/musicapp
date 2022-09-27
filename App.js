import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  View,
  Platform,
  StatusBar,
} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabs from './src/Components/bottomTabs';
import AppContext from './src/Providers/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Songs from './src/Components/songs';
import {useSelector, useDispatch} from 'react-redux';
import {setUserToken, setMusic} from './src/Redux/actions';
import axiosconfig from './src/Providers/axios';
// Auth Screens
import SignIn from './src/screens/signIn';
import SignUp from './src/screens/signUp';
import ForgetPassword from './src/screens/ForgetPass';
import PassReset from './src/screens/PassReset';
import GetStarted from './src/screens/GetStarted';
import Subscribe from './src/screens/Subscribe';

const Stack = createStackNavigator();

const App = () => {
  const dispatch = useDispatch();
  const userToken = useSelector(state => state.reducer.userToken);

  useEffect(() => {
    getData();
  }, []);

  const config = {
    dependencies: {
      'linear-gradient': require('react-native-linear-gradient').default,
    },
  };

  const getData = async () => {
    const value = await AsyncStorage.getItem('@auth_token');
    const music = await AsyncStorage.getItem('music');
    const json = JSON.parse(music);
    console.log(json, 'all music');
    console.log(value, 'token');
    {
      value
        ? (dispatch(setMusic(json)), dispatch(setUserToken(value)))
        : dispatch(setUserToken(null));
    }
  };

  const MyStatusBar = ({backgroundColor, ...props}) => (
    <View style={[{backgroundColor}]}>
      <SafeAreaView>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </SafeAreaView>
    </View>
  );

  return (
    <NativeBaseProvider config={config}>
      <SafeAreaProvider>
        <MyStatusBar backgroundColor="#130a18" barStyle="light-content" />
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <NavigationContainer>
            {userToken ? (
              <BottomTabs />
            ) : (
              <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="GetStarted" component={GetStarted} />
                <Stack.Screen name="SignIn" component={SignIn} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="Subscribe" component={Subscribe} />
                <Stack.Screen
                  name="ForgetPassword"
                  component={ForgetPassword}
                />
                <Stack.Screen name="PassReset" component={PassReset} />
              </Stack.Navigator>
            )}
          </NavigationContainer>
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
