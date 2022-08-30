import {
  PLAY_PAUSE,
  SET_PLAY_OBJECT,
  SET_SHUFFLE,
  SET_REPEAT,
} from './Constants';

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
