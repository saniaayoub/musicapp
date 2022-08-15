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
import {LinearTextGradient} from 'react-native-text-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Button} from 'native-base';
import {moderateScale} from 'react-native-size-matters';
import Lock from '../../assets/images/lock.svg';
import Title from '../../assets/images/title.svg';
import title from '../../assets/images/title.png';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const GetStarted = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
      <ImageBackground source={background} blurRadius={5} resizeMode={'cover'}>
        <View style={[s.container, {width: width, height: height}]}>
          <View></View>
          <View>
            <View style={s.heading}>
              <Image
                source={title}
                width={undefined}
                height={undefined}
                resizeMode={'contain'}
              />
              {/* <Title
                width={moderateScale(282, 0.1)}
                height={moderateScale(70, 0.1)}
              /> */}
            </View>
            <View style={s.para}>
              <Text style={s.paraText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                pellentesque duis eleifend
              </Text>
            </View>
          </View>
          <View></View>
        </View>
      </ImageBackground>
      <View style={s.button}>
        <Button
          size="sm"
          onPress={() => navigation.navigate('SignIn')}
          variant={'solid'}
          _text={{
            color: '#6627EC',
          }}
          backgroundColor={'transparent'}
          borderRadius={50}
          borderWidth={1}
          borderColor={'#fff'}
          w={moderateScale(151, 0.1)}
          h={moderateScale(35, 0.1)}
          alignItems={'center'}
          style={s.shadow}
        >
          <Text style={s.btnText}>Get Start Now</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default GetStarted;
