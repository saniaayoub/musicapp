import {StyleSheet, Text, View, TouchableOpacity, Platform} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
const bakbakFont = 'BakbakOneRegular';
const poppinsFont = 'Poppins-Medium';
const InterMedium = 'Inter-Medium';
const InterRegular = 'Inter-Regular';
const radio = ({onPress, selected, children}) => {
  return (
    <View style={styles.radioButtonContainer}>
      <TouchableOpacity onPress={onPress} style={styles.radioButton}>
        {selected ? <View style={styles.radioButtonIcon} /> : null}
      </TouchableOpacity>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.radioButtonText}>{children}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default radio;

const styles = StyleSheet.create({
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: moderateScale(5, 0.1),
    // marginHorizontal: moderateScale(20, 0.1),
  },
  radioButton: {
    height: moderateScale(18, 0.1),
    width: moderateScale(18, 0.1),
    backgroundColor: '#fff',
    borderRadius: moderateScale(10, 0.1),
    borderWidth: moderateScale(1, 0.1),
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonIcon: {
    height: moderateScale(11, 0.1),
    width: moderateScale(11, 0.1),
    borderRadius: moderateScale(7, 0.1),
    backgroundColor: '#C26AF8',
  },
  radioButtonText: {
    marginTop: moderateScale(3, 0.1),
    color: '#000',
    fontWeight: '600',
    fontSize: moderateScale(11, 0.1),
    fontFamily: InterMedium,
    marginLeft: moderateScale(7, 0.1),
  },
});
