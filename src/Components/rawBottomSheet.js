import React, {useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {moderateScale} from 'react-native-size-matters';
import {Input, FormControl, Button} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useIsFocused} from '@react-navigation/native';
import {useState} from 'react';
import {useEffect} from 'react';

const InterMedium = 'Inter-Medium';
const InterRegular = 'Inter-Regular';
const InterBold = 'Inter-ExtraBold';
const Poppins = 'Poppins-Regular';

const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const RawBottomSheet = ({title, field, setValue, openSheet, setOpenSheet}) => {
  const refRBSheet = useRef();
  const [error, setError] = useState();

  setTimeout(() => {
    if (openSheet) {
      refRBSheet.current.open();
    }
  }, 100);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
      }}
    >
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        onClose={() => setOpenSheet(false)}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          container: {
            backgroundColor: '#fff',
            borderWidth: 1,
            borderTopLeftRadius: moderateScale(25, 0.1),
            borderTopRightRadius: moderateScale(25, 0.1),

            borderColor: 'grey',
            height: moderateScale(150, 0.1),
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}
      >
        <Text style={s.heading}>{title}</Text>
        <View style={s.input}>
          <Input
            w={{
              base: '80%',
            }}
            variant="underlined"
            autoFocus={true}
            InputLeftElement={
              <View style={s.iconCircle}>
                <Icon
                  name={
                    title == 'Email'
                      ? 'envelope'
                      : title == 'Full Name'
                      ? 'user'
                      : 'phone'
                  }
                  color="grey"
                  size={moderateScale(20, 0.1)}
                />
              </View>
            }
            InputRightElement={
              <TouchableOpacity
                onPress={() => {
                  setOpenSheet(false);
                  refRBSheet.current.close();
                }}
                style={{marginLeft: moderateScale(10, 0.1)}}
              >
                <Icon
                  name={'check'}
                  color="#C26AF8"
                  size={moderateScale(20, 0.1)}
                />
              </TouchableOpacity>
            }
            placeholder={title}
            placeholderTextColor={'grey'}
            onChangeText={text => {
              setValue(text);
            }}
            color={'#000'}
            fontSize={moderateScale(14, 0.1)}
          />
          {error ? <Text style={s.error}>{error}</Text> : <Text> </Text>}
        </View>
      </RBSheet>
    </View>
  );
};

const s = StyleSheet.create({
  heading: {
    color: '#000',
    fontSize: moderateScale(16, 0.1),
    lineHeight: moderateScale(15, 0.1),
    fontFamily: InterBold,
    marginLeft: moderateScale(20, 0.1),
    marginVertical: moderateScale(10, 0.1),
  },
  iconCircle: {
    padding: moderateScale(7, 0.1),
    marginRight: moderateScale(10, 0.1),
    // marginBottom: moderateScale(5, 0.1),
  },
  input: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: moderateScale(10, 0.1),
    // marginLeft: moderateScale(20, 0.1),
  },
  error: {
    color: 'red',
    fontSize: moderateScale(12, 0.1),
  },
});
export default RawBottomSheet;
