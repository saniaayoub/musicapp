import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
} from 'react-native';
import React, {useContext, useState} from 'react';
import s from './style';
import subcriptionBack from '../../assets/images/subsback.jpg';
import {Button} from 'native-base';
import {moderateScale} from 'react-native-size-matters';
import AppContext from '../../Providers/AppContext';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Subscribe = ({navigation}) => {
  const context = useContext(AppContext);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        source={subcriptionBack}
        blurRadius={1}
        resizeMode={'cover'}
      >
        <View style={[s.container, {width: width, height: height}]}>
          <View style={s.splender}>
            <View style={s.empty}></View>
            <View style={s.bottomContainer}>
              <View style={s.heading}>
                <Text style={[s.text, s.headingText]}>
                  Healing Energy for Mind, Body and Soul 💜
                </Text>
              </View>
              <View style={s.para}>
                <Text style={[s.text, s.paraText]}>
                  You need a Subscription to Enjoy the app
                </Text>
              </View>
              <View style={s.subscription}>
                <Text style={[s.text, s.subscriptionText]}>
                  The Subscription Amount is{' '}
                </Text>
              </View>
              <View style={s.price}>
                <Text style={[s.text, s.headingText2]}>$5.00/</Text>
                <Text style={[s.text, s.priceText]}>Week </Text>
              </View>
              <View style={s.button}>
                <Button
                  size="sm"
                  onPress={() => navigation.navigate('SignIn')}
                  variant={'solid'}
                  _text={{
                    color: '#6627EC',
                  }}
                  backgroundColor={'white'}
                  borderRadius={50}
                  w={moderateScale(150, 0.1)}
                  h={moderateScale(35, 0.1)}
                  alignItems={'center'}
                  style={s.shadow}
                >
                  <Text style={s.btnText}>Subscribe Now</Text>
                </Button>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Subscribe;
