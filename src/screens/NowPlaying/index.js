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

import React, {useContext, useEffect, useState} from 'react';
import s from './style';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Input, Button, Box} from 'native-base';
import {moderateScale} from 'react-native-size-matters';
import AppContext from '../../Providers/AppContext';
import Slider from 'react-native-slider';
import backarrow from '../../assets/images/backarrow.png';
import nowplay from '../../assets/images/nowplay.png';
import Songs from '../../Components/songs';
import moment from 'moment';

import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import styles from './style';
import Backarrowsvg from '../../assets/images/backarrow.svg';

const NowPlaying = ({navigation, route}) => {
  const context = useContext(AppContext);
  const progress = useProgress();
  const state = TrackPlayer.getState();
  const [playPause, setPlayPause] = useState('pause');
  const [playObject, setPlayObject] = useState();
  const [repeat, setRepeat] = useState('off');
  const [shuffle, setShuffle] = useState(false);
  const [shuffleArr, setShuffleArr] = useState();
  useEffect(() => {
    TrackPlayer.setRepeatMode(RepeatMode.Off);
    console.log(route.params.data);
    if (route.params.index) {
      TrackPlayer.skip(route.params.index);
      play('play');
    }
  }, []);

  const showToast = msg => {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  };

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    // if (event.type === Event.PlaybackTrackChanged && event.nextTrack != null) {
    //   const track = await TrackPlayer.getTrack(event.nextTrack);
    //   trackObject();
    //   const {title} = track || {};
    //   console.log(track, 'track');
    // } else {
    //   setPlayPause('pause');
    // }

    if (
      event.type === Event.PlaybackTrackChanged &&
      event.nextTrack != null &&
      !shuffle
    ) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      trackObject();
      const {title} = track || {};
      console.log(track, 'track');
    } else if (shuffle) {
      let randomIndex = Math.floor(Math.random() * 8);
      TrackPlayer.skip(randomIndex);
      TrackPlayer.play();
      trackObject();
    } else {
      setPlayPause('pause');
    }
  });

  const next = async () => {
    await TrackPlayer.pause().then((res)=>{
       TrackPlayer.skipToNext()
      .then(() => {
        TrackPlayer.play();
        setPlayPause('play');
        trackObject();
      })
      .catch(err => {
        showToast(err.toString().substring(6, 40));
      });
    })
    
  };

  const previous = async () => {
    await TrackPlayer.pause().then((res)=>{
      TrackPlayer.skipToPrevious()
      .then(() => {
        TrackPlayer.play();
        setPlayPause('play');
        trackObject();
      })
      .catch(err => {
        showToast(err.toString().substring(6, 40));
      });
    })
  };

  const play = async c => {
    if (c == 'play') {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
    trackObject();
    setPlayPause(c);
    // await TrackPlayer.setRepeatMode(RepeatMode.Queue);
  };

  const trackObject = async () => {
    let trackIndex = await TrackPlayer.getCurrentTrack();
    let trackObject = await TrackPlayer.getTrack(trackIndex);
    // if (!trackObject) {
    //   showToast('hi');
    // }
    console.log(trackObject);
    setPlayObject(trackObject);
  };

  const changeRepeatMode = () => {
    if (repeat == 'off') {
      TrackPlayer.setRepeatMode(RepeatMode.Track);
      setRepeat('track');
    }
    if (repeat == 'track') {
      TrackPlayer.setRepeatMode(RepeatMode.Queue);
      setRepeat('repeat');
    }
    if (repeat == 'repeat') {
      TrackPlayer.setRepeatMode(RepeatMode.Off);
      setRepeat('off');
    }
  };

  const shuffleSings = async () => {
    if (shuffle) {
      setShuffle(false);
      TrackPlayer.remove([0, 1, 2, 3, 4, 5, 6, 8]);
      TrackPlayer.add(Songs);
      let queue = await TrackPlayer.getQueue();
      console.log(queue);
    } else {
      console.log('hi'); //shuffle true
      setShuffle(true);
      let temp = [...Songs];
      let shuffled = shuffleArray(temp);
      await TrackPlayer.remove([0, 1, 2, 3, 4, 5, 6, 8]);
      TrackPlayer.add(shuffled);
      let queue = await TrackPlayer.getQueue();
      console.log(queue);
    }
  };

  const shuffleArray = array => {
    let currentIndex = array.length - 1,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
      currentIndex -= 1;
    }
    return array;
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground source={nowplay} resizeMode={'cover'}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={['rgba(0,0,0,0)', 'rgba(194, 106, 248, 0.5)']}
        >
          <View style={[s.container]}>
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
                    source={playObject?.artwork}
                    width={'100%'}
                    height={'100%'}
                    resizeMode={'cover'}
                    style={{width: '100%', height: '100%'}}
                  />
                  <View style={s.descriptionViewTop}>
                    <LinearGradient
                      start={{x: 0, y: 0}}
                      end={{x: 0, y: 1}}
                      colors={['rgba(0, 0, 0, 0)', 'rgba(194, 106, 248, 0.5))']}
                    >
                      <Text style={s.text1Top}>{playObject?.title}</Text>
                      <Text style={s.text2Top}>{playObject?.artist}</Text>
                    </LinearGradient>
                  </View>
                </View>
              </View>

              <View style={s.centerView}>
                <View style={s.row}>
                  <View style={s.descriptionView}>
                    <Text style={s.text1}>{playObject?.title}</Text>
                  </View>
                  <View style={s.heart}>
                    <Button size="sm" variant={'link'} zIndex={1000}>
                      <Icon
                        name={'heart-o'}
                        color={'#fff'}
                        size={moderateScale(20, 0.1)}
                      />
                    </Button>
                  </View>
                </View>

                <Slider
                  value={progress.position}
                  minimumValue={0}
                  maximumValue={progress.duration}
                  onSlidingComplete={async value => {
                    await TrackPlayer.seekTo(value);
                  }}
                  thumbStyle={s.thumb}
                  trackStyle={s.track}
                />
                <View style={s.timer}>
                  <Text style={[s.text2, {fontSize: 12}]}>
                    {new Date(progress.position * 1000)
                      .toString()
                      .substring(19, 24)}
                  </Text>
                  <Text style={[s.text2, {fontSize: 12}]}>
                    {new Date(progress.duration * 1000)
                      .toString()
                      .substring(19, 24)}
                  </Text>
                </View>
              </View>

              <View style={[s.centerView1, s.row]}>
                <TouchableOpacity
                  onPress={() => {
                    shuffleSings();
                  }}
                >
                  <MaterialIcon
                    name={shuffle ? 'shuffle-variant' : 'shuffle-disabled'}
                    color={'#fff'}
                    size={moderateScale(30, 0.1)}
                  />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => previous()}>
                  <Icon
                    name="backward"
                    color={'#fff'}
                    size={moderateScale(30, 0.1)}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => play(playPause == 'play' ? 'pause' : 'play')}
                >
                  <Icon
                    name={playPause == 'play' ? 'pause-circle' : 'play-circle'}
                    color={'#fff'}
                    size={moderateScale(59, 0.1)}
                  />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => next()}>
                  <Icon
                    name="forward"
                    color={'#fff'}
                    size={moderateScale(30, 0.1)}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => changeRepeatMode()}>
                  <MaterialIcon
                    name={
                      repeat == 'off'
                        ? 'repeat-off'
                        : repeat == 'track'
                        ? 'repeat-once'
                        : 'repeat'
                    }
                    color={'#fff'}
                    size={moderateScale(30, 0.1)}
                  />
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </LinearGradient>
        <TouchableOpacity style={s.backbutton}>
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
          </Button>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default NowPlaying;
