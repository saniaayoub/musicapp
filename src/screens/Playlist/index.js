import {
  ImageBackground,
  SafeAreaView,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import s from './style';
import LinearGradient from 'react-native-linear-gradient';
import playlistback from '../../assets/images/playlistback.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Button, Box} from 'native-base';
import {moderateScale} from 'react-native-size-matters';
import Slider from 'react-native-slider';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {setPlayObject, setFavorite} from '../../Redux/actions';
import backarrow from '../../assets/images/backarrow.png';
import TrackPlayer, {
  State,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';
import axiosconfig from '../../Providers/axios';
const Playlist = ({navigation, route}) => {
  const isFocused = useIsFocused();
  const token = useSelector(state => state.reducer.userToken);
  let playObject = useSelector(state => state.reducer.play_object);
  const favorite = useSelector(state => state.reducer.favorite);
  const progress = useProgress();
  const playerState = usePlaybackState();
  const dispatch = useDispatch();
  const {data} = route.params;
  const [playList, setPlayList] = useState(data?.musics);
  const [index, setIndex] = useState();
  const [loader, setLoader] = useState(false);
  const [loadingSong, setLoadingSong] = useState(false);

  const [queue, setQueue] = useState([]);
  const [isFav, setIsFav] = useState();

  useEffect(() => {
    getQueue();
    getFavList();
  }, [isFocused]);

  const showToast = msg => {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  };
  const play = async (song, i) => {
    if (i == index) {
      if (playerState === State.Paused) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    } else {
      setLoader(true);
      getIndexFromQueue(song);
    }
  };

  const getIndexFromQueue = async song => {
    for (let i = 0; i < queue.length; i++) {
      if (queue[i].id == song.id) {
        await TrackPlayer.skip(i).then(async () => {
          await TrackPlayer.play()
            .then(() => {
              dispatch(setPlayObject(queue[i]));
            })
            .finally(() => {
              setLoader(false);
            });
        });
        break;
      }
    }
  };

  const getQueue = async () => {
    let queue = await TrackPlayer.getQueue();
    setQueue(queue);
  };

  const updateFav = (item, text) => {
    const data = {
      rating: true,
      music_id: item.id,
    };
    axiosconfig
      .post('user_rating', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        if (res.data) {
          console.log(res?.data);
          getFavList();
          showToast(text);
        }
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  const addToList = item => {
    updateFav(item, 'Added to favourites');
  };

  const removeFromList = item => {
    updateFav(item, 'Removed from favourites');
  };

  const updateFavStatus = item => {
    let isFound = favorite.some(element => {
      if (element.id === item.id) {
        return true;
      }
      return false;
    });

    if (!isFound) {
      addToList(item);
    } else {
      removeFromList(item);
    }
  };

  const getFavList = async () => {
    await axiosconfig
      .get('favorate_list', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        console.log('fav list', res.data);
        if (res.data) {
          dispatch(setFavorite(res?.data));
        }
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  const IsSongFav = ({id}) => {
    const isFound = favorite.some(element => {
      if (element.id === id) {
        return true;
      }
      return false;
    });

    if (isFound) {
      return (
        <Icon name={'heart'} color={'#fff'} size={moderateScale(26, 0.1)} />
      );
    } else {
      return (
        <Icon name={'heart-o'} color={'#fff'} size={moderateScale(26, 0.1)} />
      );
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        source={playlistback}
        blurRadius={5}
        resizeMode={'cover'}
        style={{height: '100%'}}
      >
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          colors={['rgba(0, 0, 0, 0)', 'rgba(194, 106, 248, 0.3)']}
        >
          <View style={[s.container]}>
            {/******** Head *********/}
            <View style={s.header}>
              <View style={s.heading}>
                <Text style={s.headingText}>Playlist</Text>
              </View>
            </View>
            <ScrollView
            // style={{
            //   marginBottom:
            //     Platform.OS == 'ios'
            //       ? moderateScale(330, 0.1)
            //       : moderateScale(80, 0.1),
            // }}
            >
              <View style={s.section}>
                <View style={s.imageTop}>
                  <Image
                    source={{uri: data.image}}
                    resizeMode={'cover'}
                    style={{width: '100%', height: '100%'}}
                  />
                </View>
                <View style={s.descriptionViewTop}>
                  <Text style={s.text1Top}>{data.name}</Text>
                  {/* <Text style={s.text2Top}>Julie Watson And John Smith</Text> */}
                </View>
              </View>

              <View style={s.collection}>
                {playList.map((item, i) => {
                  return (
                    <>
                      <View style={s.item} key={i.toString()}>
                        <TouchableOpacity style={s.image}>
                          <ImageBackground
                            source={{uri: item.artwork}}
                            resizeMode={'cover'}
                            width={undefined}
                            height={undefined}
                          >
                            <View style={s.innerView}>
                              {/* <Image
                                source={play}
                                width={undefined}
                                height={undefined}
                                resizeMode={'cover'}
                              /> */}
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
                              onPress={() => {
                                updateFavStatus(item);
                              }}
                              style={{
                                position: 'absolute',
                                right: 40,
                                top: 23,
                              }}
                            >
                              <IsSongFav id={item.id} />
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={s.playbutton}
                              onPress={() => {
                                setLoadingSong(i);
                                play(item, i);
                              }}
                            >
                              {loadingSong === i && loader ? (
                                <ActivityIndicator
                                  size="large"
                                  color="#fff"
                                  style={{
                                    position: 'absolute',
                                    zIndex: 1000,
                                    bottom: 1,
                                    right: 1,
                                    left: 1,
                                    top: 1,
                                    // color: 'red',
                                  }}
                                />
                              ) : null}
                              {item.id == playObject.id &&
                              playerState == State.Playing &&
                              !loader ? (
                                <Icon
                                  name={'pause-circle'}
                                  color={'#fff'}
                                  size={moderateScale(30, 0.1)}
                                />
                              ) : (
                                <Icon
                                  name={'play-circle'}
                                  color={'#fff'}
                                  size={moderateScale(30, 0.1)}
                                />
                              )}
                            </TouchableOpacity>
                          </View>
                          <View style={s.slider}>
                            <Slider
                              value={
                                item.id == playObject.id ? progress.position : 0
                              }
                              minimumValue={0}
                              maximumValue={
                                item.id == playObject.id ? progress.duration : 0
                              }
                              onSlidingComplete={async value => {
                                await TrackPlayer.seekTo(value);
                              }}
                              thumbStyle={s.thumb}
                              trackStyle={s.track}
                            />
                            <View style={s.timer}>
                              <Text style={s.text2}>
                                {' '}
                                {item.id == playObject.id
                                  ? new Date(progress.position * 1000)
                                      .toString()
                                      .substring(19, 24)
                                  : `00:00`}
                              </Text>
                              <Text style={s.text2}>
                                {' '}
                                {item.id == playObject.id
                                  ? new Date(progress.duration * 1000)
                                      .toString()
                                      .substring(19, 24)
                                  : `00:00`}
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
            {/* <Icon name={'arrow-circle-left'} color={'#fff'} size={25} /> */}
          </Button>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Playlist;
