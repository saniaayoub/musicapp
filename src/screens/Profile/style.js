import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
const InterMedium = 'Inter-Medium';
const InterRegular = 'Inter-Regular';

const InterBold = 'Inter-ExtraBold';
const Poppins = 'Poppins-Regular';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },

  backbutton: {
    position: 'absolute',
    left: 15,
    top: 15,
  },
  header: {
    zIndex: 100,
    height: moderateScale(243, 0.1),
    borderBottomLeftRadius: moderateScale(30, 0.1),
    borderBottomRightRadius: moderateScale(30, 0.1),
    backgroundColor: 'red',
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
  profileSection: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScale(5, 0.1),
    // backgroundColor: 'red',
  },
  profileimg: {
    borderRadius: moderateScale(10, 0.1),
    overflow: 'hidden',
    // backgroundColor: 'red',
    width: moderateScale(96, 0.1),
    height: moderateScale(84, 0.1),
    justifyContent: 'center',
    alignItems: 'center',
  },
  edit: {
    // position: 'absolute',
    bottom: moderateScale(20, 0.1),
    left: moderateScale(40, 0.1),
    justifyContent: 'center',
    alignItems: 'center',
    // marginLeft: moderateScale(60, 0.1),
    // right: moderateScale(-9, 0.1),
    backgroundColor: '#000',
    padding: moderateScale(5, 0.1),
    borderRadius: moderateScale(50, 0.1),
  },
  round: {
    borderWidth: moderateScale(1, 0.1),
    borderColor: '#fff',
    borderRadius: moderateScale(50, 0.1),
    padding: moderateScale(5, 0.1),
  },
  iconCircle: {
    borderRadius: moderateScale(25, 0.1),
    borderWidth: moderateScale(1, 0.1),
    borderColor: '#C8C4C4',
    padding: moderateScale(5, 0.1),
    marginRight: moderateScale(10, 0.1),
    marginBottom: moderateScale(5, 0.1),
  },
  input: {
    marginVertical: moderateScale(15, 0.1),
  },
  radioInput: {
    width: '100%',
    marginTop: moderateScale(10, 0.1),
    marginLeft: moderateScale(60, 0.1),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  inputSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: moderateScale(10, 0.1),
  },
  icon: {
    marginRight: moderateScale(10, 0.1),
  },
  radio: {
    marginHorizontal: moderateScale(15, 0.1),
  },
  text: {
    color: '#000',
    fontFamily: InterMedium,
    fontSize: moderateScale(12, 0.1),
  },
  button: {
    marginTop: moderateScale(45, 0.1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontFamily: Poppins,
    lineHeight: moderateScale(18, 0.1),
    fontSize: moderateScale(12, 0.1),
    color: '#fff',
  },
  profileName: {
    color: '#fff',
    fontFamily: InterBold,
    fontSize: moderateScale(14, 0.1),
    lineHeight: moderateScale(17, 0.1),
  },
});

export default styles;
