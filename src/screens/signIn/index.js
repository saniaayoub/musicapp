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
const SignIn = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground source={background} blurRadius={5} resizeMode={'cover'}>
        <View style={[s.container, {width: width, height: height}]}>
          <View style={s.heading}>
            <Text style={s.headingText}>Sign In</Text>
          </View>
          <View style={s.input}>
            <Input
              w={{
                base: '75%',
                md: '25%',
              }}
              variant="underlined"
              InputLeftElement={
                <View style={s.iconCircle}>
                  <Icon name={'envelope'} color="#fff" size={20} />
                </View>
              }
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
              InputLeftElement={
                <View style={s.iconCircle}>
                  <Lock
                    width={moderateScale(20, 0.1)}
                    height={moderateScale(20, 0.1)}
                  />
                </View>
              }
              placeholder="Password"
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
              <Text style={s.btnText}>Login</Text>
            </Button>
          </View>
          <View>
            <Button
              size="sm"
              onPress={() => navigation.navigate('ForgetPassword')}
              variant={'link'}
            >
              <Text style={s.forgetPass}> Forget Password</Text>
            </Button>
          </View>
          <View style={s.bottomLink}>
            <Button
              size="sm"
              onPress={() => navigation.navigate('SignUp')}
              variant={'link'}
              _text={{
                color: '#fff',
              }}
            >
              <View style={{flexDirection: 'row'}}>
                <Text style={s.forgetPass}>Don’t Have an Account?</Text>
                <Text
                  style={[s.forgetPass, {fontWeight: '700', color: '#4B79F1'}]}
                >
                  {' '}
                  Sign up Now!
                </Text>
              </View>
            </Button>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SignIn;