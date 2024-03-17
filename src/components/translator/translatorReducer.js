import { combineReducers } from 'redux';
import * as actions from './actions';

const textReducer = (state = '', action) => {
  switch (action.type) {
    case actions.SET_TEXT:
      return action.payload;
    default:
      return state;
  }
};

const translatedTextReducer = (state = '', action) => {
  switch (action.type) {
    case actions.SET_TRANSLATED_TEXT:
      return action.payload;
    default:
      return state;
  }
};

const audioFileReducer = (state = '', action) => {
  switch (action.type) {
    case actions.SET_AUDIO_FILE:
      return action.payload;
    default:
      return state;
  }
};

const selectedLanguageReducer = (state = 'en', action) => {
  switch (action.type) {
    case actions.SET_SELECTED_LANGUAGE:
      return action.payload;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  text: textReducer,
  translatedText: translatedTextReducer,
  selectedLanguage: selectedLanguageReducer,
  audioFile: audioFileReducer
});

export default rootReducer;