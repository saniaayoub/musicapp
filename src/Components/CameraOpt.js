import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  StyleSheet,
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {moderateScale} from 'react-native-size-matters';
const InterMedium = 'Inter-Medium';
const InterRegular = 'Inter-Regular';
const InterBold = 'Inter-ExtraBold';
const Poppins = 'Poppins-Regular';

const CameraOpt = ({convertImage, refRBSheet}) => {
  const requestExternalReadPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'External Storage Read Permission',
            message: 'App needs read permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Read permission err', err);
      }
      return false;
    } else return true;
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };
  const openCamer = async c => {
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    let isStorageReadPermitted = await requestExternalReadPermission();

    if (c == 'g') {
      setTimeout(() => {
        console.log('hello camera');
        launchImageLibrary({
          width: 300,
          height: 400,
          cropping: true,
          freeStyleCropEnabled: true,
          saveToPhotos: true,
        })
          .then(image => {
            if (image.assets) {
              console.log(image.assets[0].uri);
              convertImage(image.assets[0].uri);
              refRBSheet.current.close();
            }
          })
          .catch(error => {});
      }, 1000);
    } else if (c == 'c') {
      setTimeout(() => {
        if (isCameraPermitted && isStoragePermitted && isStorageReadPermitted) {
          launchCamera({
            cropping: true,
            freeStyleCropEnabled: true,
            saveToPhotos: true,
          })
            .then(image => {
              if (image.assets) {
                console.log(image?.assets[0]?.uri);
                convertImage(image?.assets[0]?.uri);
                // setImage(image?.assets[0]?.uri);

                refRBSheet.current.close();
              }
            })
            .catch(error => {});
        }
      }, 1000);
    }
  };
  const CamerOpt = () => {
    return (
      <View style={s.camerOpt}>
        <View style={s.camerbtn}>
          <TouchableOpacity
            style={s.cameraBtnContainer}
            onPress={() => openCamer('c')}
          >
            <FontAwesome5 name={'camera'} size={20} color={'#C26AF8'} solid />
            <Text style={s.cameraBtnText}>Camera</Text>
          </TouchableOpacity>
        </View>
        <View style={s.camerbtn}>
          <TouchableOpacity
            style={s.cameraBtnContainer}
            onPress={() => openCamer('g')}
          >
            <FontAwesome5 name={'image'} size={20} color={'#C26AF8'} solid />
            <Text style={s.cameraBtnText}>Gallery</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return <CamerOpt />;
};

export default CameraOpt;

const s = StyleSheet.create({
  camerOpt: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: moderateScale(20, 0.1),
  },
  camerbtn: {
    marginVertical: moderateScale(10, 0.1),
  },
  cameraBtnContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraBtnText: {
    color: '#000',
    fontFamily: InterBold,
    marginLeft: 10,
    // fontWeight: 'bold',
  },
});
