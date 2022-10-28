import {
  ImageBackground,
  SafeAreaView,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import s from './style';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button} from 'native-base';
import {moderateScale} from 'react-native-size-matters';
import Slider from 'react-native-slider';
import backarrow from '../../assets/images/backarrow.png';
import nowplay from '../../assets/images/nowplay.png';
import axiosconfig from '../../Providers/axios';
import {useDispatch, useSelector} from 'react-redux';
import TrackPlayer, {
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import {
  playPause,
  setPlayObject,
  setShuffle,
  setRepeat,
  setFavorite,
} from '../../Redux/actions';
import {useIsFocused} from '@react-navigation/native';

const NowPlaying = ({navigation}) => {
  const dispatch = useDispatch();
  const progress = useProgress();
  const isFocused = useIsFocused();
  const playerState = usePlaybackState();
  const isPlaying = playerState === State.Playing;
  const token = useSelector(state => state.reducer.userToken);
  const playObject = useSelector(state => state.reducer.play_object);
  const Songs = useSelector(state => state.reducer.music);
  const [isFav, setIsFav] = useState();
  const shuffle = useSelector(state => state.reducer.shuffle);
  const repeat = useSelector(state => state.reducer.repeat);
  const [oldShuffle, setOldShuffle] = useState(0);
  const [newShuffle, setNewShuffle] = useState(0);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    console.log(playObject, 'here');
    setFav(playObject);
  }, [isFocused]);

  const showToast = msg => {
    if(Platform.OS == 'ios'){
      alert(msg)
    }else{
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    }
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
        setFav(track);
      } else if (event.type === Event.PlaybackQueueEnded) {
        TrackPlayer.seekTo(0);
        play('pause');
      }
    },
  );

  const removeExtraTrack = async () => {
    if (oldShuffle < newShuffle) {
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
    if (!shuffle) {
      await TrackPlayer.skipToNext()
        .then(() => {
          play('play');
        })
        .catch(err => {
          showToast(err.toString().substring(6, 40));
          dispatch(playPause('pause'));
        });
    } else {
      randomSong();
    }
  };

  const previous = async () => {
    if (!shuffle) {
      await TrackPlayer.skipToPrevious()
        .then(() => {
          play('play');
        })
        .catch(err => {
          showToast(err.toString().substring(6, 40));
          dispatch(playPause('pause'));
        });
    } else {
      randomSong();
    }
  };

  const play = async c => {
    if (c == 'play') {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
    dispatch(playPause(c));
    trackObject();
  };

  const trackObject = async () => {
    let trackIndex = await TrackPlayer.getCurrentTrack();
    let trackObject = await TrackPlayer.getTrack(trackIndex);
    console.log(trackObject);
    dispatch(setPlayObject(trackObject));
    setFav(trackObject);
  };

  const changeRepeatMode = () => {
    if (repeat == 'off') {
      TrackPlayer.setRepeatMode(RepeatMode.Track);
      dispatch(setRepeat('track'));
      showToast('Repeat track mode on');
    }
    if (repeat == 'track') {
      TrackPlayer.setRepeatMode(RepeatMode.Queue);
      dispatch(setRepeat('repeat'));
      showToast('Repeat mode on');
    }
    if (repeat == 'repeat') {
      TrackPlayer.setRepeatMode(RepeatMode.Off);
      dispatch(setRepeat('off'));
      showToast('Repeat mode off');
    }
  };

  const shuffleSings = async () => {
    if (shuffle) {
      showToast('Shuffle mode off');
      dispatch(setShuffle(false));
      setNewShuffle(oldShuffle + 1);
      updateQueue(Songs);
    } else {
      dispatch(setShuffle(true));
      showToast('Shuffle mode on');

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
    while (0 !== currentIndex) {
     
      randomIndex = Math.floor(Math.random() * currentIndex);
     
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
      currentIndex -= 1;
    }
    return array;
  };

  const updateFav = item => {
    setLoader(true);
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
          if (isFav) {
            showToast('Removed From Favorites');
          } else {
            showToast('Added To Favorites');
          }
          getFavList();
          setIsFav(!isFav);
          setLoader(false);
        }
      })
      .catch(err => {
        console.log(err.response);
        setLoader(false);
      });
  };

  const addToList = item => {
    updateFav(item);
  };

  const removeFromList = item => {
    updateFav(item);
  };

  const setFav = async track => {
    setLoader(true);
    let id = track?.id;
    console.log(id, 'fav object id');
    await axiosconfig
      .get(`feature_music_show/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        console.log('this', res.data);
        if (res?.data?.favorate?.length) {
          let data = res?.data?.favorate[0]?.rating;
          console.log('data fav', data);
          if (data == 'true') {
            setIsFav(true);
          } else {
            setIsFav(false);
          }
        } else {
          setIsFav(false);
        }
        setLoader(false);
      })
      .catch(err => {
        console.log('error', err);
        setLoader(false);
      });
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

  return (
    <SafeAreaView style={{flex: 1}}>
      {/* <ImageBackground source={nowplay} resizeMode={'cover'}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={['rgba(0,0,0,0)', 'rgba(194, 106, 248, 0.5)']}
        >
          <View style={[s.container]}>
            
            <View style={s.header}>
              <View style={s.heading}>
                <Text style={s.headingText}>Now Playing</Text>
              </View>
            </View>
            <ScrollView>
              <View style={s.section}>
                <View style={s.imageTop}>
                  <Image
                    source={{uri: playObject?.artwork}}
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
                    {loader ? (
                      <ActivityIndicator
                        size={'small'}
                        color={'#fff'}
                        style={{
                          position: 'absolute',
                          right: 15,
                        }}
                      />
                    ) : (
                      <Button
                        onPress={() => {
                          isFav
                            ? removeFromList(playObject)
                            : addToList(playObject);
                        }}
                        size="sm"
                        variant={'link'}
                        zIndex={1000}
                      >
                        <Icon
                          name={isFav ? 'heart' : 'heart-o'}
                          color={'#fff'}
                          size={moderateScale(26, 0.1)}
                        />
                      </Button>
                    )}
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
                    play(isPlaying ? 'pause' : 'play');
                  }}
                >
                  <Icon
                    name={isPlaying ? 'pause-circle' : 'play-circle'}
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
      </ImageBackground> */}
    </SafeAreaView>
  );
};

export default NowPlaying;
