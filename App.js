import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  View,
  Platform,
} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {NativeBaseProvider} from 'native-base';
import SignIn from './src/screens/signIn';
import SignUp from './src/screens/signUp';
import ForgetPassword from './src/screens/ForgetPass';
import GetStarted from './src/screens/GetStarted';
import Subscribe from './src/screens/Subscribe';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  const [userToken, setUserToken] = useState(null);
  const config = {
    dependencies: {
      'linear-gradient': require('react-native-linear-gradient').default,
    },
  };
  return (
    <NativeBaseProvider config={config}>
      <SafeAreaProvider>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen name="GetStarted" component={GetStarted} />
              <Stack.Screen name="SignIn" component={SignIn} />
              <Stack.Screen name="SignUp" component={SignUp} />
              <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
              <Stack.Screen name="Subscribe" component={Subscribe} />
            </Stack.Navigator>
          </NavigationContainer>
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
