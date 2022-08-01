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
import playlistback from '../../assets/images/playlistback.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Button, Box} from 'native-base';
import {moderateScale} from 'react-native-size-matters';
import AppContext from '../../Providers/AppContext';
import Slider from 'react-native-slider';
import nowplayback from '../../assets/images/nowpb.png';
import play from '../../assets/images/play.png';
import Playbutton from '../../assets/images/playbutton.svg';
import backarrow from '../../assets/images/backarrow.png';
import nowplay from '../../assets/images/nowplay.png';
import Repeat from '../../assets/images/repeat.svg';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Collection2 = [
  {
    id: 1,
    image: require('../../assets/images/healing1.png'),
    text: 'Wait for a minute',
    description: 'Julie Watson And John Smith ',
  },
  {
    id: 2,
    image: require('../../assets/images/healing2.png'),
    text: 'Wait for a minute',
    description: 'Julie Watson And John Smith ',
  },
  {
    id: 3,
    image: require('../../assets/images/healing3.png'),
    text: 'Wait for a minute',
    description: 'Julie Watson And John Smith ',
  },
  {
    id: 4,
    image: require('../../assets/images/healing2.png'),
    text: 'Wait for a minute',
    description: 'Julie Watson And John Smith ',
  },
  {
    id: 5,
    image: require('../../assets/images/healing3.png'),
    text: 'Wait for a minute',
    description: 'Julie Watson And John Smith ',
  },
  {
    id: 6,
    image: require('../../assets/images/healing2.png'),
    text: 'Wait for a minute',
    description: 'Julie Watson And John Smith ',
  },
  {
    id: 7,
    image: require('../../assets/images/healing3.png'),
    text: 'Wait for a minute',
    description: 'Julie Watson And John Smith ',
  },
  {
    id: 8,
    image: require('../../assets/images/healing2.png'),
    text: 'Wait for a minute',
    description: 'Julie Watson And John Smith ',
  },
  {
    id: 9,
    image: require('../../assets/images/healing3.png'),
    text: 'Wait for a minute',
    description: 'Julie Watson And John Smith ',
  },
];

const NowPlaying = ({navigation}) => {
  const context = useContext(AppContext);
  const [play, setPlay] = useState(true);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground source={nowplay} resizeMode={'cover'}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={['rgba(0, 0, 0, 0)', 'rgba(194, 106, 248, 0.3)']}
        >
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
                <Image source={backarrow} resizeMode="contain" />
                {/* <Icon name={'arrow-circle-left'} color={'#fff'} size={25} /> */}
              </Button>
            </View>
            {/******** Head *********/}
            <View style={s.header}>
              <View style={s.heading}>
                <Text style={s.headingText}>Now Playing</Text>
              </View>
            </View>
            <ScrollView>
              <View style={s.section}>
                <View style={s.imageTop}>
                  <Image
                    source={nowplayback}
                    width={undefined}
                    height={undefined}
                    resizeMode={'cover'}
                  />
                  <View style={s.descriptionViewTop}>
                    <Text style={s.text1Top}>Wait for a minute</Text>
                    <Text style={s.text2Top}>Julie Watson And John Smith</Text>
                  </View>
                </View>
              </View>

              <View style={s.centerView}>
                <View style={s.row}>
                  <View style={s.descriptionView}>
                    <Text style={s.text1}>Wait for a minute</Text>
                  </View>
                </View>

                <Slider thumbStyle={s.thumb} trackStyle={s.track} />
                <View style={s.timer}>
                  <Text style={s.text2}>01.20</Text>
                  <Text style={s.text2}>03.40</Text>
                </View>
              </View>

              <View style={[s.centerView1, s.row]}>
                <Button
                  size="sm"
                  // onPress={() => navigation.goBack()}
                  variant={'link'}
                  zIndex={1000}
                >
                  <Icon
                    name="random"
                    color={'#fff'}
                    size={moderateScale(24, 0.1)}
                  />
                </Button>
                <Button
                  size="sm"
                  // onPress={() => navigation.goBack()}
                  variant={'link'}
                  zIndex={1000}
                  marginLeft={moderateScale(20, 0.1)}
                  marginRight={moderateScale(-20, 0.1)}
                >
                  <Icon
                    name="backward"
                    color={'#fff'}
                    size={moderateScale(30, 0.1)}
                  />
                </Button>
                {play ? (
                  <Button
                    size="sm"
                    onPress={() => setPlay(!play)}
                    variant={'link'}
                    zIndex={1000}
                  >
                    <Icon
                      name="play-circle"
                      color={'#fff'}
                      size={moderateScale(59, 0.1)}
                    />
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    onPress={() => setPlay(!play)}
                    variant={'link'}
                    zIndex={1000}
                  >
                    <Icon
                      name="pause-circle"
                      color={'#fff'}
                      size={moderateScale(59, 0.1)}
                    />
                  </Button>
                )}
                <Button
                  size="sm"
                  // onPress={() => navigation.goBack()}
                  variant={'link'}
                  zIndex={1000}
                  marginLeft={moderateScale(-20, 0.1)}
                  marginRight={moderateScale(20, 0.1)}
                >
                  <Icon
                    name="forward"
                    color={'#fff'}
                    size={moderateScale(30, 0.1)}
                  />
                </Button>
                <Button
                  size="sm"
                  // onPress={() => navigation.goBack()}
                  variant={'link'}
                  zIndex={1000}
                >
                  <Repeat
                    width={moderateScale(24, 0.1)}
                    height={moderateScale(24, 0.1)}
                  />
                </Button>
              </View>
            </ScrollView>
          </View>
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default NowPlaying;
