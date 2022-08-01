import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
const InterMedium = 'Inter-Medium';
const InterRegular = 'Inter-Regular';

const InterBold = 'Inter-ExtraBold';
const Poppins = 'Poppins-Regular';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.75)',
    zIndex: 1000,
    height: '100%',
  },

  backbutton: {
    position: 'absolute',
    left: 15,
    top: 15,
  },
  header: {
    zIndex: 100,
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
  imageTop: {
    justifyContent: 'center',
    alignSelf: 'center',
    overflow: 'hidden',
    width: moderateScale(300, 0.1),
    height: moderateScale(350, 0.1),
    borderRadius: moderateScale(10, 0.1),
  },
  descriptionViewTop: {
    position: 'absolute',
    bottom: moderateScale(15, 0.1),
    left: moderateScale(15, 0.1),
  },
  text1Top: {
    color: '#fff',
    fontSize: moderateScale(21, 0.1),
    fontFamily: InterMedium,
    paddingVertical: moderateScale(5, 0.1),
  },
  text2Top: {
    color: '#fff',
    fontSize: moderateScale(12, 0.1),
    fontFamily: InterRegular,
  },
  bottomContainer: {
    width: '100%',
    backgroundColor: 'rgba(194, 106, 248, 0.36)',
    borderTopLeftRadius: moderateScale(25, 0.1),
    borderTopRightRadius: moderateScale(25, 0.1),
    borderColor: '#fff',
    marginTop: moderateScale(20, 0.1),
    borderWidth: moderateScale(1, 0.1),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  button: {
    marginTop: moderateScale(15, 0.1),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: moderateScale(45, 0.1),
  },
  btnText: {
    fontFamily: Poppins,
    lineHeight: moderateScale(18, 0.1),
    fontSize: moderateScale(12, 0.1),
    color: '#C26AF8',
  },
  collection: {
    width: '100%',
    backgroundColor: 'rgba(194, 106, 248, 0.36)',
    borderTopLeftRadius: moderateScale(25, 0.1),
    borderTopRightRadius: moderateScale(25, 0.1),
    borderColor: '#fff',
    marginTop: moderateScale(20, 0.1),
    borderWidth: moderateScale(1, 0.1),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
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
    marginTop: moderateScale(20, 0.1),
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
  timer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: moderateScale(-10, 0.1),
    marginBottom: moderateScale(10, 0.1),
  },
  innerView: {
    width: moderateScale(100, 0.1),
    height: moderateScale(80, 0.1),
    justifyContent: 'center',
    alignItems: 'center',
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
  centerView: {
    marginTop: moderateScale(20, 0.1),
    marginHorizontal: moderateScale(40, 0.1),
  },
  centerView1: {
    marginBottom: moderateScale(20, 0.1),
    marginHorizontal: moderateScale(20, 0.1),
    marginTop: moderateScale(-10, 0.1),
  },
  descriptionView: {
    marginTop: moderateScale(10, 0.1),
  },
  text1: {
    color: '#fff',
    fontSize: moderateScale(14, 0.1),
    fontFamily: InterMedium,
  },
  text2: {
    color: '#fff',
    fontSize: moderateScale(7, 0.1),
    fontFamily: InterRegular,
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
  space: {
    marginTop: moderateScale(12, 0.1),
  },
});

export default styles;
