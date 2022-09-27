import {
  ImageBackground,
  SafeAreaView,
  Text,
  View,
  ToastAndroid,
  Linking,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import s from './style';
import Feather from 'react-native-vector-icons/Feather';
import subcriptionBack from '../../assets/images/subsback.jpg';
import {Button} from 'native-base';
import {moderateScale} from 'react-native-size-matters';
import axiosconfig from '../../Providers/axios';
import {useDispatch} from 'react-redux';
import {setUserToken, setMusic} from '../../Redux/actions';

import AsyncStorage from '@react-native-async-storage/async-storage';
import PaymentModal from '../../Components/paymentModal';

const Subscribe = ({navigation, route}) => {
  const HTML = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title></title>
</head>
<body>
<form action="https://www.sandbox.paypal.com/cgi-bin/webscr" method="post" target="_top">
<input type="hidden" name="cmd" value="_s-xclick">
<input type="hidden" name="hosted_button_id" value="9CYTZ4HBHXQZ8">
<input type="image" src="https://www.sandbox.paypal.com/en_US/i/btn/btn_subscribeCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
<img alt="" border="0" src="https://www.sandbox.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1">
</form>

</body>
</html>

</html>`;
  const dispatch = useDispatch();
  const [url, setUrl] = useState();
  const [data, setData] = useState(route.params.formData);
  const [showGateway, setShowGateway] = useState(false);

  const [loader, setLoader] = useState(false);

  useEffect(() => {
    console.log(data);
    // getLink();
  }, []);

  const onMessage = e => {
    setLoader(true);
    let data = e.nativeEvent.data;
    setShowGateway(false);
    console.log(e, 'close');
    let payment = JSON.parse(data);
    if (payment.status === 'COMPLETED') {
      showToast('PAYMENT MADE SUCCESSFULLY!');
      signUp();
    } else {
      setLoader(false);
      showToast('PAYMENT FAILED. PLEASE TRY AGAIN.');
    }
  };

  const handleMessage = async event => {
    console.log(event, 'hereeee');
    if (
      event.title.includes(
        'https://designprosusa.com/energy_healer/api/success?token',
      ) &&
      event.loading === false
    ) {
      setShowGateway(false);
      setLoader(true);
      signUp();
    }
  };

  const showToast = msg => {
    ToastAndroid.show(msg, ToastAndroid.LONG);
  };

  const getLink = async () => {
    console.log('here');
    await axiosconfig
      .get('paypal_subscribe')
      .then(res => {
        console.log(JSON.stringify(res));
        const link = res?.data;
        setUrl(JSON.stringify(link));
      })
      .catch(err => {
        showToast(err.response.message);
        console.log(err.response.message);
      });
  };

  const signUp = async () => {
    await axiosconfig
      .post('store', data)
      .then(res => {
        const data = res?.data;
        if (data.access_token) {
          console.log(data.access_token);
          getAllMusic(data.access_token);
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
      <ImageBackground
        source={subcriptionBack}
        blurRadius={1}
        resizeMode={'cover'}
      >
        <View style={[s.container]}>
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
                  onPress={() => setShowGateway(true)}
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
                    {loader ? <ActivityIndicator /> : `Subscribe Now`}
                  </Text>
                </Button>
              </View>
            </View>
          </View>
        </View>
        {showGateway ? (
          <PaymentModal
            showGateway={showGateway}
            setShowGateway={setShowGateway}
            onMessage={onMessage}
            handleMessage={handleMessage}
            HTML={HTML}
          />
        ) : null}
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Subscribe;
