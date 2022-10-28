import {
  ImageBackground,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import {Box} from 'native-base';
import s from './style';
import Icon from 'react-native-vector-icons/FontAwesome';
import {moderateScale} from 'react-native-size-matters';
import Slider from 'react-native-slider';
import TrackPlayer, {
  State,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';
import {useDispatch, useSelector} from 'react-redux';
import {setPlayObject, setFavorite} from '../../Redux/actions';
import axiosconfig from '../../Providers/axios';
import {useIsFocused} from '@react-navigation/native';

const Favorite = ({navigation}) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const token = useSelector(state => state.reducer.userToken);
  const favorite = useSelector(state => state.reducer.favorite);
  const progress = useProgress();
  const playerState = usePlaybackState();
  const [index, setIndex] = useState();
  const [loader, setLoader] = useState(false);
  const [loadingSong, setLoadingSong] = useState(false);
  const [queue, setQueue] = useState([]);
  const playObject = useSelector(state => state.reducer.play_object);

  useEffect(() => {
    getQueue();
    getFavList();
    console.log(favorite.length);
  }, [isFocused]);

  const play = async (song, i) => {
    if (i == index) {
      if (playerState === State.Paused) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    } else {
      getIndexFromQueue(song);
      setIndex(i);
    }
  };

  const getIndexFromQueue = async song => {
    setLoader(true);
    for (let i = 0; i < queue.length; i++) {
      if (queue[i].id == song.id) {
        console.log(index);
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

  const updateFavList = async item => {
    const data = {
      rating: true,
      music_id: item.id,
    };
    await axiosconfig
      .post('user_rating', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        console.log('data', res.data);
        if (res.data) {
          console.log(res?.data);
          // dispatch(setFavorite(res?.data));
        }
      })
      .catch(err => {
        console.log('data', err.response);
      });
  };

  const removeFromList = item => {
    updateFavList(item);
    let temp = [];
    temp = favorite.filter(elem => item.id !== elem.id);
    console.log(temp);
    dispatch(setFavorite(temp));
  };

  const getFavList = async () => {
    await axiosconfig
      .get('favorate_list', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        console.log('data', res.data);
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
            {/******** Head *********/}
            <View style={s.header}>
              <View style={s.heading}>
                <Text style={s.headingText}>Favourite Music</Text>
              </View>
            </View>
          </View>

          {favorite.length ? (
            <ScrollView
              style={{marginBottom: moderateScale(140, 0.1)}}
              contentContainerStyle={{flexGrow: 1}}
            >
              <View style={s.collection}>
                {favorite.map((item, i) => {
                  return (
                    <>
                      <View style={s.item} key={i}>
                        <TouchableOpacity style={s.image} key={i}>
                          <ImageBackground
                            source={{uri: item.artwork}}
                            resizeMode={'cover'}
                            width={undefined}
                            height={undefined}
                          >
                            <View style={s.innerView}></View>
                          </ImageBackground>
                        </TouchableOpacity>
                        <View style={s.centerView}>
                          <View style={s.row}>
                            <View style={s.descriptionView}>
                              <Text style={s.text1}>{item.title}</Text>
                              <Text style={s.text2}>{item.artist}</Text>
                            </View>
                            <View
                              style={{
                                flexDirection: 'row',
                              }}
                            >
                              <TouchableOpacity
                                onPress={() => removeFromList(item)}
                                style={{
                                  marginRight: moderateScale(10, 0.1),
                                  marginTop: moderateScale(23, 0.1),
                                }}
                              >
                                <Icon name={'heart'} color={'#fff'} size={25} />
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
                                {item.id == playObject.id
                                  ? new Date(progress.position * 1000)
                                      .toString()
                                      .substring(19, 24)
                                  : `00:00`}
                              </Text>
                              <Text style={s.text2}>
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
          ) : (
            <View>
              <Text style={s.empty}>No Songs Added</Text>
            </View>
          )}
        </View>
      </Box>
    </SafeAreaView>
  );
};

export default Favorite;
