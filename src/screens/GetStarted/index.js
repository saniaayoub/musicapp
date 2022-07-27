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
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const GetStarted = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground source={background} blurRadius={5} resizeMode={'cover'}>
        <View style={[s.container, {width: width, height: height}]}>
          <View style={s.heading}>
            <LinearTextGradient
              style={{fontWeight: 'bold', fontSize: 72}}
              locations={[0, 1]}
              colors={['#C26AF8', '#25ADF9']}
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
            >
              <Text style={s.headingText}>Energy 4 Living</Text>
            </LinearTextGradient>
          </View>
          <View style={s.para}>
            <Text style={s.paraText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              pellentesque duis eleifend
            </Text>
          </View>

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
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default GetStarted;
