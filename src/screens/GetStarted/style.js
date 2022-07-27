import {Dimensions, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
const InterRegular = 'Inter-Medium';
const InterBold = 'Inter-ExtraBold';
const Poppins = 'Poppins-Regular';
const Imperial = 'ImperialScript-Regular';
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(110, 46, 149, 0.375)',
  },
  heading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingText: {
    fontFamily: Imperial,
    color: '#fff',
    fontSize: moderateScale(58, 0.1),
    lineHeight: moderateScale(70, 0.1),
    borderWidth: 1,
    borderColor: '#fff',
  },
  para: {
    marginVertical: moderateScale(5, 0.1),
    width: '80%',
  },
  paraText: {
    color: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    lineHeight: moderateScale(18, 0.1),
    fontFamily: Poppins,
    fontSize: moderateScale(12, 0.1),
    marginBottom: moderateScale(30, 0.1),
  },
  btnText: {
    fontSize: moderateScale(12, 0.1),
    lineHeight: moderateScale(18, 0.1),
    fontFamily: Poppins,
    color: '#fff',
  },
  button: {
    position: 'absolute',
    bottom: moderateScale(60, 0.1),
  },
});

export default styles;
