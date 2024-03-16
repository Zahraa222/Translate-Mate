import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../components/translator/translatorReducer';

export const store = configureStore({
  reducer: rootReducer
});
