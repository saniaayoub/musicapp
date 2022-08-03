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

const UserHome = ({navigation}) => {
  const context = useContext(AppContext);
  const [featured, setFeatured] = useState(context.songs);

  useEffect(() => {
    setFeatured(context.songs);
  }, []);

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
                data={featured}
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
                          <Text style={s.imgtext}>{item.text}</Text>
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
                        onPress={() =>
                          navigation.navigate('NowPlaying', {data: item})
                        }
                      >
                        <ImageBackground
                          source={item.image}
                          resizeMode="contain"
                          width={undefined}
                          height={undefined}
                        >
                          <View style={s.innerView}>
                            <Text style={s.imgtext2}>{item.text}</Text>
                            <Text style={s.description}>
                              {item.description}
                            </Text>
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
