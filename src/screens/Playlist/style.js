import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
const InterMedium = 'Inter-Medium';
const InterRegular = 'Inter-Regular';

const InterBold = 'Inter-ExtraBold';
const Poppins = 'Poppins-Regular';

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    // alignItems: 'center',
    // flexDirection: 'column',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  empty: {
    position: 'relative',
    marginRight: moderateScale(100, 0.1),
    marginTop: moderateScale(150, 0.1),
    width: moderateScale(350, 0.1),
    height: moderateScale(47, 0.1),
    backgroundColor: 'rgba(194, 106, 248, 0.36)',
    borderTopRightRadius: moderateScale(25, 0.1),
    marginBottom: moderateScale(15, 0.1),
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
  bottomContainer: {
    marginRight: moderateScale(100, 0.1),
    width: moderateScale(350, 0.1),
    height: moderateScale(500, 0.1),
    backgroundColor: 'rgba(194, 106, 248, 0.36)',
    borderTopRightRadius: moderateScale(25, 0.1),
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
});

export default styles;
