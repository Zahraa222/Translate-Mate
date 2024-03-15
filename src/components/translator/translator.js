import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setText, setSelectedLanguage, setTranslatedText } from './actions';
import '../../assets/index.css';
import axios from 'axios';

const Translator = () => {
  const text = useSelector(state => state.text);
  const translatedText = useSelector(state => state.translatedText);
  const selectedLanguage = useSelector(state => state.selectedLanguage);
  const dispatch = useDispatch();


  const handleTranslate = () => {
    axios.post(`https://translation.googleapis.com/language/translate/v2`, null, {
      params: {
        key: process.env.REACT_APP_TRANSLATION_API_KEY,
        q: text,
        target: selectedLanguage,
      }
    })
      .then((response) => {
        dispatch(setTranslatedText(response.data.data.translations[0].translatedText));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className='body' id='translator'>
      <h1 className='title' id='translator'>Welcome to Translate Mate!</h1>
      <h4 className='subtitle' id='translator'>Enter the text you want to translate</h4>
      <input id='translator' className='input' value={text} onChange={(e) => dispatch(setText(e.target.value))} placeholder='Enter text' />
      <h4 id='translator' className='subtitle'>Select the language you want to translate to</h4>
      <select id='translator' className='dropdown' value={selectedLanguage} onChange={(e) => dispatch(setSelectedLanguage(e.target.value))}>
        <option value='en'>English</option>
        <option value='es'>Spanish</option>
        <option value='fr'>French</option>
        <option value='de'>German</option>
      </select>
      <button id='translator' className='submitbtn' onClick={handleTranslate}>Translate</button>
      <h4 id='translator' className='subtitle'>Translated Text</h4>
      <p id='translator' className='output'>{translatedText}</p>
    </div>
  );
};

export default Translator;
