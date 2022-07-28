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
} from 'react-native';
import React from 'react';
import {Box} from 'native-base';
import s from './style';
import background from '../../assets/images/background.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Button, ScrollView} from 'native-base';
import {moderateScale} from 'react-native-size-matters';
import homeback from '../../assets/images/homeback.png';
import healing1 from '../../assets/images/healing1.png';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Favorite = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{width: '100%'}}>
        <Box
          height={height}
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
              <View style={s.heading}>
                <Text style={s.headingText}>Categories</Text>
              </View>
            </View>
          </View>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Favorite;
