import {Dimensions, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
const InterMedium = 'Inter-Medium';
const InterRegular = 'Inter-Regular';

const InterBold = 'Inter-ExtraBold';
const Poppins = 'Poppins-Regular';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
  },
  backbutton: {
    position: 'absolute',
    left: 15,
    top: 15,
  },
  heading: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScale(40, 0.1),
    marginBottom: moderateScale(20, 0.1),
  },
  headingText: {
    fontFamily: InterMedium,
    fontSize: moderateScale(16, 0.1),
    color: '#fff',
    lineHeight: moderateScale(29, 0.1),
    fontWeight: '500',
  },
  collection: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(10, 0.1),
    overflow: 'hidden',
    margin: moderateScale(5, 0.1),
    width: moderateScale(100, 0.1),
    height: moderateScale(80, 0.1),
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    marginBottom: moderateScale(10, 0.1),
    borderRadius: moderateScale(10, 0.1),
    alignItems: 'center',
    justifyContent: 'center',
    padding: moderateScale(5, 0.1),
  },

  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playbutton: {
    // marginTop: moderateScale(20, 0.1),
    // marginLeft: moderateScale(20, 0.1),
  },
  track: {
    backgroundColor: '#fff',
    height: moderateScale(1, 0.1),
  },
  thumb: {
    backgroundColor: '#fff',
    width: moderateScale(8, 0.1),
    height: moderateScale(8, 0.1),
  },
  slider: {
    marginTop: moderateScale(-5, 0.1),
  },

  timer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: moderateScale(-10, 0.1),
    marginBottom: moderateScale(10, 0.1),
    // alignItems: 'center',
    // paddingTop: moderateScale(-50, 0.1),
  },
  innerView: {
    width: moderateScale(100, 0.1),
    height: moderateScale(80, 0.1),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    zIndex: 1000,
  },

  centerView: {
    marginHorizontal: moderateScale(10, 0.1),
    width: moderateScale(200, 0.1),
  },
  descriptionView: {
    marginTop: moderateScale(10, 0.1),
    marginBottom: moderateScale(5, 0.1),
  },
  text1: {
    color: '#fff',
    fontSize: moderateScale(11, 0.1),
    fontFamily: InterMedium,
    paddingVertical: moderateScale(5, 0.1),
    // fontWeight: '700',
  },
  text2: {
    color: '#fff',
    fontSize: moderateScale(7, 0.1),
    fontFamily: InterRegular,
    // fontWeight: '700',
  },
  empty: {
    color: '#fff',
    fontSize: moderateScale(12, 0.1),
    fontFamily: InterRegular,

    textAlign: 'center',
    // fontWeight: '700',
  },
});

export default styles;
