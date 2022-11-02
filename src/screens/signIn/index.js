import {
  ImageBackground,
  SafeAreaView,
  Text,
  View,
  ActivityIndicator,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useState} from 'react';
import s from './style';
import background from '../../assets/images/background.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {Input, FormControl, Button} from 'native-base';
import {moderateScale} from 'react-native-size-matters';
import Lock from '../../assets/images/lock.svg';
import axiosconfig from '../../Providers/axios';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import {setUserToken, setMusic} from '../../Redux/actions';

const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passRegex = new RegExp(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
);

const SignIn = ({navigation}) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validEmail, setValidEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPass, setshowPass] = useState(true);
  const [loader, setLoader] = useState(false);

  const showToast = msg => {
    ToastAndroid.show(msg, ToastAndroid.LONG);
  };

  const validate = async () => {
    setLoader(true);
    if (email && password) {
      {
        !validEmail
          ? (setEmailError('Please enter a valid email'), setLoader(false))
          : login();
      }
    } else {
      {
        !email && !password
          ? (setEmailError('Email is required'),
            setPasswordError('Password is required'))
          : !email
          ? setEmailError('Email is required')
          : !validEmail
          ? setEmailError('Please enter a valid email')
          : setPasswordError('Password is required');
      }
      setLoader(false);
      return;
    }
  };

  const login = () => {
    const data = {
      email: email,
      password: password,
      type: 'user',
    };
    axiosconfig
      .post('login', data)
      .then(res => {
        const data = res?.data;
        if (data.access_token) {
          console.log('token', data.access_token);
          getAllMusic(data.access_token);
        } else {
          console.log('here2');
          console.log(data);
          setLoader(false);
          showToast(data.message);
        }
      })
      .catch(err => {
        console.log(err, 'error');
        setLoader(false);
        showToast(err.message);
      });
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
          AsyncStorage.setItem('@auth_token', token);
          AsyncStorage.setItem('music', JSON.stringify(res.data));
          setEmail('');
          setPassword('');
          showToast('Successfully Logged in!');
          setLoader(false);
          dispatch(setUserToken(token));
        }
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground source={background} blurRadius={5} resizeMode={'cover'}>
        <View style={[s.container]}>
          <View style={{width: '100%', alignItems: 'center'}}>
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
                value={email}
                onChangeText={email => {
                  setEmail(email);
                  let valid = emailReg.test(email);
                  setEmailError('');
                  setValidEmail(valid);
                }}
                color={'#fff'}
                fontSize={moderateScale(14, 0.1)}
              />
              {emailError ? (
                <Text style={s.error}>{emailError}</Text>
              ) : (
                <Text> </Text>
              )}
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
                value={password}
                onChangeText={password => {
                  setPassword(password);
                  setPasswordError('');
                }}
                InputRightElement={
                  password ? (
                    <View style={s.eye}>
                      <TouchableOpacity onPress={() => setshowPass(!showPass)}>
                        <Feather
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
                errorMessage={passwordError}
                color={'#fff'}
                fontSize={moderateScale(14, 0.1)}
                secureTextEntry={showPass}
              />
              {passwordError ? (
                <Text style={s.error}>{passwordError}</Text>
              ) : (
                <Text> </Text>
              )}
            </View>
            <View style={s.button}>
              <Button
                size="sm"
                onPress={() => validate()}
                variant={'solid'}
                _text={{
                  color: '#6627EC',
                }}
                backgroundColor={'white'}
                borderRadius={50}
                w={moderateScale(140, 0.1)}
                h={moderateScale(35, 0.1)}
                alignItems={'center'}
              >
                <Text style={s.btnText}>
                  {loader ? <ActivityIndicator /> : `Login`}
                </Text>
              </Button>
            </View>
            <View>
              <Button
                size="sm"
                onPress={() => navigation.navigate('ForgetPassword')}
                variant={'link'}
              >
                <Text style={s.forgetPass}>Forgot Password?</Text>
              </Button>
            </View>
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
