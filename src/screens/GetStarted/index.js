import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Animated,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import s from './style';
import background from '../../assets/images/background.png';
import {LinearTextGradient} from 'react-native-text-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Button} from 'native-base';
import {moderateScale} from 'react-native-size-matters';
import Lock from '../../assets/images/lock.svg';
import Title from '../../assets/images/title.svg';
import title from '../../assets/images/title.png';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const GetStarted = ({navigation}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const transAnim = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    fadeIn();
    translate();
  }, []);

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 3000,
    }).start();
  };

  const translate = () => {
    Animated.timing(transAnim, {
      toValue: 0,
      duration: 2000,
    }).start();
  };

  return (
    <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
      <ImageBackground source={background} blurRadius={5} resizeMode={'cover'}>
        <View style={[s.container, {width: width, height: height}]}>
          <View></View>
          <View>
            <Animated.View
              style={[
                s.fadingContainer,
                {
                  // Bind opacity to animated value
                  opacity: fadeAnim,
                  position: 'relative',
                  transform: [
                    {
                      translateY: transAnim,
                    },
                  ],
                },
              ]}
            >
              <LinearTextGradient
                locations={[0, 1]}
                colors={['blue', 'purple']}
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1}}
                style={s.topHeading}
              >
                <Text>Energy Healer</Text>
              </LinearTextGradient>
            </Animated.View>

            <View style={s.heading}>
              <Image
                source={title}
                width={undefined}
                height={undefined}
                resizeMode={'contain'}
              />
              {/* <Title
                width={moderateScale(282, 0.1)}
                height={moderateScale(70, 0.1)}
              /> */}
            </View>
            <View style={s.para}>
              <Text style={s.paraText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                pellentesque duis eleifend
              </Text>
            </View>
          </View>
          <View></View>
        </View>
      </ImageBackground>
      <View style={s.button}>
        <Button
          size="sm"
          onPress={() => navigation.navigate('SignIn')}
          variant={'solid'}
          _text={{
            color: '#6627EC',
          }}
          backgroundColor={'transparent'}
          borderRadius={50}
          borderWidth={1}
          borderColor={'#fff'}
          w={moderateScale(151, 0.1)}
          h={moderateScale(35, 0.1)}
          alignItems={'center'}
          style={s.shadow}
        >
          <Text style={s.btnText}>Get Start Now</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default GetStarted;
