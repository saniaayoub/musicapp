import {
  SafeAreaView,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
import CameraOpt from '../../Components/CameraOpt';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RBSheet from 'react-native-raw-bottom-sheet';
import {setMusic, setUserToken} from '../../Redux/actions';
import {useDispatch} from 'react-redux';
import SubsModal from '../../Components/subsModal';

const Profile = ({navigation}) => {
  const dispatch = useDispatch();
  const refRBSheet = useRef();
  const isFocused = useIsFocused();
  let token = useSelector(state => state.reducer.userToken);
  const [fname, setFname] = useState('');
  const [email, setEmail] = useState('');
  const [phNumber, setPhNumber] = useState('');
  const [field, setField] = useState('');
  const [title, setTitle] = useState('');
  const [gender, setGender] = useState('Female');
  const [image, setImage] = useState();
  const [id, setId] = useState();
  const [subsStatus, setSubsStatus] = useState();
  const [openSheet, setOpenSheet] = useState(false);
  const [subModal, setSubModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [loader2, setLoader2] = useState(false);

  useEffect(() => {
    getData();
  }, [isFocused]);

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
    console.log(item.name);
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
    console.log('calling');
    setFname(data?.name);
    setEmail(data?.email);
    setPhNumber(data?.phone_number);
    setGender(data?.gender);
    setImage(data?.image);
    setId(data?.id);
    setSubsStatus(data?.subscriber_status);
  };

  const save = async (i, base64) => {
    setLoader(true);
    let body = {};
    if (i == 'image') {
      body = {
        image: base64,
      };
    } else {
      body = {
        name: fname,
        email: email,
        phone_number: phNumber,
        gender: gender,
      };
    }
    console.log(body, 'body');
    await axiosconfig
      .post('user_update', body, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        console.log(res.data, 'message');
        let message = res?.data?.messsage;
        showToast(message);
        setLoader(false);
      })
      .catch(err => {
        console.log(err);
        setLoader(false);
        console.log(err);
        showToast(err.message);
      });
  };

  const convertImage = async image => {
    await RNFS.readFile(image, 'base64')
      .then(res => {
        let base64 = `data:image/png;base64,${res}`;
        setImage(base64);
        save('image', base64);
      })
      .catch(err => {
        console.log(err);
        showToast('Profile picture not updated');
        setLoader(false);
      });
  };

  const logout = async () => {
    console.log('logout');
    await AsyncStorage.removeItem('@auth_token');
    await AsyncStorage.removeItem('music');
    dispatch(setUserToken(null));
    dispatch(setMusic([]));
    // navigation.navigate('SignIn');
  };

  const cancelSubs = async () => {
    setLoader2(true);
    const body = {
      userId: id,
    };
    await axiosconfig
      .post('subscription_cancel', body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        console.log('response', res.data);
        const message = res?.data?.messsage;
        setSubsStatus('0');
        showToast(message);
        setSubModal(false);
        setLoader2(false);
      })
      .catch(err => {
        setLoader2(false);
        console.log(err.response);
        showToast('Cannot Unsubscribe');
        setSubModal(false);
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
          {subsStatus !== '0' ? (
            <View style={s.logout}>
              <Button
                size="md"
                onPress={() => setSubModal(true)}
                variant={'link'}
                zIndex={1000}
                position={'absolute'}
                right={moderateScale(45, 0.1)}
                top={moderateScale(5, 0.1)}
              >
                <MaterialCommunityIcons
                  name={'tag-remove-outline'}
                  size={moderateScale(25, 0.1)}
                  color={'#fff'}
                />
              </Button>
            </View>
          ) : null}

          <View style={s.logout}>
            <Button
              size="md"
              onPress={() => logout()}
              variant={'link'}
              zIndex={1000}
              position={'absolute'}
              right={moderateScale(5, 0.1)}
              top={moderateScale(5, 0.1)}
            >
              <MaterialIcon
                name={'logout'}
                size={moderateScale(25, 0.1)}
                color={'#fff'}
              />
            </Button>
          </View>
          <View style={s.heading}>
            <Text style={s.headingText}>Profile</Text>
          </View>
          <View style={s.profileSection}>
            <View style={s.profileimg}>
              <Image
                source={image ? {uri: image} : profileimg}
                style={s.imageStyle}
              />
            </View>

            <TouchableOpacity
              style={s.edit}
              onPress={() => refRBSheet.current.open()}
            >
              <Edit
                width={moderateScale(24, 0.1)}
                height={moderateScale(24, 0.1)}
              />
            </TouchableOpacity>
            <View style={{marginTop: moderateScale(-15, 0.1)}}>
              <Text style={s.profileName}>{fname ? fname : `user`}</Text>
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
                onPress={() => save('data')}
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
            <RBSheet
              ref={refRBSheet}
              closeOnDragDown={true}
              closeOnPressMask={false}
              customStyles={{
                wrapper: {
                  backgroundColor: '#0000007a',
                },
                draggableIcon: {
                  backgroundColor: '#000',
                },
                container: {
                  borderTopLeftRadius: moderateScale(20, 0.1),
                  borderTopRightRadius: moderateScale(20, 0.1),
                  height: 120,
                },
              }}
            >
              <CameraOpt convertImage={convertImage} refRBSheet={refRBSheet} />
            </RBSheet>
          </View>
        </ScrollView>
        {subModal ? (
          <SubsModal
            loader={loader2}
            subModal={subModal}
            setSubModal={setSubModal}
            cancelSubs={cancelSubs}
          />
        ) : (
          <></>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Profile;
