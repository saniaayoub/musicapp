import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import React, {useContext, useEffect, useState, useRef} from 'react';

import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Button, Box} from 'native-base';
import {moderateScale} from 'react-native-size-matters';
import s from './style';
import profileimg from '../../assets/images/profileimg.png';
import Phone from '../../assets/images/phone.svg';
import User from '../../assets/images/user.svg';
import Edit1 from '../../assets/images/edit2.svg';
import Edit from '../../assets/images/edit.svg';
import Backarrowsvg from '../../assets/images/backarrow.svg';
import RadioButton from '../../Components/radio';
import RawBottomSheet from '../../Components/rawBottomSheet';
import {useSelector} from 'react-redux';
import axiosconfig from '../../Providers/axios';
import RNFS from 'react-native-fs';

const Profile = ({navigation}) => {
  let token = useSelector(state => state.reducer.userToken);

  const [fname, setFname] = useState('');
  const [email, setEmail] = useState('');
  const [phNumber, setPhNumber] = useState('');
  const [field, setField] = useState('');
  const [title, setTitle] = useState('');
  const [gender, setGender] = useState('Female');
  const [image, setImage] = useState('');
  const [openSheet, setOpenSheet] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const [isSelected, setIsSelected] = useState([
    {
      id: 1,
      value: true,
      name: 'Male',
      selected: gender == 'Male' ? true : false,
    },
    {
      id: 2,
      value: false,
      name: 'Female',
      selected: gender == 'Female' ? true : false,
    },
  ]);

  const onRadioBtnClick = item => {
    let updatedState = isSelected.map(isSelectedItem =>
      isSelectedItem.id === item.id
        ? {...isSelectedItem, selected: true}
        : {...isSelectedItem, selected: false},
    );
    setIsSelected(updatedState);
    setGender(item.name);
    console.log(gender);
  };
  const showToast = msg => {
    ToastAndroid.show(msg, ToastAndroid.LONG);
  };

  const getData = async () => {
    setLoader(true);
    axiosconfig
      .get('user_view', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        console.log('data', JSON.stringify(res.data));

        setLoader(false);
        if (res.data) {
          setData(res.data);
        }
      })
      .catch(err => {
        setLoader(false);
        console.log(err.response);
      });
  };
  const setData = data => {
    setFname(data?.name);
    setEmail(data?.email);
    setPhNumber(data?.phone_number);
    setGender(data?.gender);
  };

  const save = async () => {
    const body = {
      name: fname,
      email: email,
      phone_number: phNumber,
      gender: gender,
      image: image,
    };
    await axiosconfig
      .post('user_update', body, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        console.log(res.data);
        let message = res?.data?.messsage;
        showToast(message);
        setLoader(false);
      })
      .catch(err => {
        console.log(err);
        setLoader(false);
        showToast(err.message);
      });
  };

  const convertImage = () => {
    setLoader(true);
    RNFS.readFile(
      'https://lh3.googleusercontent.com/i7cTyGnCwLIJhT1t2YpLW-zHt8ZKalgQiqfrYnZQl975-ygD_0mOXaYZMzekfKW_ydHRutDbNzeqpWoLkFR4Yx2Z2bgNj2XskKJrfw8',
      'base64',
    ).then(res => {
      setImage(res);
      save();
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={[s.container]}>
        <View style={s.backbutton}>
          <Button
            size="sm"
            onPress={() => navigation.goBack()}
            variant={'solid'}
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
        {/******** Head *********/}
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          colors={['rgba(0, 0, 0, 1)', 'rgba(194, 106, 248, 1)']}
          style={s.header}
        >
          <View style={s.heading}>
            <Text style={s.headingText}>Profile</Text>
          </View>
          <View style={s.profileSection}>
            <View style={s.profileimg}>
              <Image
                source={profileimg}
                width={undefined}
                height={undefined}
                resizeMode={'contain'}
              />
            </View>

            <TouchableOpacity style={s.edit}>
              <Edit
                width={moderateScale(24, 0.1)}
                height={moderateScale(24, 0.1)}
              />
            </TouchableOpacity>
            <View style={{marginTop: moderateScale(-15, 0.1)}}>
              <Text style={s.profileName}>Aliya Smith</Text>
            </View>
          </View>
        </LinearGradient>
        <ScrollView>
          <View style={s.inputSection}>
            <View style={s.input}>
              <Input
                w={{
                  base: '85%',
                  md: '15%',
                }}
                isReadOnly={true}
                variant="underlined"
                color={'#000'}
                fontSize={moderateScale(12, 0.1)}
                InputLeftElement={
                  <View style={s.icon}>
                    <User
                      width={moderateScale(30, 0.1)}
                      height={moderateScale(30, 0.1)}
                    />
                  </View>
                }
                InputRightElement={
                  <TouchableOpacity
                    style={s.icon}
                    onPress={() => {
                      setTitle('Full Name');
                      setField(fname);
                      setTimeout(() => {
                        setOpenSheet(true);
                      }, 100);
                    }}
                  >
                    <Edit1
                      width={moderateScale(28, 0.1)}
                      height={moderateScale(28, 0.1)}
                    />
                  </TouchableOpacity>
                }
                value={fname}
                placeholder="Full Name"
                placeholderTextColor={'#3E3E3E'}
              />
            </View>
            <View style={s.input}>
              <Input
                w={{
                  base: '85%',
                  md: '15%',
                }}
                variant="underlined"
                InputLeftElement={
                  <View style={s.iconCircle}>
                    <Icon name={'envelope'} color="#C8C4C4" size={18} />
                  </View>
                }
                isReadOnly={true}
                InputRightElement={
                  <TouchableOpacity
                    style={s.icon}
                    onPress={() => {
                      setTitle('Email');
                      setField(email);
                      setTimeout(() => {
                        setOpenSheet(true);
                      }, 100);
                    }}
                  >
                    <Edit1
                      width={moderateScale(28, 0.1)}
                      height={moderateScale(28, 0.1)}
                    />
                  </TouchableOpacity>
                }
                value={email}
                placeholder="Email"
                placeholderTextColor={'#3E3E3E'}
                color={'#000'}
                fontSize={moderateScale(12, 0.1)}
              />
            </View>
            <View style={s.input}>
              <Input
                w={{
                  base: '85%',
                  md: '15%',
                }}
                isReadOnly={true}
                variant="underlined"
                InputLeftElement={
                  <View style={s.icon}>
                    <Phone
                      width={moderateScale(30, 0.1)}
                      height={moderateScale(30, 0.1)}
                    />
                  </View>
                }
                value={phNumber}
                InputRightElement={
                  <TouchableOpacity
                    style={s.icon}
                    onPress={() => {
                      setTitle('Phone Number');
                      setField(phNumber);
                      setTimeout(() => {
                        setOpenSheet(true);
                      }, 100);
                    }}
                  >
                    <Edit1
                      width={moderateScale(28, 0.1)}
                      height={moderateScale(28, 0.1)}
                    />
                  </TouchableOpacity>
                }
                placeholder="Phone Number"
                placeholderTextColor={'#3E3E3E'}
                color={'#000'}
                fontSize={moderateScale(12, 0.1)}
                keyboardType={'numeric'}
              />
            </View>
            <View style={s.radioInput}>
              <Text style={s.text}>Gender</Text>
              {isSelected.map((item, i) => (
                <View style={s.radio} key={i}>
                  <RadioButton
                    onPress={() => onRadioBtnClick(item)}
                    selected={item.selected}
                    key={item.id}
                  >
                    {item.name}
                  </RadioButton>
                </View>
              ))}
            </View>

            <View style={s.button}>
              <Button
                size="sm"
                onPress={() => convertImage()}
                variant={'solid'}
                backgroundColor={'#C26AF8'}
                borderRadius={50}
                w={moderateScale(140, 0.1)}
                h={moderateScale(35, 0.1)}
                alignItems={'center'}
              >
                <Text style={s.btnText}>
                  {loader ? <ActivityIndicator /> : `Save`}
                </Text>
              </Button>
            </View>
            {openSheet ? (
              <RawBottomSheet
                title={title}
                field={field}
                setValue={
                  title == 'Full Name'
                    ? setFname
                    : title == 'Email'
                    ? setEmail
                    : title == 'Phone Number'
                    ? setPhNumber
                    : null
                }
                openSheet={openSheet}
                setOpenSheet={setOpenSheet}
              />
            ) : (
              <></>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
