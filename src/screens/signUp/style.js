import {Dimensions, Platform, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
const InterRegular = 'Inter-Medium';
const InterBold = 'Inter-ExtraBold';
const Poppins = 'Poppins-Regular';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(110, 46, 149, 0.375)',
  },
  heading: {
    marginTop: moderateScale(60, 0.1),
    marginBottom: moderateScale(30, 0.1),
  },
  headingText: {
    fontFamily: InterBold,
    color: '#fff',
    fontSize: moderateScale(25, 0.1),
    lineHeight: moderateScale(30, 0.1),
  },
  iconCircle: {
    borderRadius: moderateScale(20, 0.1),
    borderWidth: moderateScale(1, 0.1),
    borderColor: '#fff',
    padding: moderateScale(7, 0.1),
    marginRight: moderateScale(10, 0.1),
    marginBottom: moderateScale(5, 0.1),
  },
  input: {
    marginVertical: moderateScale(10, 0.1),
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
  signInNow: {
    color: '#fff',
    fontSize: moderateScale(10, 0.1),
    lineHeight: moderateScale(15, 0.1),
    fontFamily: Poppins,
  },
  bottomLink: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36,
    // marginBottom: 10,

    // position: 'absolute',
    // bottom:
    //   Platform.OS == 'ios' ? moderateScale(120, 0.1) : moderateScale(40, 0.1),
  },
  inputStyle: {
    fontSize: moderateScale(14, 0.1),
    fontFamily: 'Gilroy-Medium',
    color: '#fff',
  },
  inputContainerStyle: {
    width: '75%',
    paddingVertical: moderateScale(10, 0.1),
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
  },
  eye: {
    position: 'absolute',
    top: moderateScale(13),
    right: moderateScale(13),
  },
  error: {
    color: 'red',
    fontSize: moderateScale(12, 0.1),
  },
});

export default styles;
