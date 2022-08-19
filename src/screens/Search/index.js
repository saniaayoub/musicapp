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
import SearchIcon from '../../assets/images/search1.svg';

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

const Search = ({navigation}) => {
  const context = useContext(AppContext);
  const playbackState = usePlaybackState();
  const progress = useProgress();
  const [songList, setSongList] = useState(context.songs);
  const [loader, setLoader] = useState(false);
  const [currentTrack, setCurrentTrack] = useState({});

  useEffect(() => {}, []);

  const setPlayButton = item => {
    let tempArray;
    tempArray = songList.map((elem, i) => {
      if (elem.id == item.id) {
        return {...elem, play: !elem.play};
      } else {
        return {...elem, play: false};
      }
    });
    setSongList(tempArray);
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
                w={moderateScale(350, 0.1)}
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
                color={'#000'}
                backgroundColor={'#F6F6F6'}
              />
            </View>
          </View>
          {loader ? (
            <ActivityIndicator />
          ) : songList.length ? (
            <ScrollView
              style={{
                marginBottom: moderateScale(60, 0.1),
                marginTop: moderateScale(10, 0.1),
              }}
              contentContainerStyle={{flexGrow: 1}}
            >
              <View style={s.collection}>
                {songList.map((item, i) => {
                  return (
                    <>
                      <View style={s.item} key={i.toString()}>
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
                                setPlayButton(item);
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
                              // value={progress.position}
                              // minimumValue={0}
                              // maximumValue={progress.duration}
                              // onSlidingComplete={async value => {
                              //   await TrackPlayer.seekTo(value);
                              // }}
                              thumbStyle={s.thumb}
                              trackStyle={s.track}
                            />
                            <View style={s.timer}>
                              <Text style={s.text2}>00:00</Text>
                              <Text style={s.text2}>03:00</Text>
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

export default Search;
