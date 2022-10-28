import {
  PLAY_PAUSE,
  SET_PLAY_OBJECT,
  SET_SHUFFLE,
  SET_REPEAT,
  SET_USER_TOKEN,
  SET_FEATURED,
  SET_FAVORITE,
  SET_MUSIC,
} from './Constants';

const initialState = {
  userToken: null,
  play_pause: 'pause',
  play_object: {},
  shuffle: false,
  repeat: 'off',
  featured: [],
  favorite: [],
  music: [],
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_TOKEN:
      return {
        ...state,
        userToken: action.payload,
      };

    case SET_FEATURED:
      return {
        ...state,
        featured: action.payload,
      };

    case SET_FAVORITE:
      return {
        ...state,
        favorite: action.payload,
      };

    case SET_MUSIC:
      return {
        ...state,
        music: action.payload,
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
