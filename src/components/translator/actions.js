// Action types
export const SET_TEXT = 'SET_TEXT';
export const SET_TRANSLATED_TEXT = 'SET_TRANSLATED_TEXT';
export const SET_SELECTED_LANGUAGE = 'SET_SELECTED_LANGUAGE';
export const SET_AUDIO_FILE = 'SET_AUDIO_FILE';
// Action creators
export const setText = (text) => ({
  type: SET_TEXT,
  payload: text,
});

export const setTranslatedText = (translatedText) => ({
  type: SET_TRANSLATED_TEXT,
  payload: translatedText,
});

export const setAudioFile = (audioFile) => ({
  type: SET_AUDIO_FILE,
  payload: audioFile,
});

export const setSelectedLanguage = (language) => ({
  type: SET_SELECTED_LANGUAGE,
  payload: language,
});
