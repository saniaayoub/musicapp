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
import SoundPlayer from 'react-native-sound-player';

const Favorite = ({navigation}) => {
  const context = useContext(AppContext);

  const [isPlay, setIsPlay] = useState(false);
  const [favList, setFavList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    getSongs(context.songs);
    SoundPlayer.stop();
    context.setSongState('stop');
  }, [context.songs]);

  const getSongs = songs => {
    setLoader(true);
    let tempArray;
    tempArray = songs.filter(item => item.fav == true);
    tempArray = tempArray.map(item => {
      return {...item, play: false};
    });
    setFavList(tempArray);
    setLoader(false);
  };

  const playSong = item => {
    setIsPlay(!isPlay);

    //update play pause button
    setPlayButton(item);

    if (index == item.id) {
      // If same song
      console.log('here2');
      if (context.songState === 'play') {
        console.log(context.songState);
        SoundPlayer.pause();
        context.setSongState('pause');
      } else if (context.songState === 'pause') {
        console.log(context.songState);
        SoundPlayer.resume();
        context.setSongState('play');
      }
    } else {
      console.log('here1');
      if (
        context.songState === 'play' ||
        context.songState === 'stop' ||
        context.songState === 'pause'
      ) {
        console.log(context.songState);
        SoundPlayer.stop();
        SoundPlayer.playUrl(item.url);
        context.setSongState('play');
        console.log(index);
        setIndex(item.id);
      }
    }
  };
  const setPlayButton = item => {
    let tempArray;
    tempArray = favList.map(elem => {
      if (elem.id === item.id) {
        return {...elem, play: !elem.play};
      } else if (elem.id === index) {
        return {...elem, play: false};
      } else {
        return elem;
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
            <View style={s.backbutton}>
              <Button
                size="sm"
                onPress={() => navigation.goBack()}
                variant={'link'}
                backgroundColor={'#fff'}
                borderRadius={moderateScale(14, 0.1)}
                padding={moderateScale(7, 0.1)}
                zIndex={1000}
              >
                <Image source={backarrow} resizeMode="contain" />
                {/* <Icon name={'arrow-circle-left'} color={'#fff'} size={25} /> */}
              </Button>
            </View>
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
                {favList.map(item => {
                  return (
                    <>
                      <View style={s.item} key={item.id}>
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
                            source={item.image}
                            resizeMode={'cover'}
                            width={undefined}
                            height={undefined}
                          >
                            <View style={s.innerView}>
                              <Image
                                source={play}
                                width={undefined}
                                height={undefined}
                                resizeMode={'cover'}
                              />
                            </View>
                          </ImageBackground>
                        </TouchableOpacity>
                        <View style={s.centerView}>
                          <View style={s.row}>
                            <View style={s.descriptionView}>
                              <Text style={s.text1}>{item.text}</Text>
                              <Text style={s.text2}>{item.description}</Text>
                            </View>
                            <TouchableOpacity
                              style={s.playbutton}
                              onPress={() => {
                                playSong(item);
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
