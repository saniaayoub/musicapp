import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import React, {useContext, useRef, useState} from 'react';
import s from './style';
import background from '../../assets/images/background.png';
import Icon from 'react-native-vector-icons/Feather';
import {Input, Button} from 'native-base';
import {moderateScale} from 'react-native-size-matters';

import PhoneInput from 'react-native-phone-input';
import axiosconfig from '../../Providers/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import {setUserToken} from '../../Redux/actions';

const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passRegex = new RegExp(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
);

const SignUp = ({navigation}) => {
  const dispatch = useDispatch();

  const phonenum = useRef();
  const [fname, setFname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setshowPass] = useState(true);
  const [showPasso, setshowPasso] = useState(true);
  const [fnameErr, setFnameErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [passErr, setPassErr] = useState('');
  const [conPassErr, setConPassErr] = useState('');
  const [phNumErr, setPhNumErr] = useState('');
  const [loader, setLoader] = useState(false);

  const showToast = msg => {
    ToastAndroid.show(msg, ToastAndroid.LONG);
  };

  const validate = () => {
    setLoader(true);
    if (
      !fname ||
      !email ||
      !password ||
      !confirmPassword ||
      !phonenum.current.getValue()
    ) {
      setLoader(false);
      if (!fname) {
        setFnameErr('*');
      } else if (!fnameErr) {
        setFnameErr('');
      }
      if (!password) {
        setPassErr('*');
      } else if (!passErr) {
        setPassErr('');
      }
      if (!confirmPassword) {
        setConPassErr('*');
      } else if (!conPassErr) {
        setConPassErr('');
      }
      if (!email) {
        setEmailErr('*');
      } else if (!emailErr) {
        setEmailErr('');
      }
      if (!phonenum.current.isValidNumber()) {
        setPhNumErr('*');
      }
      Alert.alert('Please fill in all required fields');
      return;
    }
    if (conPassErr) {
      setLoader(false);
      setPassErr('');
      showToast('Confirm password mismatch');
      return;
    }
    let t = {
      valid: phonenum.current.isValidNumber(),
      type: phonenum.current.getNumberType(),
      value: phonenum.current.getValue(),
    };
    if (t.valid) {
      setPhNumErr('');
      signUp();
    } else {
      setLoader(false);
      setPhNumErr('*');
      showToast('Phone Number Invalid!');
      // Alert.alert('Phone Number Invalid!');
    }
  };

  const signUp = async () => {
    const data = {
      name: fname,
      email: email,
      password: password,
      phone_number: phonenum.current.getValue(),
    };
    await axiosconfig
      .post('store', data)
      .then(res => {
        const data = res?.data;

        if (data.access_token) {
          console.log(data.access_token);
          setFname('');
          setPassword('');
          setConfirmPassword('');
          setEmail('');
          setLoader(false);
          dispatch(setUserToken(data.access_token));
          AsyncStorage.setItem('@auth_token', data.access_token);
          showToast('Successfully Logged in!');
        } else {
          setLoader(false);
          console.log('data', data);
          showToast(data.email[0]);
        }
      })
      .catch(err => {
        setLoader(false);
        showToast(err.response.message);
        console.log(err.response.message);
      });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground source={background} blurRadius={5} resizeMode={'cover'}>
        <View style={[s.container]}>
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
              color={'#fff'}
              fontSize={moderateScale(14, 0.1)}
              value={fname}
              onChangeText={text => {
                setFname(text);
                setFnameErr('');
              }}
            />
            {fnameErr ? <Text style={s.error}>{fnameErr}</Text> : <></>}
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
              color={'#fff'}
              fontSize={moderateScale(14, 0.1)}
              value={email}
              onChangeText={text => {
                setEmail(text);
                let valid = emailReg.test(text);
                if (text && !valid) {
                  setEmailErr('Invalid Email');
                } else {
                  setEmailErr('');
                }
              }}
            />
            {emailErr ? <Text style={s.error}>{emailErr}</Text> : <></>}
          </View>
          <View style={[s.input, s.inputContainerStyle]}>
            <PhoneInput
              initialCountry={'us'}
              textProps={{
                placeholder: 'Enter Phone Number',
                placeholderTextColor: '#fff',
              }}
              autoFormat={true}
              textStyle={s.inputStyle}
              isValidNumber={e => console.log(e)}
              ref={phonenum}
              onChangePhoneNumber={phNumber => {
                if (phonenum.current.isValidNumber()) {
                  setPhNumErr('');
                } else {
                  setPhNumErr('*');
                }
              }}
            />
            {phNumErr ? <Text style={[s.error]}>{phNumErr}</Text> : null}
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
              style={s.shadow}
            >
              <Text style={s.btnText}>
                {loader ? <ActivityIndicator /> : `Register`}
              </Text>
            </Button>
          </View>

          <View style={s.bottomLink}>
            <Button
              size="sm"
              onPress={() => navigation.navigate('SignIn')}
              variant={'link'}
              _text={{
                color: '#fff',
              }}
            >
              <View style={{flexDirection: 'row'}}>
                <Text style={s.signInNow}>Already Have An Account?</Text>
                <Text
                  style={[s.signInNow, {fontWeight: '700', color: '#4B79F1'}]}
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
