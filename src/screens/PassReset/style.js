import {Dimensions, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
const InterRegular = 'Inter-Medium';
const InterBold = 'Inter-ExtraBold';
const Poppins = 'Poppins-Regular';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(110, 46, 149, 0.375)',
    height: '100%',
  },
  heading: {
    marginTop: moderateScale(-90, 0.1),
    marginBottom: moderateScale(50, 0.1),
    justifyContent: 'center',
    alignItems: 'center',
  },
  backbutton: {
    position: 'absolute',
    left: 20,
    top: 25,
    zIndex: 1000,
  },
  headingText: {
    fontFamily: InterBold,
    color: '#fff',
    fontSize: moderateScale(25, 0.1),
    lineHeight: moderateScale(30, 0.1),
  },
  verifyText: {
    marginVertical: moderateScale(10, 0.1),
    textAlign: 'center',
    width: moderateScale(280, 0.1),
    color: '#fff',
    fontSize: moderateScale(11, 0.1),
    lineHeight: moderateScale(15, 0.1),
    fontFamily: InterRegular,
  },
  iconCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: moderateScale(15, 0.1),
    marginRight: moderateScale(10, 0.1),
    // marginBottom: moderateScale(5, 0.1),
  },
  input: {
    marginVertical: moderateScale(20, 0.1),
  },
  button: {
    marginTop: moderateScale(15, 0.1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontFamily: Poppins,
    lineHeight: moderateScale(18, 0.1),
    fontSize: moderateScale(12, 0.1),
    color: '#C26AF8',
  },
  forgetPass: {
    color: '#fff',
    fontSize: moderateScale(10, 0.1),
    lineHeight: moderateScale(15, 0.1),
    fontFamily: Poppins,
  },
  bottomLink: {
    position: 'absolute',
    bottom:
      Platform.OS == 'ios' ? moderateScale(120, 0.1) : moderateScale(40, 0.1),
  },
  error: {
    color: 'red',
    fontSize: moderateScale(12, 0.1),
    textAlign: 'left',
  },
  eye: {
    position: 'absolute',
    top: moderateScale(13),
    right: moderateScale(13),
  },
});

export default styles;
