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
import Backarrowsvg from '../../assets/images/backarrow.svg';

const Favorite = ({navigation}) => {
  const context = useContext(AppContext);

  const [favList, setFavList] = useState(context.songs);
  const [loader, setLoader] = useState(false);

  const setPlayButton = item => {
    let tempArray;
    tempArray = favList.map((elem, i) => {
      if (elem.id == item.id) {
        return {...elem, play: !elem.play};
      } else {
        return {...elem, play: false};
      }
    });
    setFavList(tempArray);
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
            {/* <View style={s.backbutton}>
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
                <Backarrowsvg
                  width={moderateScale(14, 0.1)}
                  height={moderateScale(14, 0.1)}
                />
                <Image source={backarrow} resizeMode="contain" />
                <Icon name={'arrow-circle-left'} color={'#fff'} size={25} />
              </Button>
            </View> */}
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
                            <View
                              style={{
                                flexDirection: 'row',
                              }}
                            >
                              <View
                                style={{
                                  marginRight: moderateScale(10, 0.1),
                                  marginTop: moderateScale(23, 0.1),
                                }}
                              >
                                <Icon name={'heart'} color={'#fff'} size={25} />
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
                          </View>

                          <View style={s.slider}>
                            <Slider thumbStyle={s.thumb} trackStyle={s.track} />
                            <View style={s.timer}>
                              <Text style={s.text2}>00:00</Text>
                              <Text style={s.text2}>00:30</Text>
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
