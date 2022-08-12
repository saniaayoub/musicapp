import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import {Box} from 'native-base';
import s from './style';
import background from '../../assets/images/background.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Button, ScrollView} from 'native-base';
import {moderateScale} from 'react-native-size-matters';
import Slider from 'react-native-slider';
import healing1 from '../../assets/images/healing1.png';
import play from '../../assets/images/play.png';
import Playbutton from '../../assets/images/playbutton.svg';
import backarrow from '../../assets/images/backarrow.png';
import AppContext from '../../Providers/AppContext';
import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';

const Favorite = ({navigation}) => {
  const context = useContext(AppContext);
  const playbackState = usePlaybackState();
  const progress = useProgress();
  const [favList, setFavList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [currentTrack, setCurrentTrack] = useState({});

  useEffect(() => {
    // TrackPlayer.destroy();
    console.log(playbackState, 'here1');
    setUpTrackPlayer();
    // BackHandler.addEventListener('hardwareBackPress', () => {
    //   BackHandler.exitApp();
    // });
  }, [context.songs]);

  // useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
  //   if (event.type === Event.PlaybackTrackChanged && event.nextTrack != null) {
  //     const track = await TrackPlayer.getTrack(event.nextTrack);
  //     const {title, artwork, artist} = track;
  //     setTrackArtist(artist);
  //     setTrackArtwork(artwork);
  //     setTrackTitle(title);
  //   }
  // });

  const getQueue = async () => {
    const queue = await TrackPlayer.getQueue();
    console.log(queue);
  };

  const getIndex = async data => {
    if (data.id == currentTrack.id) {
      console.log('already play');
      togglePlayback(playbackState);
      setPlayButton(data);
    } else {
      console.log('new');
      favList.map((item, i) => {
        if (item.id == data.id) {
          TrackPlayer.reset();
          setIndex(i);
          playSong(data, i);
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

  // const skipToIndex = async i => {
  //   // console.log(allSongs[index]);
  //   await TrackPlayer.skip(i)
  //     .then(() => {
  //       console.log(i, 'skip to');
  //       TrackPlayer.play();
  //       console.log(playbackState, 'here3');
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  const getSongs = songs => {
    setLoader(true);
    let tempArray;
    tempArray = songs.filter(item => item.fav == true);
    tempArray = tempArray.map(item => {
      return {...item, play: false};
    });
    setFavList(tempArray);
    setLoader(false);
  };

  const playSong = async item => {
    // getIndex(item);
    console.log('3');
    await TrackPlayer.add(item)
      .then(() => {
        console.log('4');
        TrackPlayer.play();
        setCurrentTrack(item);
      })
      .catch(e => console.log(e));
    // if (index == currentTrack) {
    //   setIndex(currentTrack);
    // } else {
    //   setIndex(currentTrack);
    //   // console.log(currentTrack, 'currentTrack');

    // }
  };
  const setPlayButton = item => {
    console.log('5');
    let tempArray;
    tempArray = favList.map((elem, i) => {
      if (elem.id == item.id) {
        return {...elem, play: !elem.play};
      } else {
        return {...elem, play: false};
      }
      // if (i == index) {
      //   console.log('here');
      //   return {...elem, play: !elem.play};
      // } else if (elem.id == item.id) {
      //   console.log('here2');
      //   return {...elem, play: true};
      // } else {
      //   return elem;
      // }
    });
    setFavList(tempArray);
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
  return (
    <SafeAreaView style={{flex: 1}}>
      <Box
        bg={{
          linearGradient: {
            colors: ['#000000', '#B462E5'],
            start: [0, 0],
            end: [0, 1],
          },
        }}
        flex={1}
      >
        <View style={s.container}>
          <View style={s.fixed}>
            <View style={s.backbutton}>
              <Button
                size="sm"
                onPress={() =>
                  navigation.navigate('Home', {screen: 'UserHome'})
                }
                variant={'link'}
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
                <Text style={s.headingText}>Favourite Music</Text>
              </View>
            </View>
          </View>
          {loader ? (
            <ActivityIndicator />
          ) : favList.length ? (
            <ScrollView
              style={{marginBottom: moderateScale(20, 0.1)}}
              contentContainerStyle={{flexGrow: 1}}
            >
              <View style={s.collection}>
                {favList.map((item, i) => {
                  return (
                    <>
                      <View style={s.item} key={i}>
                        <TouchableOpacity
                          style={s.image}
                          onPress={() =>
                            navigation.navigate('Home', {
                              screen: 'NowPlaying',
                              params: {data: item},
                            })
                          }
                        >
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
                                getIndex(item);
                              }}
                            >
                              {item.play ? (
                                <Icon
                                  name={'pause-circle'}
                                  color={'#fff'}
                                  size={30}
                                />
                              ) : (
                                <Icon
                                  name={'play-circle'}
                                  color={'#fff'}
                                  size={30}
                                />
                              )}
                            </TouchableOpacity>
                          </View>

                          <View style={s.slider}>
                            <Slider
                              value={
                                currentTrack.id === item.id
                                  ? progress.position
                                  : 0
                              }
                              minimumValue={0}
                              maximumValue={progress.duration}
                              onSlidingComplete={async value => {
                                await TrackPlayer.seekTo(value);
                              }}
                              thumbStyle={s.thumb}
                              trackStyle={s.track}
                            />
                            <View style={s.timer}>
                              <Text style={s.text2}>
                                {currentTrack.id === item.id
                                  ? new Date(progress.position * 1000)
                                      .toString()
                                      .substring(19, 24)
                                  : `00:00`}
                              </Text>
                              <Text style={s.text2}>
                                {' '}
                                {new Date(progress.duration * 1000)
                                  .toString()
                                  .substring(19, 24)}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </>
                  );
                })}
              </View>
            </ScrollView>
          ) : (
            <View>
              <Text style={s.empty}>No Songs</Text>
            </View>
          )}
        </View>
      </Box>
    </SafeAreaView>
  );
};

export default Favorite;
