import {
  StyleSheet,
  Text,
  View,
  Modal,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Input, Button} from 'native-base';
import {moderateScale} from 'react-native-size-matters';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import Feather from 'react-native-vector-icons/Feather';

const InterRegular = 'Inter-Medium';
const InterBold = 'Inter-ExtraBold';
const Poppins = 'Poppins-Regular';

const AccDeleteModal = ({
  loader,
  delModal,
  setDelModal,
  deleteAccount,
  password,
  setPassword,
  showPass,
  setShowPass,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={delModal}
      onRequestClose={() => {
        setDelModal(!delModal);
      }}
    >
      <View style={s.centeredView}>
        <View style={s.modalView}>
          <Button
            size="sm"
            onPress={() => setDelModal(false)}
            variant={'link'}
            style={s.close}
            backgroundColor={'#fff'}
            borderRadius={moderateScale(14, 0.1)}
            padding={moderateScale(7, 0.1)}
            zIndex={1000}
            position="absolute"
            right={moderateScale(15, 0.1)}
            top={moderateScale(10, 0.1)}
          >
            <Feather name="x" size={moderateScale(22, 0.1)} color={'grey'} />
          </Button>
          <Text style={s.cancelHeading}>Delete Account</Text>
          <Text style={s.verifyText}>Please enter password to confirm</Text>
          <View>
            <Input
              w={{
                base: '80%',
                md: '25%',
              }}
              variant="underlined"
              marginTop={moderateScale(15, 0.1)}
              paddingLeft={moderateScale(15, 0.1)}
              borderWidth={1}
              placeholder="Password"
              placeholderTextColor={'grey'}
              value={password}
              onChangeText={password => {
                setPassword(password);
              }}
              borderRadius={moderateScale(10, 0.1)}
              InputRightElement={
                password ? (
                  <View style={s.eye}>
                    <TouchableOpacity
                      style={{marginRight: moderateScale(10, 0.1)}}
                      onPress={() => setShowPass(!showPass)}
                    >
                      <Feather
                        name={showPass ? 'eye' : 'eye-off'}
                        color="#000"
                        size={20}
                      />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <></>
                )
              }
              //   errorMessage={passwordError}
              color={'#000'}
              fontSize={moderateScale(14, 0.1)}
              secureTextEntry={showPass}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: moderateScale(20, 0.1),
            }}
          >
            <Button
              size="md"
              onPress={() => setDelModal(false)}
              variant={'link'}
              borderRadius={moderateScale(10, 0.1)}
              zIndex={1000}
              color={'#000'}
            >
              <Text
                style={{
                  color: '#000',

                  fontSize: moderateScale(14, 0.1),
                  marginRight: moderateScale(10, 0.1),
                }}
              >
                {' '}
                Cancel
              </Text>
            </Button>
            <Button
              size="md"
              w={moderateScale(90, 0.1)}
              onPress={deleteAccount}
              variant={'solid'}
              backgroundColor={'#C26AF8'}
              borderRadius={moderateScale(10, 0.1)}
              zIndex={1000}
              color={'#000'}
            >
              {loader ? <ActivityIndicator /> : `Confirm`}
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AccDeleteModal;

const s = StyleSheet.create({
  heading: {
    marginTop: moderateScale(-90, 0.1),
    marginBottom: moderateScale(60, 0.1),
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
  borderStyleBase: {
    width: moderateScale(30, 0.1),
    height: moderateScale(45, 0.1),
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },
  underlineStyleBase: {
    marginHorizontal: moderateScale(15, 0.1),
    width: moderateScale(40, 0.1),
    height: moderateScale(40, 0.1),
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: '#000',
    color: '#000',
  },

  underlineStyleHighLighted: {
    borderColor: '#C26AF8',
  },
  submit: {
    color: '#fff',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScale(22, 0.1),
  },
  modalView: {
    margin: moderateScale(20, 0.1),
    backgroundColor: 'white',
    borderRadius: moderateScale(20, 0.1),
    padding: moderateScale(35, 0.1),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    marginTop: moderateScale(15, 0.1),
    alignItems: 'center',
    justifyContent: 'center',
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: moderateScale(15, 0.1),
    textAlign: 'center',
  },
  cancelHeading: {
    color: '#000',
    fontSize: moderateScale(22, 0.1),
    marginTop: moderateScale(10, 0.1),
    marginBottom: moderateScale(30, 0.1),
    lineHeight: moderateScale(26, 0.1),
    fontFamily: InterBold,
  },
  verifyText: {
    color: '#000',
    fontSize: moderateScale(14, 0.1),
    // width: moderateScale(180, 0.1),
    lineHeight: moderateScale(15, 0.1),
    textAlign: 'center',
    fontFamily: InterRegular,
  },
  otpView: {
    height: moderateScale(130, 0.1),
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomLink: {
    position: 'absolute',
    bottom:
      Platform.OS == 'ios' ? moderateScale(120, 0.1) : moderateScale(40, 0.1),
  },
});
