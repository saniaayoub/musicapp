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
import playlistback from '../../assets/images/playlistback.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Button, Box} from 'native-base';
import {moderateScale} from 'react-native-size-matters';
import AppContext from '../../Providers/AppContext';
import Slider from 'react-native-slider';
import healing1 from '../../assets/images/healing1.png';
import play from '../../assets/images/play.png';
import Playbutton from '../../assets/images/playbutton.svg';
import backarrow from '../../assets/images/backarrow.png';
import trackback from '../../assets/images/trackback.png';

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

const Playlist = ({navigation}) => {
  const context = useContext(AppContext);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        source={playlistback}
        blurRadius={5}
        resizeMode={'cover'}>
        <Box
          bg={{
            linearGradient: {
              colors: ['#000000', '#C26AF8'],
              start: [0, 0],
              end: [0, 1],
            },
          }}
          opacity={0.7}>
          <View style={[s.container]}>
            <View style={s.backbutton}>
              <Button
                size="sm"
                onPress={() => navigation.goBack()}
                variant={'solid'}
                backgroundColor={'#fff'}
                borderRadius={moderateScale(14, 0.1)}
                padding={moderateScale(7, 0.1)}
                zIndex={1000}>
                <Image source={backarrow} resizeMode="contain" />
                {/* <Icon name={'arrow-circle-left'} color={'#fff'} size={25} /> */}
              </Button>
            </View>
            {/******** Head *********/}
            <View style={s.header}>
              <View style={s.heading}>
                <Text style={s.headingText}>Playlist</Text>
              </View>
            </View>
            <ScrollView>
              <View style={s.section}>
                <View style={s.imageTop}>
                  <Image
                    source={trackback}
                    width={undefined}
                    height={undefined}
                    resizeMode={'cover'}
                  />
                </View>
                <View style={s.descriptionViewTop}>
                  <Text style={s.text1Top}>Wait for a minute</Text>
                  <Text style={s.text2Top}>Julie Watson And John Smith</Text>
                </View>
              </View>

              <View style={s.collection}>
                {Collection2.map(item => {
                  return (
                    <>
                      <View style={s.item} key={item.id}>
                        <TouchableOpacity style={s.image}>
                          <ImageBackground
                            source={item.image}
                            resizeMode={'cover'}
                            width={undefined}
                            height={undefined}>
                            <View style={s.innerView}>
                              <Image
                                source={play}
                                width={undefined}
                                height={undefined}
                                resizeMode={'cover'}
                              />
                            </View>
                          </ImageBackground>
                        </TouchableOpacity>
                        <View style={s.centerView}>
                          <View style={s.row}>
                            <View style={s.descriptionView}>
                              <Text style={s.text1}>{item.text}</Text>
                              <Text style={s.text2}>{item.description}</Text>
                            </View>
                            <TouchableOpacity style={s.playbutton}>
                              <Playbutton
                                width={moderateScale(25, 0.1)}
                                height={moderateScale(24, 0.1)}
                                resizeMode={'contain'}
                              />
                            </TouchableOpacity>
                          </View>

                          <Slider thumbStyle={s.thumb} trackStyle={s.track} />
                          <View style={s.timer}>
                            <Text style={s.text2}>00.00</Text>
                            <Text style={s.text2}>03.20</Text>
                          </View>
                        </View>
                      </View>
                    </>
                  );
                })}
              </View>
            </ScrollView>
          </View>
        </Box>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Playlist;
