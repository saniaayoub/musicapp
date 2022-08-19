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
} from 'react-native';

import React, { useContext, useEffect, useState } from 'react';
import s from './style';
import LinearGradient from 'react-native-linear-gradient';
import playlistback from '../../assets/images/playlistback.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Input, Button, Box } from 'native-base';
import { moderateScale } from 'react-native-size-matters';
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
import Backarrowsvg from '../../assets/images/backarrow.svg';

const NowPlaying = ({ navigation, route }) => {
  const context = useContext(AppContext);
  const playbackState = usePlaybackState();
  const progress = useProgress();
  const [data, setData] = useState(route.params?.data);
  const [trackArtwork, setTrackArtwork] = useState();
  const [trackArtist, setTrackArtist] = useState();
  const [trackTitle, setTrackTitle] = useState();
  const [allSongs, setAllSongs] = useState(context.songs);
  const [index, setIndex] = useState(0);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState('off');
  const [fav, setFav] = useState(route.params?.data?.fav);
  const [shuffleArr, setshuffleArr] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    // play(data);
    // TrackPlayer.destroy();
    console.log(route.params?.data);
    getIndex();
  }, []);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack != null) {
      const track = await TrackPlayer.getTrack(event.nextTrack);

      const { title, artwork, artist } = track;
      setTrackArtist(artist);
      setTrackArtwork(artwork);
      setTrackTitle(title);
      setLoader(false);
    }
  });

  const getIndex = async () => {
    setLoader(true);
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
        TrackPlayer.setRepeatMode(RepeatMode.Off);
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
      .then(() => { })
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
        return { ...item, fav: true };
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
        return { ...item, fav: false };
      } else {
        return item;
      }
    });
    context.setSongs(tempArray);
    setAllSongs(tempArray);
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

  const shuffleFunc = async () => {
    const queue = await allSongs;
    const shuffledQueue = shuffleArray(queue);
    setshuffleArr(shuffledQueue);
    console.log(shuffledQueue);
    await TrackPlayer.reset().then(() => {
      TrackPlayer.setupPlayer();
      TrackPlayer.add(shuffledQueue);
      TrackPlayer.play();
    });
  };

  const skipToNext = async i => {
    if (shuffle) {
      let randomIndex = Math.floor(Math.random() * allSongs.length - 1);
      console.log(randomIndex);
      if (randomIndex == -1 || randomIndex == allSongs.length) {
        await TrackPlayer.skip(0).then(() => {
          TrackPlayer.play();
          setIndex(0);
          setData(allSongs[0]);
        });
      } else {
        await TrackPlayer.skip(randomIndex).then(() => {
          TrackPlayer.play();
          setIndex(randomIndex);
          setData(allSongs[randomIndex]);
        });
      }
    } else {
      console.log(i, 'i', allSongs.length, 'len', repeat, 'repeat');
      if (repeat == 'off' && i == allSongs.length) {
        alert('Turn the repeat mode on to start the list again');
      } else if (repeat == 'track') {
        alert('Turn the repeat mode on to play next song');
      } else {
        if (i == allSongs.length) {
          await TrackPlayer.skip(0).then(() => {
            TrackPlayer.play();
            setIndex(0);
            setData(allSongs[0]);
          });
        } else {
          await TrackPlayer.skipToNext().then(() => {
            TrackPlayer.play();
            setIndex(i);
            setData(allSongs[i]);
          });
        }
      }
    }
  };

  const skipToPrevious = async i => {
    if (shuffle) {
      let randomIndex = Math.floor(Math.random() * allSongs.length - 1);
      console.log(randomIndex);
      if (randomIndex == -1 || randomIndex == allSongs.length) {
        await TrackPlayer.skip(0).then(() => {
          TrackPlayer.play();
          setIndex(0);
          setData(allSongs[0]);
        });
      } else {
        await TrackPlayer.skip(randomIndex).then(() => {
          TrackPlayer.play();
          setIndex(randomIndex);
          setData(allSongs[randomIndex]);
        });
      }
    } else {
      console.log(i, 'i', allSongs.length, 'len', repeat, 'repeat');
      if (repeat == 'off' && i == -1) {
        alert('Turn the repeat mode on to start the list again');
      } else if (repeat == 'track') {
        alert('Turn the repeat mode on to play next song');
      } else {
        if (i == -1) {
          await TrackPlayer.skip(allSongs.length - 1).then(() => {
            TrackPlayer.play();
            setIndex(allSongs.length - 1);
            setData(allSongs[allSongs.length - 1]);
          });
        } else {
          await TrackPlayer.skipToPrevious().then(() => {
            TrackPlayer.play();
            setIndex(i);
            setData(allSongs[i]);
          });
        }
      }
    }
  };
  const repeatMode = () => {
    if (repeat == 'off') {
      return 'repeat-off';
    }
    if (repeat == 'track') {
      return 'repeat-once';
    }
    if (repeat == 'repeat') {
      return 'repeat';
    }
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


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground source={nowplay} resizeMode={'cover'}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
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
                  {loader ? (
                    <ActivityIndicator />
                  ) : (
                    <Image
                      source={trackArtwork}
                      width={undefined}
                      height={undefined}
                      resizeMode={'cover'}
                      style={{ width: '100%', height: '100%' }}
                    />
                  )}
                  <View style={s.descriptionViewTop}>
                    <LinearGradient
                      start={{ x: 0, y: 0 }}
                      end={{ x: 0, y: 1 }}
                      colors={['rgba(0, 0, 0, 0)', 'rgba(194, 106, 248, 0.5))']}
                    >
                      <Text style={s.text1Top}>{trackTitle}</Text>
                      <Text style={s.text2Top}>{trackArtist}</Text>
                    </LinearGradient>
                  </View>
                </View>
              </View>

              <View style={s.centerView}>
                <View style={s.row}>
                  <View style={s.descriptionView}>
                    <Text style={s.text1}>{trackTitle}</Text>
                  </View>
                  <View style={s.heart}>
                    {/* <Button
                        size="sm"
                        onPress={() => {
                          {
                            allSongs[index].fav
                              ? remFromFavList(data)
                              : addToFavList(data);
                          }
                        }}
                        variant={'link'}
                        zIndex={1000}
                      >
                        {allSongs[index].fav ? (
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
                      </Button> */}
                    <TouchableOpacity>
                      <Icon
                        name={'heart'}
                        color={'#fff'}
                        size={moderateScale(20, 0.1)}
                      />
                    </TouchableOpacity>
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
                  <Text style={[s.text2, { fontSize: 12 }]}>
                    {new Date(progress.position * 1000)
                      .toString()
                      .substring(19, 24)}
                  </Text>
                  <Text style={[s.text2, { fontSize: 12 }]}>
                    {new Date(progress.duration * 1000)
                      .toString()
                      .substring(19, 24)}
                  </Text>
                </View>
              </View>

              <View style={[s.centerView1, s.row]}>
                <Button
                  size="sm"
                  onPress={async () => {
                    if (!shuffle) {
                      setShuffle(true);
                      shuffleFunc();
                    } else {
                      setShuffle(false);
                      await TrackPlayer.reset().then(() => {
                        TrackPlayer.add(allSongs);
                        // TrackPlayer.play();
                      });
                    }
                  }}
                  variant={'link'}
                  zIndex={1000}
                >
                  <MaterialIcon
                    name={shuffle ? 'shuffle-variant' : 'shuffle-disabled'}
                    color={'#fff'}
                    size={moderateScale(30, 0.1)}
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
                  onPress={() => changeRepeatMode()}
                  variant={'link'}
                  zIndex={1000}
                >
                  <MaterialIcon
                    name={`${repeatMode()}`}
                    color={'#fff'}
                    size={moderateScale(30, 0.1)}
                  />
                  
                </Button>
              </View>
            </ScrollView>
          </View>
        </LinearGradient>
        <TouchableOpacity 
        style={{...s.backbutton, zIndex:1000, backgroundColor:'#fff', borderRadius: moderateScale(14, 0.1), padding:moderateScale(7, 0.1)}} 
        onPress={() => navigation.goBack()}
        >
            <Image source={backarrow} resizeMode="contain" />
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default NowPlaying;
