import {
  ImageBackground,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import s from './style';
import background from '../../assets/images/background.png';
import Icon from 'react-native-vector-icons/Feather';
import axiosconfig from '../../Providers/axios';
import {Input, Button} from 'native-base';
import {moderateScale} from 'react-native-size-matters';
import Backarrowsvg from '../../assets/images/backarrow.svg';

const passRegex = new RegExp(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
);

const PassReset = ({navigation, route}) => {
  const {email} = route.params;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setshowPass] = useState(true);
  const [showPasso, setshowPasso] = useState(true);
  const [passErr, setPassErr] = useState('');
  const [conPassErr, setConPassErr] = useState('');
  const [loader, setLoader] = useState(false);

  const showToast = msg => {
    ToastAndroid.show(msg, ToastAndroid.LONG);
  };

  const reset = async () => {
    setLoader(true);
    if (!password || !confirmPassword || passErr || conPassErr) {
      setLoader(false);
      return;
    }
    setLoader(true);
    const data = {
      email: email,
      password: password,
      password_confirm: confirmPassword,
    };
    await axiosconfig
      .post('reset', data)
      .then(res => {
        const data = res?.data;
        if (data.message == 'success') {
          setLoader(false);
          showToast('Password changed Successfully');
          navigation.navigate('SignIn');
        } else {
          setLoader(false);
          setPassword('');
          setConfirmPassword('');
          showToast(data.message);
        }
      })
      .catch(err => {
        setLoader(false);
        setPassword('');
        setConfirmPassword('');
        showToast('Password not changed');
      });
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground source={background} blurRadius={5} resizeMode={'cover'}>
        <View style={[s.container]}>
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
            <Text style={s.headingText}>Reset Password</Text>
            <Text style={s.verifyText}>
              Strong passwords include numbers, letters, special characters and
              at least 8 digits
            </Text>
          </View>
          <View style={s.input}>
            <Input
              w={{
                base: '75%',
                md: '25%',
              }}
              variant="underlined"
              placeholder="New Password"
              placeholderTextColor={'#fff'}
              value={password}
              onChangeText={text => {
                setPassword(text);
                let valid = passRegex.test(text);
                if (text && !valid) {
                  setPassErr('Weak Password');
                } else {
                  setPassErr('');
                }
              }}
              InputRightElement={
                password ? (
                  <View style={s.eye}>
                    <TouchableOpacity onPress={() => setshowPass(!showPass)}>
                      <Icon
                        name={showPass ? 'eye' : 'eye-off'}
                        color="#fff"
                        size={20}
                      />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <></>
                )
              }
              color={'#fff'}
              fontSize={moderateScale(14, 0.1)}
              secureTextEntry={showPass}
            />

            {passErr ? <Text style={s.error}>{passErr}</Text> : <></>}
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
              color={'#fff'}
              fontSize={moderateScale(14, 0.1)}
              secureTextEntry={showPasso}
              InputRightElement={
                confirmPassword ? (
                  <View style={s.eye}>
                    <TouchableOpacity onPress={() => setshowPasso(!showPasso)}>
                      <Icon
                        name={showPasso ? 'eye' : 'eye-off'}
                        color="#fff"
                        size={20}
                      />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <></>
                )
              }
              value={confirmPassword}
              onChangeText={text => {
                setConfirmPassword(text);
                setConPassErr('');
                if (text.length > 3) {
                  if (text !== password) {
                    setConPassErr('Password Mismatch');
                  } else {
                    setConPassErr('');
                  }
                }
              }}
            />
            {conPassErr ? <Text style={s.error}>{conPassErr}</Text> : <></>}
          </View>
          <View style={s.button}>
            <Button
              size="sm"
              onPress={() => reset()}
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
              <Text style={s.btnText}>
                {loader ? <ActivityIndicator /> : `Reset`}
              </Text>
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

export default PassReset;
