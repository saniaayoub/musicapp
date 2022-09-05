import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import {setUserToken} from '../Redux/actions';
import axiosconfig from '../Providers/axios';

class ApiCaller extends React.Component {
  constructor(props) {
    super(props);
  }
  static getToken = async (api, data) => {
    return await axiosconfig
      .post(api, data)
      .then(res => {
        const data = res?.data;
        return data;
      })
      .catch(err => {
        return err.message;
      });
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setToken: payload => {
      dispatch(setUserToken(payload));
    },
  };
}

export default ApiCaller;
