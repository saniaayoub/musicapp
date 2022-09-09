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
import Songs from '../../Components/songs';
import {useDispatch, useSelector} from 'react-redux';
import {setPlayObject, setFavorite} from '../../Redux/actions';
import Player from '../../Components/player';
import axiosconfig from '../../Providers/axios';
import {useIsFocused} from '@react-navigation/native';

const Favorite = ({navigation}) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  let token = useSelector(state => state.reducer.userToken);
  let favorite = useSelector(state => state.reducer.favorite);
  const progress = useProgress();
  const playerState = usePlaybackState();

  // const [favList, setFavList] = useState(Songs);
  const [index, setIndex] = useState();
  const [loader, setLoader] = useState(false);
  const [queue, setQueue] = useState([]);
  let playObject = useSelector(state => state.reducer.play_object);

  useEffect(() => {
    getQueue();
    getList();
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
    console.log(progress.position);
    queue.every(async (item, i) => {
      if (song.id == item.id) {
        await TrackPlayer.pause().then(async () => {
          await TrackPlayer.seekTo(0).then(async () => {
            await TrackPlayer.skip(i).then(async () => {
              await TrackPlayer.play().then(() => {
                dispatch(setPlayObject(item));
              });
            });
          });
        });
        return false;
      }
      return true;
    });
  };

  const getQueue = async () => {
    let queue = await TrackPlayer.getQueue();
    setQueue(queue);
  };

  const getList = async () => {
    setLoader(true);
    axiosconfig
      .get('favorate_list', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        console.log('data', res.data);
        setLoader(false);
        if (res.data) {
          dispatch(setFavorite(res?.data));
        }
      })
      .catch(err => {
        setLoader(false);
        console.log(err.response);
      });
  };

  const remove = item => {
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
        console.log('data', res.data);
        if (res.data) {
          console.log(res?.data);
          removeFromList(item);
          // dispatch(setFavorite(res?.data));
        }
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  const removeFromList = item => {
    let temp = [];
    temp = favorite.filter(elem => item.id !== elem.id);
    console.log(temp);
    dispatch(setFavorite(temp));
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
          {loader ? (
            <ActivityIndicator />
          ) : favorite.length ? (
            <ScrollView
              style={{marginBottom: moderateScale(160, 0.1)}}
              contentContainerStyle={{flexGrow: 1}}
            >
              <View style={s.collection}>
                {favorite.map((item, i) => {
                  return (
                    <>
                      <View style={s.item} key={i}>
                        <TouchableOpacity style={s.image} key={i}>
                          <ImageBackground
                            source={item.artwork}
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
                                onPress={() => remove(item)}
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
                                  play(item, i);
                                }}
                              >
                                {item.id == playObject.id &&
                                playerState == State.Playing ? (
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
              <Text style={s.empty}>No Songs</Text>
            </View>
          )}
        </View>
      </Box>
    </SafeAreaView>
  );
};

export default Favorite;
