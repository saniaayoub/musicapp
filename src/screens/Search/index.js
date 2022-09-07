import {
  ImageBackground,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import {Box} from 'native-base';
import s from './style';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {Input, Button, ScrollView} from 'native-base';
import {moderateScale} from 'react-native-size-matters';
import Slider from 'react-native-slider';
import AppContext from '../../Providers/AppContext';
import SearchIcon from '../../assets/images/search1.svg';
import Songs from '../../Components/songs';
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
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {setPlayObject} from '../../Redux/actions';
import Player from '../../Components/player';

const Search = ({navigation}) => {
  const isFocused = useIsFocused();
  const progress = useProgress();
  const playerState = usePlaybackState();
  const dispatch = useDispatch();
  let playObject = useSelector(state => state.reducer.play_object);
  const [searchText, setSearchText] = useState();
  const [songList, setSongList] = useState([]);
  const [index, setIndex] = useState();
  const [queue, setQueue] = useState([]);
  
  useEffect(() => {
    clearData();
    getQueue();
  }, [isFocused]);

  const clearData = () => {
    setSongList([]);
    setSearchText('');
    setIndex('');
  };

  const play = async (song, i) => {
    if (i === index) {
      console.log(i, index, 'old');
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

  const handleCancel = () => {
    clearData();
  };

  const handleChange = text => {
    setSearchText(text);
    setIndex('');
    if (!text) {
      clearData();
    } else {
      let searched = Songs.filter(item => {
        return (
          item.artist?.toLowerCase().includes(text.toLowerCase()) ||
          item.title?.toLowerCase().includes(text.toLowerCase())
        );
      });
      setSongList(searched);
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
            {/******** Head *********/}
            <View style={s.header}>
              <View style={s.heading}>
                <Text style={s.headingText}>Search</Text>
              </View>
            </View>
          </View>
          <View style={s.searchContainer}>
            <View style={s.shadow}>
              <Input
                placeholder="Search Here"
                placeholderTextColor={'grey'}
                onChangeText={text => handleChange(text)}
                value={searchText}
                w={moderateScale(320, 0.1)}
                h={moderateScale(37, 0.1)}
                variant="rounded"
                InputLeftElement={
                  <View style={{paddingLeft: 10}}>
                    <SearchIcon
                      width={moderateScale(25, 0.1)}
                      height={moderateScale(25, 0.1)}
                    />
                  </View>
                }
                InputRightElement={
                  <TouchableOpacity
                    onPress={() => handleCancel()}
                    style={{paddingRight: 10}}
                  >
                    {searchText ? (
                      <Feather
                        name={'x'}
                        size={moderateScale(20, 0.1)}
                        color={'grey'}
                      />
                    ) : null}
                  </TouchableOpacity>
                }
                color={'#000'}
                backgroundColor={'#F6F6F6'}
              />
            </View>
          </View>

          <ScrollView
            style={{
              marginTop: moderateScale(10, 0.1),
              marginBottom: moderateScale(250, 0.1),
            }}
            contentContainerStyle={{flexGrow: 1}}
          >
            <View style={s.collection}>
              {songList.map((item, i) => {
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
                          <View style={s.innerView}></View>
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
                              // console.log(i);
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
        </View>
      </Box>
    </SafeAreaView>
  );
};

export default Search;
