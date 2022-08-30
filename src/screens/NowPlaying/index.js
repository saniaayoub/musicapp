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
import {useDispatch, useSelector} from 'react-redux';

import TrackPlayer, {
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import styles from './style';
import Backarrowsvg from '../../assets/images/backarrow.svg';
import {
  playPause,
  setPlayObject,
  setShuffle,
  setRepeat,
} from '../../Redux/actions';

const NowPlaying = ({navigation, route}) => {
  const progress = useProgress();
  const playerState = usePlaybackState();
  const dispatch = useDispatch();

  let play_Pause = useSelector(state => state.reducer.play_pause);
  let playObject = useSelector(state => state.reducer.play_object);
  let shuffle = useSelector(state => state.reducer.shuffle);
  let repeat = useSelector(state => state.reducer.repeat);

  const [oldShuffle, setOldShuffle] = useState(0);
  const [newShuffle, setNewShuffle] = useState(0);

  useEffect(() => {
    console.log(route);
    if (route.params.data == 'home') {
      play('play');
    }
  }, []);

  const showToast = msg => {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  };

  useTrackPlayerEvents(
    [Event.PlaybackTrackChanged, Event.PlaybackQueueEnded],
    async event => {
      if (
        event.type === Event.PlaybackTrackChanged &&
        event.nextTrack != null
      ) {
        removeExtraTrack();
        const track = await TrackPlayer.getTrack(event.nextTrack);
        trackObject();
        const {title} = track || {};
        console.log(track, 'track');
      } else if (event.type === Event.PlaybackQueueEnded) {
        TrackPlayer.seekTo(0);
        play('pause');
      }
    },
  );

  const removeExtraTrack = async () => {
    if (oldShuffle < newShuffle) {
      //right after shuffle pressed
      //on song change the extra song in the queue is removed
      TrackPlayer.remove(0);
      setOldShuffle(newShuffle);
      let queue = await TrackPlayer.getQueue();
      console.log(queue, 'queue');
    }
  };

  const randomSong = async () => {
    let randomIndex = Math.abs(Math.floor(Math.random() * Songs.length - 1));
    console.log(randomIndex);
    await TrackPlayer.pause().then(res => {
      TrackPlayer.skip(randomIndex).then(() => {
        TrackPlayer.play();
        dispatch(playPause('play'));
      });
    });
  };

  const next = async () => {
    if (shuffle) {
      randomSong();
    } else {
      await TrackPlayer.pause().then(res => {
        TrackPlayer.skipToNext()
          .then(() => {
            TrackPlayer.play();
            dispatch(playPause('play'));
          })
          .catch(err => {
            showToast(err.toString().substring(6, 40));
            dispatch(playPause('pause'));
          });
      });
    }
  };

  const previous = async () => {
    if (shuffle) {
      randomSong();
    } else {
      await TrackPlayer.pause().then(res => {
        TrackPlayer.skipToPrevious()
          .then(() => {
            TrackPlayer.play();
            dispatch(playPause('play'));
          })
          .catch(err => {
            showToast(err.toString().substring(6, 40));
            dispatch(playPause('pause'));
          });
      });
    }
  };

  const play = async c => {
    if (c == 'play') {
      trackObject();
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
    dispatch(playPause(c));
  };

  const trackObject = async () => {
    let trackIndex = await TrackPlayer.getCurrentTrack();
    let trackObject = await TrackPlayer.getTrack(trackIndex);
    console.log(trackObject);
    dispatch(setPlayObject(trackObject));
  };

  const changeRepeatMode = () => {
    if (repeat == 'off') {
      TrackPlayer.setRepeatMode(RepeatMode.Track);
      dispatch(setRepeat('track'));
    }
    if (repeat == 'track') {
      TrackPlayer.setRepeatMode(RepeatMode.Queue);
      dispatch(setRepeat('repeat'));
    }
    if (repeat == 'repeat') {
      TrackPlayer.setRepeatMode(RepeatMode.Off);
      dispatch(setRepeat('off'));
    }
  };

  const shuffleSings = async () => {
    if (shuffle) {
      dispatch(setShuffle(false));
      setNewShuffle(oldShuffle + 1);
      updateQueue(Songs);
    } else {
      dispatch(setShuffle(true));
      let temp = [...Songs];
      let shuffled = shuffleArray(temp);
      setNewShuffle(oldShuffle + 1);
      updateQueue(shuffled);
    }
  };

  const updateQueue = async list => {
    let indexArray = [];
    let queue = await TrackPlayer.getQueue();
    queue.forEach((item, i) => indexArray.push(i));
    await TrackPlayer.remove(indexArray).then(async () => {
      TrackPlayer.add(list);
    });
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
                  onPress={() => {
                    play(playerState === State.Playing ? 'pause' : 'play');
                  }}
                >
                  <Icon
                    name={
                      playerState === State.Playing
                        ? 'pause-circle'
                        : 'play-circle'
                    }
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
