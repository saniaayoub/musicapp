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
import React, {useContext, useState, useEffect} from 'react';
import s from './style';
import LinearGradient from 'react-native-linear-gradient';
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
import SoundPlayer from 'react-native-sound-player';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import Backarrowsvg from '../../assets/images/backarrow.svg';

const Playlist = ({navigation}) => {
  const context = useContext(AppContext);
  const playbackState = usePlaybackState();
  const progress = useProgress();
  // const [allsongs, setAllSongs] = useState(context.songs);
  const [loader, setLoader] = useState(false);
  const [currentTrack, setCurrentTrack] = useState({});

  const [isPlay, setIsPlay] = useState(false);
  const [playList, setPlayList] = useState(context.songs);
  const [index, setIndex] = useState(0);

  // useEffect(() => {
  //   // get List of playlist songs
  //   // getSongs();
  //   // console.log(playbackState, 'here1');
  //   // setUpTrackPlayer();
  // }, [context.songs]);

  const getQueue = async () => {
    const queue = await TrackPlayer.getQueue();
    console.log(queue);
  };

  const getIndex = async data => {
    if (data.id == currentTrack.id) {
      console.log('already playing');
      togglePlayback(playbackState);
      setPlayButton(data);
    } else {
      console.log('new');
      favList.map((item, i) => {
        if (item.id == data.id) {
          TrackPlayer.reset();
          playSong(data);
          setPlayButton(data);
        }
      });
    }
  };

  const setUpTrackPlayer = async () => {
    await TrackPlayer.setupPlayer()
      .then(() => {
        getSongs(context.songs);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const getSongs = songs => {
    setLoader(true);
    let tempArray;
    tempArray = allsongs.filter(item => item.fav == true);
    tempArray = tempArray.map(item => {
      return {...item, play: false};
    });
    setAllSongs(tempArray);
    setLoader(false);
  };

  const playSong = async item => {
    await TrackPlayer.add(item)
      .then(() => {
        TrackPlayer.play();
        setCurrentTrack(item);
      })
      .catch(e => console.log(e));
  };

  const setPlayButton = item => {
    let tempArray;
    tempArray = playList.map((elem, i) => {
      if (elem.id == item.id) {
        return {...elem, play: !elem.play};
      } else {
        return {...elem, play: false};
      }
    });
    setPlayList(tempArray);
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

  // const getSongs = () => {
  //   setLoader(true);
  //   let tempArray;

  //   tempArray = playList.map(item => {
  //     return {...item, play: false};
  //   });
  //   setPlayList(tempArray);
  //   setLoader(false);
  // };

  // const playSong = item => {
  //   setIsPlay(!isPlay);

  //   //update play pause button
  //   setPlayButton(item);

  //   if (index == item.id) {
  //     // If same song
  //     //console.log('here2');
  //     if (context.songState === 'play') {
  //       //console.log(context.songState);
  //       SoundPlayer.pause();
  //       context.setSongState('pause');
  //     } else if (context.songState === 'pause') {
  //       //console.log(context.songState);
  //       SoundPlayer.resume();
  //       context.setSongState('play');
  //     }
  //   } else {
  //     //console.log('here1');
  //     if (
  //       context.songState === 'play' ||
  //       context.songState === 'stop' ||
  //       context.songState === 'pause'
  //     ) {
  //       //console.log(context.songState);
  //       SoundPlayer.stop();
  //       SoundPlayer.playUrl(item.url);
  //       context.setSongState('play');
  //       //console.log(index);
  //       setIndex(item.id);
  //     }
  //   }
  // };
  // const setPlayButton = item => {
  //   let tempArray;
  //   tempArray = playList.map(elem => {
  //     if (elem.id === item.id) {
  //       return {...elem, play: !elem.play};
  //     } else if (elem.id === index) {
  //       return {...elem, play: false};
  //     } else {
  //       return elem;
  //     }
  //   });
  //   setPlayList(tempArray);
  // };
  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        source={playlistback}
        blurRadius={5}
        resizeMode={'cover'}
      >
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
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
                <Backarrowsvg
                  width={moderateScale(14, 0.1)}
                  height={moderateScale(14, 0.1)}
                />

                {/* <Image source={backarrow} resizeMode="contain" /> */}
                {/* <Icon name={'arrow-circle-left'} color={'#fff'} size={25} /> */}
              </Button>
            </View>
            {/******** Head *********/}
            <View style={s.header}>
              <View style={s.heading}>
                <Text style={s.headingText}>Playlist</Text>
              </View>
            </View>
            <ScrollView style={{marginBottom: moderateScale(80, 0.1)}}>
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
                {playList.map((item, i) => {
                  return (
                    <>
                      <View style={s.item} key={i.toString()}>
                        <TouchableOpacity style={s.image}>
                          <ImageBackground
                            source={item.artwork}
                            resizeMode={'cover'}
                            width={undefined}
                            height={undefined}
                          >
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
                              <Text style={s.text1}>{item.title}</Text>
                              <Text style={s.text2}>{item.artist}</Text>
                            </View>
                            <TouchableOpacity
                              style={s.playbutton}
                              onPress={() => {
                                setPlayButton(item);
                                // playSong(item);
                              }}
                            >
                              {item.play ? (
                                <Icon
                                  name={'pause-circle'}
                                  color={'#fff'}
                                  size={28}
                                />
                              ) : (
                                <Icon
                                  name={'play-circle'}
                                  color={'#fff'}
                                  size={28}
                                />
                              )}
                            </TouchableOpacity>
                          </View>
                          <View style={s.slider}>
                            <Slider thumbStyle={s.thumb} trackStyle={s.track} />
                            <View style={s.timer}>
                              <Text style={s.text2}>00.00</Text>
                              <Text style={s.text2}>03.20</Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </>
                  );
                })}
              </View>
            </ScrollView>
          </View>
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Playlist;
