import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import s from './style';
import LinearGradient from 'react-native-linear-gradient';
import playlistback from '../../assets/images/playlistback.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Button, Box} from 'native-base';
import {moderateScale} from 'react-native-size-matters';
import AppContext from '../../Providers/AppContext';
import Slider from 'react-native-slider';
import healing1 from '../../assets/images/healing1.png';
import play from '../../assets/images/play.png';
import Playbutton from '../../assets/images/playbutton.svg';
import backarrow from '../../assets/images/backarrow.png';
import trackback from '../../assets/images/trackback.png';
import SoundPlayer from 'react-native-sound-player';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
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

const Playlist = ({navigation}) => {
  const context = useContext(AppContext);
  const [playList, setPlayList] = useState(context.songs);

  const setPlayButton = item => {
    let tempArray;
    tempArray = playList.map((elem, i) => {
      if (elem.id == item.id) {
        return {...elem, play: !elem.play};
      } else {
        return {...elem, play: false};
      }
    });
    setPlayList(tempArray);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        source={playlistback}
        blurRadius={5}
        resizeMode={'cover'}
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
              style={{
                marginBottom:
                  Platform.OS == 'ios'
                    ? moderateScale(330, 0.1)
                    : moderateScale(80, 0.1),
              }}
            >
              <View style={s.section}>
                <View style={s.imageTop}>
                  <Image
                    source={trackback}
                    width={undefined}
                    height={undefined}
                    resizeMode={'cover'}
                  />
                </View>
                <View style={s.descriptionViewTop}>
                  <Text style={s.text1Top}>Wait for a minute</Text>
                  <Text style={s.text2Top}>Julie Watson And John Smith</Text>
                </View>
              </View>

              <View style={s.collection}>
                {playList.map((item, i) => {
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
                                setPlayButton(item);
                              }}
                            >
                              {item.play ? (
                                <Icon
                                  name={'pause-circle'}
                                  color={'#fff'}
                                  size={28}
                                />
                              ) : (
                                <Icon
                                  name={'play-circle'}
                                  color={'#fff'}
                                  size={28}
                                />
                              )}
                            </TouchableOpacity>
                          </View>
                          <View style={s.slider}>
                            <Slider thumbStyle={s.thumb} trackStyle={s.track} />
                            <View style={s.timer}>
                              <Text style={s.text2}>00.00</Text>
                              <Text style={s.text2}>03.20</Text>
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
