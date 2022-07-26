import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import React from 'react';
import s from './style';
import background from '../../assets/images/background.png';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const signin = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground source={background} blurRadius={5} resizeMode={'cover'}>
        <View style={[s.container, {width: width, height: height}]}>
          <Text style={s.heading}>Sign In</Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default signin;
