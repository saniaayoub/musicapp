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
} from 'react-native';
import React, {useContext, useState} from 'react';
import s from './style';
import LinearGradient from 'react-native-linear-gradient';
import profileimg from '../../assets/images/profileimg.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Button, Box} from 'native-base';
import {moderateScale} from 'react-native-size-matters';
import AppContext from '../../Providers/AppContext';
import Slider from 'react-native-slider';
import Phone from '../../assets/images/phone.svg';
import User from '../../assets/images/user.svg';
import Edit1 from '../../assets/images/edit2.svg';
import Edit from '../../assets/images/edit.svg';
import backarrow from '../../assets/images/backarrow.png';
import Backarrowsvg from '../../assets/images/backarrow.svg';

import Lock from '../../assets/images/lock.svg';
import RadioButton from '../../Components/radio';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Playlist = ({navigation}) => {
  const context = useContext(AppContext);
  const [isSelected, setIsSelected] = useState([
    {id: 1, value: true, name: 'Male', selected: true},
    {id: 2, value: false, name: 'Female', selected: false},
  ]);
  const onRadioBtnClick = item => {
    let updatedState = isSelected.map(isSelectedItem =>
      isSelectedItem.id === item.id
        ? {...isSelectedItem, selected: true}
        : {...isSelectedItem, selected: false},
    );
    setIsSelected(updatedState);
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
            {/* <Image source={backarrow} resizeMode="contain" /> */}
            <Backarrowsvg
              width={moderateScale(14, 0.1)}
              height={moderateScale(14, 0.1)}
            />
            {/* <Icon name={'arrow-circle-left'} color={'#fff'} size={25} /> */}
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
              {/* <Icon name={'pencil'} size={10} color={'#fff'} /> */}
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
                variant="underlined"
                color={'#000'}
                fontSize={moderateScale(12, 0.1)}
                InputLeftElement={
                  <View style={s.icon}>
                    {/* <Icon name={'user'} color="#C8C4C4" size={20} /> */}
                    <User
                      width={moderateScale(30, 0.1)}
                      height={moderateScale(30, 0.1)}
                    />
                  </View>
                }
                InputRightElement={
                  <TouchableOpacity style={s.icon}>
                    {/* <Icon name={'pencil'} size={10} color={'#fff'} /> */}
                    <Edit1
                      width={moderateScale(28, 0.1)}
                      height={moderateScale(28, 0.1)}
                    />
                  </TouchableOpacity>
                }
                placeholder="Full Name"
                placeholderTextColor={'#3E3E3E'}
                ke
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
                InputRightElement={
                  <TouchableOpacity style={s.icon}>
                    {/* <Icon name={'pencil'} size={10} color={'#fff'} /> */}
                    <Edit1
                      width={moderateScale(28, 0.1)}
                      height={moderateScale(28, 0.1)}
                    />
                  </TouchableOpacity>
                }
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
                variant="underlined"
                InputLeftElement={
                  <View style={s.icon}>
                    {/* <Icon name={'phone'} color="#C8C4C4" size={20} /> */}
                    <Phone
                      width={moderateScale(30, 0.1)}
                      height={moderateScale(30, 0.1)}
                    />
                  </View>
                }
                InputRightElement={
                  <TouchableOpacity style={s.icon}>
                    {/* <Icon name={'pencil'} size={10} color={'#fff'} /> */}
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
              {isSelected.map(item => (
                <View style={s.radio}>
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
                onPress={() => navigation.navigate('Subscribe')}
                variant={'solid'}
                _text={{
                  color: '#6627EC',
                }}
                backgroundColor={'#C26AF8'}
                borderRadius={50}
                w={moderateScale(140, 0.1)}
                h={moderateScale(35, 0.1)}
                alignItems={'center'}
                style={s.shadow}
              >
                <Text style={s.btnText}>Save</Text>
              </Button>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Playlist;
