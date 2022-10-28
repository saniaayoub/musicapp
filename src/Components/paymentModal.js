import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import {WebView} from 'react-native-webview';
import React, {useState, useEffect} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {moderateScale} from 'react-native-size-matters';

const PaymentModal = ({
  showGateway,
  setShowGateway,
  handleMessage,
  uri,
  checkPayment,
}) => {
  const [prog, setProg] = useState(false);
  const [progClr, setProgClr] = useState('#000');

  return (
    <Modal
      visible={showGateway}
      onDismiss={() => {
        setShowGateway(false);
      }}
      onRequestClose={() => {
        checkPayment();
      }}
      animationType={'fade'}
      transparent
    >
      <View style={s.webViewCon}>
        <View style={s.wbHead}>
          <TouchableOpacity
            style={{padding: 13}}
            onPress={() => {
              checkPayment();
            }}
          >
            <Text style={{color: '#000', fontSize: moderateScale(14, 0.1)}}>
              Sign Up
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              flex: 1,
              textAlign: 'center',
              fontSize: 16,
              fontWeight: 'bold',
              color: '#00457C',
            }}
          >
            Payment GateWay
          </Text>
          <View style={{padding: 13, opacity: prog ? 1 : 0}}>
            <ActivityIndicator size={24} color={progClr} />
          </View>
        </View>
        <WebView
          source={{uri: uri}}
          style={{flex: 1}}
          onLoadStart={() => {
            setProg(true);
            setProgClr('#000');
          }}
          onLoadProgress={() => {
            setProg(true);
            setProgClr('#00457C');
          }}
          onLoadEnd={() => {
            setProg(false);
          }}
          onLoad={() => {
            setProg(false);
          }}
          onNavigationStateChange={event => handleMessage(event)}
        />
      </View>
    </Modal>
  );
};

export default PaymentModal;

const s = StyleSheet.create({
  webViewCon: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  wbHead: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    zIndex: 25,
    elevation: 2,
  },
});
