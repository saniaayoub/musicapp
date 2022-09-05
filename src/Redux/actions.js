import {
  PLAY_PAUSE,
  SET_PLAY_OBJECT,
  SET_SHUFFLE,
  SET_REPEAT,
  SET_USER_TOKEN,
} from './Constants';

export const setUserToken = value => {
  return {
    type: SET_USER_TOKEN,
    payload: value,
  };
};

export const playPause = value => {
  return {
    type: PLAY_PAUSE,
    payload: value,
  };
};

export const setPlayObject = value => {
  return {
    type: SET_PLAY_OBJECT,
    payload: value,
  };
};

export const setShuffle = value => {
  return {
    type: SET_SHUFFLE,
    payload: value,
  };
};

export const setRepeat = value => {
  return {
    type: SET_REPEAT,
    payload: value,
  };
};
