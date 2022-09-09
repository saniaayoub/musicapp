import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Modal,
  ActivityIndicator,
  ToastAndroid,
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
import OTPModal from '../../Components/otpModal';
import axiosconfig from '../../Providers/axios';

const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const ForgetPassword = ({navigation}) => {
  const [email, setEmail] = useState(email);
  const [emailValid, setEmailValid] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [otp, setOtp] = useState();
  const [loader, setLoader] = useState(false);

  const showToast = msg => {
    ToastAndroid.show(msg, ToastAndroid.LONG);
  };
  const send = async () => {
    setLoader(true);
    if (!emailValid || !email) {
      showToast('Please enter a valid email');
      setLoader(false);
      return;
    }
    console.log(email);
    const data = {
      email: email,
    };
    await axiosconfig
      .post('forget', data)
      .then(res => {
        const data = res?.data;
        console.log('data', data);
        if (res) {
          setLoader(false);
          showToast(data.message);
          setModalVisible(true);
        } else {
          console.log('here');
          setLoader(false);
          showToast(data.message);
        }
      })
      .catch(err => {
        console.log(err.response);
        let error = err?.response?.data;
        setLoader(false);
        showToast(error.message);
      });
  };

  const submit = async () => {
    setLoader(true);
    console.log(otp, email, 'email');
    const data = {
      token: otp,
      email: email,
    };
    await axiosconfig
      .post('otp_password', data)
      .then(res => {
        if (res) {
          console.log(res.data);
          setLoader(false);
          setModalVisible(false);
          navigation.navigate('PassReset', {email: email});
        } else {
          setLoader(false);
          showToast(data.message);
          console.log(data);
        }
      })
      .catch(err => {
        console.log(err.response.data);
        let error = err?.response?.data;
        setLoader(false);
        showToast(error.message);
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
              value={email}
              onChangeText={email => {
                setEmail(email);
                let valid = emailReg.test(email);
                setEmailValid(valid);
              }}
            />
          </View>

          <View style={s.button}>
            <Button
              size="sm"
              onPress={() => send()}
              variant={'link'}
              backgroundColor={'white'}
              borderRadius={50}
              w={moderateScale(140, 0.1)}
              h={moderateScale(35, 0.1)}
              alignItems={'center'}
            >
              <Text style={s.btnText}>
                {loader ? <ActivityIndicator /> : `Send`}
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
          {modalVisible ? (
            <OTPModal
              navigation={navigation}
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              submit={submit}
              setOtp={setOtp}
              loader={loader}
            />
          ) : (
            <></>
          )}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ForgetPassword;
