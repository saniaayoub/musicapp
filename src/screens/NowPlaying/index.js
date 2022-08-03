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

import React, {useContext, useEffect, useState} from 'react';
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
import Loop from '../../assets/images/loopgrey.svg';
import SoundPlayer from 'react-native-sound-player';
import Heart from '../../assets/images/heart.svg';
import moment from "moment";
import song1 from '../../assets/audio/seeyouagain.mp3';
import Sound from 'react-native-sound';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const NowPlaying = ({navigation, route}) => {
  const context = useContext(AppContext);
  const [data, setData] = useState(route.params?.data);
  const [allSongs, setAllSongs] = useState(context.songs);
  const [play, setPlay] = useState('stop');
  const [random, setRandom] = useState(false);
  const [loop, setLoop] = useState(false);
  const [fav, setFav] = useState(false);
  const [favList, setFavList] = useState(context.favList);

  const playSong = url => {
    if (play === 'stop') {
      setPlay('play');
      SoundPlayer.playUrl(url);
      context.setSongState('play');
    }
    if (play === 'pause') {
      SoundPlayer.resume();
      setPlay('play');
      setTimeout(() => {
        getInfo();
      },500);
      context.setSongState('play');
    }
    if (play === 'play') {
      SoundPlayer.pause();
      setPlay('pause');
      context.setSongState('pause');
    }
  };

  const stopSong = () => {
    SoundPlayer.pause();
  };

  const addToFavList = data => {
    setFav(true);
    context.setFavList([...context.favList, data]);
    setTimeout(() => {
      console.log(favList);
    }, 2000);
  };

  const remFromList = data => {
    setFav(false);
    let tempArray = [];

    tempArray = allSongs.map(elem => {
      if (elem.id === data.id) {
        data.fav = false;
      }
    });
    context.setFavList(tempArray);
    console.log(tempArray);
  };

  useEffect(() => {
    setPlay('stop');
    SoundPlayer.stop();
    playSong(data.url);
  }, []);
  async function getInfo() {
    try {
      const info = await SoundPlayer.getInfo(); // Also, you need to await this because it is async
      console.log('getInfo', info, moment.utc(info.duration *1000).format('mm:ss'));
      setunFormatcurrentTime(info.currentTime)
      setDuration(moment.utc(info.duration *1000).format('mm:ss'));
      setCurrentTime(moment.utc(info.currentTime *1000).format('mm:ss'))
      
    } catch (e) {
      console.log('There is no song playing', e);
    }
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground source={nowplay} resizeMode={'cover'}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={['rgba(0, 0, 0, 0)', 'rgba(194, 106, 248, 0.3)']}>
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
                    <Text style={s.text1Top}>{data.text}</Text>
                    <Text style={s.text2Top}>{data.description}</Text>
                  </View>
                </View>
              </View>

              <View style={s.centerView}>
                <View style={s.row}>
                  <View style={s.descriptionView}>
                    <Text style={s.text1}>{data.text}</Text>
                  </View>
                  <View style={s.heart}>
                    <Button
                      size="sm"
                      onPress={() => {
                        {
                          data.fav ? remFromList(data) : addToFavList(data);
                        }
                      }}
                      variant={'link'}
                      zIndex={1000}
                    >
                      {data.fav ? (
                        <Icon
                          name={'heart'}
                          color={'#fff'}
                          size={moderateScale(20, 0.1)}
                        />
                      ) : (
                        <Icon
                          name={'heart-o'}
                          color={'#fff'}
                          size={moderateScale(20, 0.1)}
                        />
                      )}
                    </Button>
                  </View>
                </View>

                <Slider
                value={Number(unFormatcurrentTime)}
                onValueChange={sliderValue => console.log("hello")}
                step={1}
                maximumValue={1000}
                  thumbStyle={s.thumb}
                  trackStyle={s.track}
                />
                <View style={s.timer}>
                  <Text style={[s.text2,{fontSize:20}]}>{currentTime}</Text>
                  <Text style={[s.text2,{fontSize:20}]}>{duration}</Text>
                </View>
              </View>

              <View style={[s.centerView1, s.row]}>
                <Button
                  size="sm"
                  onPress={() => setRandom(!random)}
                  variant={'link'}
                  zIndex={1000}>
                  <Icon
                    name="random"
                    color={random ? '#fff' : '#808080'}
                    size={moderateScale(24, 0.1)}
                  />
                </Button>
                <Button
                  size="sm"
                  // onPress={() => navigation.goBack()}
                  variant={'link'}
                  zIndex={1000}
                  marginLeft={moderateScale(20, 0.1)}
                  marginRight={moderateScale(-20, 0.1)}>
                  <Icon
                    name="backward"
                    color={'#fff'}
                    size={moderateScale(30, 0.1)}
                  />
                </Button>
                {play === 'play' ? (
                  <Button
                    size="sm"
                    onPress={() => {
                      setPlay('pause');
                      stopSong();
                    }}
                    variant={'link'}
                    zIndex={1000}>
                    <Icon
                      name="pause-circle"
                      color={'#fff'}
                      size={moderateScale(59, 0.1)}
                    />
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    onPress={() => {
                      setPlay('play');
                      playSong(data.url);
                    }}
                    variant={'link'}
                    zIndex={1000}>
                    <Icon
                      name="play-circle"
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
                  marginRight={moderateScale(20, 0.1)}>
                  <Icon
                    name="forward"
                    color={'#fff'}
                    size={moderateScale(30, 0.1)}
                  />
                </Button>
                <Button
                  size="sm"
                  onPress={() => setLoop(!loop)}
                  variant={'link'}
                  zIndex={1000}
                >
                  {loop ? (
                    <Repeat
                      width={moderateScale(24, 0.1)}
                      height={moderateScale(24, 0.1)}
                    />
                  ) : (
                    <Loop
                      width={moderateScale(24, 0.1)}
                      height={moderateScale(24, 0.1)}
                    />
                  )}
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
