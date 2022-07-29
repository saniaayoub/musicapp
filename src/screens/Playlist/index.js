import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
} from 'react-native';
import React, {useContext, useState} from 'react';
import s from './style';
import playlistback from '../../assets/images/playlistback.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Button, Box} from 'native-base';
import {moderateScale} from 'react-native-size-matters';
import AppContext from '../../Providers/AppContext';
import healing1 from '../../assets/images/healing1.png';
import play from '../../assets/images/play.png';
import Playbutton from '../../assets/images/playbutton.svg';
import backarrow from '../../assets/images/backarrow.png';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Playlist = () => {
  const context = useContext(AppContext);
  const subscribe = () => {
    context.setUserToken('1');
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground source={playlistback} resizeMode={'cover'}>
        <Box
          bg={{
            linearGradient: {
              colors: ['#000000', '#C26AF8'],
              start: [0, 0],
              end: [0, 1],
            },
          }}
          opacity={0.7}
        >
          <View style={[s.container, {width: width, height: height}]}>
            <View style={s.fixed}>
              <View style={s.backbutton}>
                <Button
                  size="sm"
                  onPress={() => navigation.goBack()}
                  variant={'link'}
                  backgroundColor={'#fff'}
                  borderRadius={moderateScale(14, 0.1)}
                  padding={moderateScale(7, 0.1)}
                >
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
            </View>
          </View>
        </Box>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Playlist;
