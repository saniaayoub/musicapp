import {StyleSheet, Text, View, Modal, ActivityIndicator} from 'react-native';
import React from 'react';
import {Input, Button} from 'native-base';
import {moderateScale} from 'react-native-size-matters';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import Feather from 'react-native-vector-icons/Feather';

const InterRegular = 'Inter-Medium';
const InterBold = 'Inter-ExtraBold';
const Poppins = 'Poppins-Regular';

const SubsModal = ({loader, subModal, setSubModal, cancelSubs}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={subModal}
      onRequestClose={() => {
        setSubModal(!subModal);
      }}
    >
      <View style={s.centeredView}>
        <View style={s.modalView}>
          <Button
            size="sm"
            onPress={() => setSubModal(false)}
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
          <Text style={s.cancelHeading}>Cancel Subscription</Text>
          <Text style={s.verifyText}>
            Are you sure you want to cancel your subscription?
          </Text>

          <View
            style={{
              flexDirection: 'row',
              marginTop: moderateScale(30, 0.1),
            }}
          >
            <Button
              size="md"
              onPress={() => setSubModal(false)}
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
              onPress={cancelSubs}
              variant={'solid'}
              backgroundColor={'#C26AF8'}
              borderRadius={moderateScale(10, 0.1)}
              zIndex={1000}
              color={'#000'}
            >
              {loader ? <ActivityIndicator /> : `Yes`}
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SubsModal;

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
    marginBottom: moderateScale(20, 0.1),
    lineHeight: moderateScale(26, 0.1),
    fontFamily: InterBold,
  },
  verifyText: {
    color: '#000',
    fontSize: moderateScale(16, 0.1),
    // width: moderateScale(180, 0.1),
    lineHeight: moderateScale(20, 0.1),
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
