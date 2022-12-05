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
import RNBootSplash from 'react-native-bootsplash';

const Stack = createStackNavigator();

const App = () => {
  const dispatch = useDispatch();
  const userToken = useSelector(state => state.reducer.userToken);
  const [user, setUser] = useState();

  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
      getData();
    };

    init().finally(async () => {
      setTimeout(() => {
        RNBootSplash.hide({fade: true});
      }, 1000);
    });
  }, []);

  const config = {
    dependencies: {
      'linear-gradient': require('react-native-linear-gradient').default,
    },
  };

  const getAllMusic = async token => {
    await axiosconfig
      .get('music_all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        console.log('All Music', JSON.stringify(res.data));
        if (res.data) {
          dispatch(setMusic(res?.data));
          dispatch(setUserToken(token));
        }
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  const getData = async () => {
    let user = await AsyncStorage.getItem('user_text');
    setUser(user);
    console.log(user, 'existing');
    const value = await AsyncStorage.getItem('@auth_token');
    console.log(value, 'token');
    {
      value ? getAllMusic(value) : dispatch(setUserToken(null));
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
                {!user ? (
                  <Stack.Screen name="GetStarted" component={GetStarted} />
                ) : null}

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
