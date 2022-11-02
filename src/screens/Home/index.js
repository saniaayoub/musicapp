import {
  ImageBackground,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Box} from 'native-base';
import s from './style';
import homeback from '../../assets/images/homeback.png';
import TrackPlayer, {Capability, RepeatMode} from 'react-native-track-player';
import axiosconfig from '../../Providers/axios';
import {useDispatch, useSelector} from 'react-redux';
import Player from '../../Components/player';
import {
  setPlayObject,
  playPause,
  setFavorite,
  setFeatured,
} from '../../Redux/actions';
import {moderateScale} from 'react-native-size-matters';

const UserHome = ({navigation}) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.reducer.userToken);
  const featured = useSelector(state => state.reducer.featured);
  const music = useSelector(state => state.reducer.music);
  const [categories, setCategories] = useState();
  const [loader, setLoader] = useState();

  useEffect(() => {
    setupPlayer();
    getCategoryList();
    getFeatured();
    getFavList();
  }, []);

  const setupPlayer = async () => {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.add(music);
    await TrackPlayer.setRepeatMode(RepeatMode.Off);
    await TrackPlayer.updateOptions({
      stopWithApp: true,
      stoppingAppPausesPlayback: true,
      alwaysPauseOnInterruption: true,
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
        Capability.SeekTo,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
        Capability.SeekTo,
      ],
      progressUpdateEventInterval: 2,
    });
  };

  const getIndexFromQueue = async song => {
    let queue = await TrackPlayer.getQueue();
    for (let i = 0; i < queue.length; i++) {
      if (queue[i].id == song.id) {
        await TrackPlayer.skip(i).then(async () => {
          await TrackPlayer.play().then(() => {
            dispatch(setPlayObject(queue[i]));
            navigation.navigate('NowPlaying');
            dispatch(playPause('play'));
          });
        });
        break;
      }
    }
  };

  const getCategoryList = async () => {
    setLoader(true);
    await axiosconfig
      .get('categary_list', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        console.log('categories', JSON.stringify(res.data));
        setLoader(false);
        if (res.data) {
          console.log(res?.data);
          setCategories(res?.data);
        }
      })
      .catch(err => {
        setLoader(false);
        console.log(err.response);
      });
  };

  const getFeatured = async () => {
    setLoader(true);
    await axiosconfig
      .get('feature_music', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        console.log('featured', JSON.stringify(res.data));
        setLoader(false);
        if (res.data) {
          console.log(res?.data);
          dispatch(setFeatured(res?.data));
        }
      })
      .catch(err => {
        setLoader(false);
        console.log(err.response);
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

  const getHeader = () => {
    return null;
  };

  const getFooter = () => {
    return null;
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{width: '100%'}} keyboardShouldPersistTaps="always">
        <Box
          bg={{
            linearGradient: {
              colors: ['#000000', '#B462E5'],
              start: [0, 0],
              end: [0, 1],
            },
          }}
          minH={moderateScale(1000, 0.1)}
        >
          <View style={s.container}>
            {/******** Head *********/}
            <View style={s.header}>
              <ImageBackground
                source={homeback}
                width={undefined}
                resizeMode={'cover'}
              >
                <View style={s.heading}>
                  <Text style={s.headingText}>Categories</Text>
                </View>
              </ImageBackground>
            </View>

            {/**** Collection *****/}
            <View style={s.collection}>
              <FlatList
                data={categories}
                numColumns={3}
                renderItem={({item, index, separators}) => (
                  <>
                    <TouchableOpacity
                      style={s.item}
                      onPress={() =>
                        navigation.navigate('Playlist', {data: item})
                      }
                    >
                      <ImageBackground
                        source={{uri: item.image}}
                        resizeMode="contain"
                        width={undefined}
                        height={undefined}
                      >
                        <View style={s.innerView}>
                          <Text style={s.imgtext}>{item.name}</Text>
                        </View>
                      </ImageBackground>
                    </TouchableOpacity>
                  </>
                )}
                ListHeaderComponent={getHeader}
                ListFooterComponent={getFooter}
              />
            </View>

            <View style={s.FeaturedSection}>
              <Text style={s.headingText2}>Featured Music</Text>
              <View style={s.collection2}>
                <FlatList
                  data={featured}
                  numColumns={3}
                  renderItem={({item, index, separators}) => (
                    <>
                      <TouchableOpacity
                        style={s.item}
                        onPress={() => {
                          getIndexFromQueue(item);
                        }}
                      >
                        <ImageBackground
                          source={{uri: item.artwork}}
                          resizeMode="cover"
                          width={undefined}
                          height={undefined}
                        >
                          <View style={s.innerView}>
                            <Text style={s.imgtext2}>{item.title}</Text>
                            <Text style={s.description}>{item.artist}</Text>
                          </View>
                        </ImageBackground>
                      </TouchableOpacity>
                    </>
                  )}
                  ListHeaderComponent={getHeader}
                  ListFooterComponent={getFooter}
                />
              </View>
            </View>
          </View>
        </Box>
      </ScrollView>
      <Player navigationProp={navigation} />
    </SafeAreaView>
  );
};

export default UserHome;
