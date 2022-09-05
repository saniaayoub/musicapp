import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import s from './style';
import background from '../../assets/images/background.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Button} from 'native-base';
import {moderateScale} from 'react-native-size-matters';
import Lock from '../../assets/images/lock.svg';
import backarrow from '../../assets/images/backarrow.png';
import Backarrowsvg from '../../assets/images/backarrow.svg';
import OTPInputView from '@twotalltotems/react-native-otp-input';

const ForgetPassword = ({navigation}) => {
  const [otp, setOtp] = useState(true);
  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground source={background} blurRadius={5} resizeMode={'cover'}>
        <View style={[s.container]}>
          {otp ? (
            <View>
              <OTPInputView
                style={{width: '80%', height: 200}}
                pinCount={4}
                // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                // onCodeChanged = {code => { this.setState({code})}}
                autoFocusOnLoad
                codeInputFieldStyle={s.underlineStyleBase}
                codeInputHighlightStyle={s.underlineStyleHighLighted}
                onCodeFilled={code => {
                  console.log(`Code is ${code}, you are good to go!`);
                }}
              />
            </View>
          ) : (
            <>
              <View style={s.backbutton}>
                <Button
                  size="sm"
                  onPress={() => navigation.goBack()}
                  variant={'link'}
                  backgroundColor={'#fff'}
                  borderRadius={moderateScale(14, 0.1)}
                  padding={moderateScale(7, 0.1)}
                  zIndex={1000}
                >
                  <Backarrowsvg
                    width={moderateScale(14, 0.1)}
                    height={moderateScale(14, 0.1)}
                  />
                </Button>
              </View>
              <View style={s.heading}>
                <Text style={s.headingText}>Forget Password</Text>
              </View>
              <View style={s.input}>
                <Input
                  w={{
                    base: '75%',
                    md: '25%',
                  }}
                  variant="underlined"
                  color={'#fff'}
                  fontSize={moderateScale(14, 0.1)}
                  InputLeftElement={
                    <View style={s.iconCircle}>
                      <Icon name={'envelope'} color="#fff" size={15} />
                    </View>
                  }
                  placeholder="Email"
                  placeholderTextColor={'#fff'}
                />
              </View>

              <View style={s.button}>
                <Button
                  size="sm"
                  onPress={() => navigation.goBack()}
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
                  <Text style={s.btnText}>Send</Text>
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
                      style={[
                        s.forgetPass,
                        {fontWeight: '700', color: '#4B79F1'},
                      ]}
                    >
                      {' '}
                      Sign up Now!
                    </Text>
                  </View>
                </Button>
              </View>
            </>
          )}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ForgetPassword;
