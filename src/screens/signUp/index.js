import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
} from 'react-native';
import React from 'react';
import s from './style';
import background from '../../assets/images/background.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Button} from 'native-base';
import {moderateScale} from 'react-native-size-matters';
import Lock from '../../assets/images/lock.svg';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const SignUp = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground source={background} blurRadius={5} resizeMode={'cover'}>
        <View style={[s.container, {width: width, height: height}]}>
          <View style={s.heading}>
            <Text style={s.headingText}>Create Your Account</Text>
          </View>
          <View style={s.input}>
            <Input
              w={{
                base: '75%',
                md: '25%',
              }}
              variant="underlined"
              placeholder="Full Name"
              placeholderTextColor={'#fff'}
              fontSize={moderateScale(13, 0.1)}
            />
          </View>
          <View style={s.input}>
            <Input
              w={{
                base: '75%',
                md: '25%',
              }}
              variant="underlined"
              placeholder="Email"
              placeholderTextColor={'#fff'}
              fontSize={moderateScale(13, 0.1)}
            />
          </View>
          <View style={s.input}>
            <Input
              w={{
                base: '75%',
                md: '25%',
              }}
              variant="underlined"
              placeholder="Contact No."
              placeholderTextColor={'#fff'}
              fontSize={moderateScale(13, 0.1)}
            />
          </View>
          <View style={s.input}>
            <Input
              w={{
                base: '75%',
                md: '25%',
              }}
              variant="underlined"
              placeholder="Create Password"
              placeholderTextColor={'#fff'}
              fontSize={moderateScale(13, 0.1)}
            />
          </View>
          <View style={s.input}>
            <Input
              w={{
                base: '75%',
                md: '25%',
              }}
              variant="underlined"
              placeholder="Confirm Password"
              placeholderTextColor={'#fff'}
              fontSize={moderateScale(13, 0.1)}
            />
          </View>
          <View style={s.button}>
            <Button
              size="sm"
              onPress={() => navigation.navigate('Subscribe')}
              variant={'solid'}
              _text={{
                color: '#6627EC',
              }}
              backgroundColor={'white'}
              borderRadius={50}
              w={moderateScale(140, 0.1)}
              h={moderateScale(35, 0.1)}
              alignItems={'center'}
              style={s.shadow}
            >
              <Text style={s.btnText}>Register</Text>
            </Button>
          </View>

          <View style={s.bottomLink}>
            <Button
              size="sm"
              // onPress={() => navigation.navigate('SignUp')}
              variant={'link'}
              _text={{
                color: '#fff',
              }}
            >
              <View style={{flexDirection: 'row'}}>
                <Text style={s.forgetPass}>Already Have An Account?</Text>
                <Text
                  style={[s.forgetPass, {fontWeight: '700', color: '#4B79F1'}]}
                >
                  {' '}
                  Sign in Now!
                </Text>
              </View>
            </Button>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SignUp;
