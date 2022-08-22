import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
const InterLight = 'Inter-Light';
const InterRegular = 'Inter-Medium';
const InterBold = 'Inter-ExtraBold';
const Poppins = 'Poppins-Regular';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100%',
    position:'relative',
  },
  empty: {
    position: 'relative',
    // marginRight: moderateScale(100, 0.1),
    // marginTop: moderateScale(150, 0.1),
    width: moderateScale(350, 0.1),
    height: moderateScale(47, 0.1),
    backgroundColor: 'rgba(194, 106, 248, 0.36)',
    borderTopRightRadius: moderateScale(25, 0.1),
    // marginBottom: moderateScale(15, 0.1),
  },

  bottomContainer: {
    paddingLeft: moderateScale(70, 0.1),
    // marginRight: moderateScale(100, 0.1),
    width: moderateScale(350, 0.1),
    height: moderateScale(500, 0.1),
    backgroundColor: 'rgba(194, 106, 248, 0.36)',
    borderTopRightRadius: moderateScale(25, 0.1),
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column',
    marginTop:moderateScale(20, 0.1)
    // paddingVertical: moderateScale(50, 0.1),
  },
  button: {
    marginTop: moderateScale(10, 0.1),
    alignItems: 'center',
    justifyContent: 'center',
    // marginRight: moderateScale(45, 0.1),
  },
  btnText: {
    fontFamily: Poppins,
    lineHeight: moderateScale(18, 0.1),
    fontSize: moderateScale(12, 0.1),
    color: '#C26AF8',
  },
  text: {
    color: '#fff',
  },
  heading: {
    width: moderateScale(200, 0.1),
    // marginTop: moderateScale(0, 0.1),
  },
  headingText: {
    fontSize: moderateScale(36, 0.1),
    fontFamily: InterBold,
  },
  headingText2: {
    fontSize: moderateScale(32, 0.1),
    fontFamily: InterBold,
  },
  para: {
    marginVertical: moderateScale(5, 0.1),
    width: moderateScale(200, 0.1),
  },
  paraText: {
    fontSize: moderateScale(13, 0.1),
    fontFamily: InterLight,
    fontWeight: '100',
  },
  subscription: {
    // width: '75%',
    marginTop: moderateScale(20, 0.1),
  },
  subscriptionText: {
    textAlign: 'center',
    fontFamily: InterLight,
    fontSize: moderateScale(18, 0.1),
  },
  price: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginBottom: moderateScale(10, 0.1),
    marginRight: moderateScale(20, 0.1),
  },
  priceText: {
    textAlign: 'center',
    fontFamily: InterLight,
    fontSize: moderateScale(18, 0.1),
    marginTop: moderateScale(15, 0.1),
  },
  splender:{
    position:'absolute',
    // backgroundColor:'#000',
    bottom:0,
    left:moderateScale(-30, 0.1)
  }
});

export default styles;
