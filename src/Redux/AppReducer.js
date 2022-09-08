import {
  PLAY_PAUSE,
  SET_PLAY_OBJECT,
  SET_SHUFFLE,
  SET_REPEAT,
  SET_USER_TOKEN,
  SET_FEATURED,
} from './Constants';

const initialState = {
  userToken: null,
  play_pause: 'pause',
  play_object: {},
  shuffle: false,
  repeat: 'off',
  featured: [],
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_TOKEN:
      console.log('setToken');
      return {
        ...state,
        userToken: action.payload,
      };

    case SET_FEATURED:
      console.log('setToken');
      return {
        ...state,
        featured: action.payload,
      };

    case PLAY_PAUSE:
      return {
        ...state,
        play_pause: action.payload,
      };

    case SET_PLAY_OBJECT:
      return {
        ...state,
        play_object: action.payload,
      };

    case SET_SHUFFLE:
      return {
        ...state,
        shuffle: action.payload,
      };

    case SET_REPEAT:
      return {
        ...state,
        repeat: action.payload,
      };
    default:
      return state;
  }
};

export default AppReducer;
