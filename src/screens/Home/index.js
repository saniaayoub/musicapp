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
import React, { useContext, useState, useEffect } from 'react';
import { Box } from 'native-base';
import s from './style';
import homeback from '../../assets/images/homeback.png';
import AppContext from '../../Providers/AppContext';
import Categories from '../../Components/Categories';
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

const UserHome = ({ navigation }) => {
  const context = useContext(AppContext);
  const [featured, setFeatured] = useState(Songs);

  useEffect(() => {
    // console.log(context.songs);
    // setFeatured(context.songs);
    TrackPlayer.setupPlayer()
    TrackPlayer.add(Songs);
    TrackPlayer.updateOptions({
      // Media controls capabilities
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
      ],

      // Capabilities that will show up when the notification is in the compact form on Android
      compactCapabilities: [Capability.Play, Capability.Pause],

      // Icons for the notification on Android (if you don't like the default ones)
      playIcon: 'https://img.icons8.com/ios-glyphs/344/play--v1.png 2x',
      pauseIcon: 'https://img.icons8.com/ios-glyphs/344/pause--v1.png 2x',
      stopIcon: 'https://img.icons8.com/ios-glyphs/344/stop--v1.png 2x',
      previousIcon: 'https://img.icons8.com/ios-glyphs/344/prevoius--v1.png 2x',
      nextIcon: 'https://img.icons8.com/ios-glyphs/344/next--v1.png 2x',
      icon: 'https://img.icons8.com/ios-glyphs/344/notification--v1.png 2x'
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ width: '100%' }}>
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
                renderItem={({ item, index, separators }) => (
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
                  renderItem={({ item, index, separators }) => (
                    <>
                      <TouchableOpacity
                        style={s.item}
                        onPress={() =>
                          navigation.navigate('NowPlaying', { data: item, index: index })
                        }
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
    </SafeAreaView>
  );
};

export default UserHome;
