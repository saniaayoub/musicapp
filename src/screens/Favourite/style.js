import {Dimensions, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
const InterMedium = 'Inter-Medium';
const InterRegular = 'Inter-Regular';

const InterBold = 'Inter-ExtraBold';
const Poppins = 'Poppins-Regular';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
  backbutton: {
    position: 'absolute',
    left: 20,
    top: 25,
  },
  heading: {
    height: moderateScale(139, 0.1),
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingText: {
    fontFamily: InterMedium,
    fontSize: moderateScale(24, 0.1),
    color: '#fff',
    lineHeight: moderateScale(29, 0.1),
    fontWeight: '500',
  },
  collection: {
    marginTop: moderateScale(20, 0.1),
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  item: {
    borderRadius: moderateScale(5, 0.1),
    overflow: 'hidden',
    margin: moderateScale(5, 0.1),
  },
  innerView: {
    width: moderateScale(106, 0.1),
    height: moderateScale(108, 0.1),
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.2)',
    zIndex: 1000,
  },
  imgback: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  imgtext: {
    color: '#fff',
    fontFamily: InterRegular,
    fontSize: moderateScale(10, 0.1),
    marginBottom: moderateScale(5),
    marginLeft: moderateScale(5, 0.1),
  },
  description: {
    marginBottom: moderateScale(5, 0.1),
    marginLeft: moderateScale(5, 0.1),
    color: '#fff',
    fontFamily: InterRegular,
    fontSize: moderateScale(5, 0.1),
  },
  imgtext2: {
    color: '#fff',
    fontFamily: InterMedium,
    fontSize: moderateScale(10, 0.1),
    marginLeft: moderateScale(5, 0.1),
  },
  FeaturedSection: {
    marginTop: moderateScale(25, 0.1),
    marginBottom: moderateScale(70, 0.1),
  },
  collection2: {
    marginTop: moderateScale(5, 0.1),
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  headingText2: {
    fontFamily: InterBold,
    fontSize: moderateScale(22, 0.1),
    color: '#fff',
    lineHeight: moderateScale(29, 0.1),
    marginLeft: moderateScale(35, 0.1),
  },
});

export default styles;
