import 'react-native-gesture-handler';
import React, {useState} from 'react';
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
import SignIn from './src/screens/signIn';
import SignUp from './src/screens/signUp';
import ForgetPassword from './src/screens/ForgetPass';
import GetStarted from './src/screens/GetStarted';
import Subscribe from './src/screens/Subscribe';
import AppContext from './src/Providers/AppContext';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabs from './src/Components/bottomTabs';
import Songs from './src/Components/songs';
const Stack = createStackNavigator();

const App = () => {
  const [userToken, setUserToken] = useState(null);
  const [songState, setSongState] = useState('stop');
  const [songs, setSongs] = useState(Songs);
  const [favList, setFavList] = useState([]);
  const userSettings = {
    userToken,
    setUserToken,
    songState,
    setSongState,
    songs,
    setSongs,
    favList,
    setFavList,
  };
  const config = {
    dependencies: {
      'linear-gradient': require('react-native-linear-gradient').default,
    },
  };

  const MyStatusBar = ({backgroundColor, ...props}) => (
    <View style={[{backgroundColor}]}>
      <SafeAreaView>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </SafeAreaView>
    </View>
  );
  return (
    <AppContext.Provider value={userSettings}>
      <NativeBaseProvider config={config}>
        <SafeAreaProvider>
          <MyStatusBar backgroundColor="#130a18" barStyle="light-content" />
          <KeyboardAvoidingView
            style={{flex: 1}}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <NavigationContainer>
              {userToken == null ? (
                <Stack.Navigator screenOptions={{headerShown: false}}>
                  <Stack.Screen name="GetStarted" component={GetStarted} />
                  <Stack.Screen name="SignIn" component={SignIn} />
                  <Stack.Screen name="SignUp" component={SignUp} />
                  <Stack.Screen
                    name="ForgetPassword"
                    component={ForgetPassword}
                  />
                  <Stack.Screen name="Subscribe" component={Subscribe} />
                </Stack.Navigator>
              ) : (
                <BottomTabs />
              )}
            </NavigationContainer>
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </NativeBaseProvider>
    </AppContext.Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
