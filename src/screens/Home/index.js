import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import {Box} from 'native-base';
import s from './style';
import homeback from '../../assets/images/homeback.png';
import AppContext from '../../Providers/AppContext';
import Categories from '../../Components/Categories';
import Songs from '../../Components/songs';
import OTPInputView from '@twotalltotems/react-native-otp-input'

import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import axiosconfig from '../../Providers/axios';
import {useDispatch, useSelector} from 'react-redux';
import Player from '../../Components/player';
import {setPlayObject} from '../../Redux/actions';
import {moderateScale} from 'react-native-size-matters';

const UserHome = ({navigation}) => {
  const context = useContext(AppContext);
  const dispatch = useDispatch();
  const [featured, setFeatured] = useState(Songs);

  useEffect(() => {
    // getCategories()
    TrackPlayer.setupPlayer();
    TrackPlayer.add(Songs);
    TrackPlayer.setRepeatMode(RepeatMode.Off);
    TrackPlayer.updateOptions({
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
        Capability.SeekTo,
      ],
      progressUpdateEventInterval: 2,
    });
  }, []);

  //   const getCategories = async() => {
  // await axiosconfig.get('')
  //   }

  const getIndexFromQueue = async song => {
    let queue = await TrackPlayer.getQueue();
    queue.every(async (item, i) => {
      if (song.id == item.id) {
        await TrackPlayer.skip(i).then(async res => {
          TrackPlayer.play();
          dispatch(setPlayObject(item));
          navigation.navigate('NowPlaying');
        });
        return false;
      }
      return true;
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{width: '100%'}}>
        <Box
          bg={{
            linearGradient: {
              colors: ['#000000', '#B462E5'],
              start: [0, 0],
              end: [0, 1],
            },
          }}
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
                data={Categories}
                numColumns={3}
                renderItem={({item, index, separators}) => (
                  <>
                    <TouchableOpacity
                      style={s.item}
                      onPress={() => navigation.navigate('Playlist')}
                    >
                      <ImageBackground
                        source={item.image}
                        resizeMode="contain"
                        width={undefined}
                        height={undefined}
                      >
                        <View style={s.innerView}>
                          <Text style={s.imgtext}>{item.category}</Text>
                        </View>
                      </ImageBackground>
                    </TouchableOpacity>
                  </>
                )}
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
                          source={item.artwork}
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
