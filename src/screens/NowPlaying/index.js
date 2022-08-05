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
import Heart from '../../assets/images/heart.svg';

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

const NowPlaying = ({navigation, route}) => {
  const context = useContext(AppContext);
  const playbackState = usePlaybackState();
  const progress = useProgress();
  const [data, setData] = useState(route.params?.data);
  const [allSongs, setAllSongs] = useState(context.songs);
  const [index, setIndex] = useState(0);
  const [random, setRandom] = useState(false);
  const [loop, setLoop] = useState(false);
  const [fav, setFav] = useState(route.params?.data?.fav);

  useEffect(() => {
    // play(data);
    console.log(playbackState, 'here1');
    getIndex();
  }, []);

  const getIndex = async () => {
    await allSongs.map((item, i) => {
      if (item.id == data.id) {
        setIndex(i);
        setUpTrackPlayer(i);
      }
    });
    return index;
  };

  const setUpTrackPlayer = async i => {
    await TrackPlayer.setupPlayer()
      .then(() => {
        TrackPlayer.add(allSongs);
        console.log(playbackState, 'here2');
        skipToIndex(i);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const skipToIndex = async i => {
    // console.log(allSongs[index]);
    await TrackPlayer.skip(i)
      .then(() => {
        console.log(i, 'skip to');
        TrackPlayer.play();
        console.log(playbackState, 'here3');
      })
      .catch(err => {
        console.log(err);
      });
  };

  const play = async data => {
    await TrackPlayer.setupPlayer()
      .then(() => {
        TrackPlayer.add(data);
      })
      .then(() => {
        TrackPlayer.play();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const togglePlayback = async playbackState => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack !== null) {
      if (playbackState == State.Paused) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  };

  const addToFavList = data => {
    let tempArray = [];
    console.log(allSongs);
    setFav(true);
    tempArray = allSongs.map(item => {
      if (item.id === data.id) {
        return {...item, fav: true};
      } else {
        return item;
      }
    });
    context.setSongs(tempArray);
    setAllSongs(tempArray);
  };

  const remFromFavList = data => {
    let tempArray = [];
    console.log(allSongs);
    setFav(false);
    tempArray = allSongs.map(item => {
      if (item.id === data.id) {
        return {...item, fav: false};
      } else {
        return item;
      }
    });
    context.setSongs(tempArray);
    setAllSongs(tempArray);
  };

  const skipToNext = async i => {
    setIndex(i);
    if (i == allSongs.length) {
      setIndex(0);
      setData(allSongs[0]);
      skipToIndex(0);
    } else {
      skipToIndex(i);
      setData(allSongs[i]);
    }
  };

  const skipToPrevious = async i => {
    setIndex(i);
    if (i == -1) {
      setIndex(allSongs.length - 1);
      setData(allSongs[allSongs.length - 1]);
      skipToIndex(allSongs.length - 1);
    } else {
      skipToIndex(i);
      setData(allSongs[i]);
    }
  };
  // const skipToPrevious = async index => {
  //   setIndex(index);
  //   if (index == -1) {
  //     setIndex(allSongs.length - 1);
  //     // console.log(index, '!=',allSongs.length - 1);
  //     setData(allSongs[allSongs.length - 1]);
  //     play(allSongs[allSongs.length - 1]);
  //   }
  //   allSongs.map((item, i) => {
  //     if (index == i) {
  //       console.log(index, '=', i);
  //       setData(item);
  //       play(item);
  //     }
  //   });
  //   // console.log(allSongs[index]);
  //   // await TrackPlayer.skip(index + 1)
  //   //   .then(() => {
  //   //     console.log(index);
  //   //     togglePlayback(playbackState);
  //   //   })
  //   //   .catch(err => {
  //   //     console.log(err);
  //   //   });
  // };
  // const [favList, setFavList] = useState(context.favList);
  // const [unFormatcurrentTime, setunFormatcurrentTime] = useState([]);
  // const [currentTime, setCurrentTime] = useState([]);
  // const [duration, setDuration] = useState([]);

  // const playSong = url => {
  //   if (play === 'stop') {
  //     setPlay('play');
  //     SoundPlayer.playUrl(url);
  //     context.setSongState('play');
  //   }
  //   if (play === 'pause') {
  //     SoundPlayer.resume();
  //     setPlay('play');
  //     setTimeout(() => {
  //       getInfo();
  //     }, 500);
  //     context.setSongState('play');
  //   }
  //   if (play === 'play') {
  //     SoundPlayer.pause();
  //     setPlay('pause');
  //     context.setSongState('pause');
  //   }
  // };

  // const stopSong = () => {
  //   SoundPlayer.pause();
  // };

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
                    source={data.artwork}
                    width={undefined}
                    height={undefined}
                    resizeMode={'cover'}
                    style={{width: '100%', height: '100%'}}
                  />
                  <View style={s.descriptionViewTop}>
                    <Text style={s.text1Top}>{data.title}</Text>
                    <Text style={s.text2Top}>{data.artist}</Text>
                  </View>
                </View>
              </View>

              <View style={s.centerView}>
                <View style={s.row}>
                  <View style={s.descriptionView}>
                    <Text style={s.text1}>{data.title}</Text>
                  </View>
                  <View style={s.heart}>
                    <Button
                      size="sm"
                      onPress={() => {
                        {
                          fav ? remFromFavList(data) : addToFavList(data);
                        }
                      }}
                      variant={'link'}
                      zIndex={1000}
                    >
                      {fav ? (
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
                <Button
                  size="sm"
                  onPress={() => setRandom(!random)}
                  variant={'link'}
                  zIndex={1000}
                >
                  <Icon
                    name="random"
                    color={random ? '#fff' : '#808080'}
                    size={moderateScale(24, 0.1)}
                  />
                </Button>
                <Button
                  size="sm"
                  onPress={() => skipToPrevious(index - 1)}
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
                <Button
                  size="sm"
                  onPress={() => {
                    togglePlayback(playbackState);
                  }}
                  variant={'link'}
                  zIndex={1000}
                >
                  <Icon
                    name={
                      playbackState === State.Playing
                        ? 'pause-circle'
                        : 'play-circle'
                    }
                    color={'#fff'}
                    size={moderateScale(59, 0.1)}
                  />
                </Button>

                <Button
                  size="sm"
                  onPress={() => skipToNext(index + 1)}
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
