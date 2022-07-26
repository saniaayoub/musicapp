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
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <SignIn />
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
