import {
  ImageBackground,
  SafeAreaView,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
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
import {setPlayObject, setFavorite} from '../../Redux/actions';
import backarrow from '../../assets/images/backarrow.png';
import TrackPlayer, {
  State,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';

const Playlist = ({navigation, route}) => {
  let playObject = useSelector(state => state.reducer.play_object);
  const progress = useProgress();
  const playerState = usePlaybackState();
  const dispatch = useDispatch();
  const {data} = route.params;
  const [playList, setPlayList] = useState(data?.musics);
  const [index, setIndex] = useState();
  const [loader, setLoader] = useState(false);
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    getQueue();
  }, []);

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
    console.log(index);
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
                                  size={moderateScale(32, 0.1)}
                                />
                              ) : (
                                <Icon
                                  name={'play-circle'}
                                  color={'#fff'}
                                  size={moderateScale(32, 0.1)}
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
