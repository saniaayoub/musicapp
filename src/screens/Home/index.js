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
import React from 'react';
import {Box} from 'native-base';
import s from './style';
import homeback from '../../assets/images/homeback.png';

const Collection = [
  {
    id: 1,
    image: require('../../assets/images/healing1.png'),
    text: 'Healing01',
  },
  {
    id: 2,
    image: require('../../assets/images/healing2.png'),
    text: 'Healing02',
  },
  {
    id: 3,
    image: require('../../assets/images/healing3.png'),
    text: 'Healing03',
  },
  {
    id: 4,
    image: require('../../assets/images/healing4.png'),
    text: 'Healing04',
  },
  {
    id: 5,
    image: require('../../assets/images/healing5.png'),
    text: 'Healing05',
  },
  {
    id: 6,
    image: require('../../assets/images/healing6.png'),
    text: 'Healing06',
  },
  {
    id: 7,
    image: require('../../assets/images/healing7.png'),
    text: 'Healing07',
  },
  {
    id: 8,
    image: require('../../assets/images/healing8.png'),
    text: 'Healing08',
  },
  {
    id: 9,
    image: require('../../assets/images/healing9.png'),
    text: 'Healing09',
  },
];
const Collection2 = [
  {
    id: 1,
    image: require('../../assets/images/healing1.png'),
    text: 'Wait for a minute',
    description: 'Julie Watson And John Smith ',
  },
  {
    id: 2,
    image: require('../../assets/images/healing2.png'),
    text: 'Wait for a minute',
    description: 'Julie Watson And John Smith ',
  },
  {
    id: 3,
    image: require('../../assets/images/healing3.png'),
    text: 'Wait for a minute',
    description: 'Julie Watson And John Smith ',
  },
];

const UserHome = ({navigation}) => {
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
                data={Collection}
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
                  data={Collection2}
                  numColumns={3}
                  renderItem={({item, index, separators}) => (
                    <>
                      <TouchableOpacity
                        style={s.item}
                        onPress={() => navigation.navigate('NowPlaying')}
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
