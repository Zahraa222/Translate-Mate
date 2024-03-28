import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setText, setSelectedLanguage, setTranslatedText, setAudioFile } from './actions';
import '../../assets/index.css';
import axios from 'axios';
const languagesData= require('../../assets/languageList.json') //I got this data by hitting the https://translation.googleapis.com/language/translate/v2/languages endpoint which returns this data to save on query costs

const Translator = () => {
  const text = useSelector(state => state.text);
  const translatedText = useSelector(state => state.translatedText);
  const audioFile = useSelector(state => state.audioFile);
  const selectedLanguage = useSelector(state => state.selectedLanguage);
  const dispatch = useDispatch();
  const [audioPlayerVisible, setAudioPlayerVisible] = useState(false);
  const [name, setName] = useState('');
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState([false]); 


  const handleTranslate = () => {
    axios.post(`https://translation.googleapis.com/language/translate/v2`, null, {
      params: {
        key: process.env.REACT_APP_TRANSLATION_API_KEY,
        q: text,
        target: selectedLanguage,
      }
    })
      .then((response) => {
        const translatedText = response.data.data.translations[0].translatedText; //created as a variable to add to database
        dispatch(setTranslatedText(translatedText));
        setAudioPlayerVisible(false); 

        //send to server
        return axios.post('/api/saveTranslation', {
          name,
          originalText: text,
          translatedText,
          pronunciation: 'N/A', //cannot add mp3 file to databse, can use cloud storage to save the file and attach its url here
          language: selectedLanguage,
        });
      })
      .then(response => {
        console.log('Saved Translation: ' + response.data);
      })
      .catch((err) => console.error(err));
  };

  const handleVoice = () => {
    const requestBody = {
      input: {
        text: translatedText
      },
      voice: {
        languageCode: 'en-US',
        ssmlGender: 'NEUTRAL'
      },
      audioConfig: {
        audioEncoding: 'MP3'
      }
    };
    
    axios.post(`https://texttospeech.googleapis.com/v1/text:synthesize`, requestBody, {
      params: {
        key: process.env.REACT_APP_TRANSLATION_API_KEY,
      }
    })
      .then((response) => {
        dispatch(setAudioFile(response.data.audioContent));
        setAudioPlayerVisible(true); 
      })
      .catch((err) => console.error(err));
  };

  const viewHistory = () => {
    axios.get(`/api/translations/${name}`)
    .then(response => {
      setHistory(response.data);
      setShowHistory(true);
    })
    .catch(error => {
      console.error('Error fetching History: ' + error);
    })
  }
  return (
    <div className='body' id='translator'>
      <h1 className='title' id='translator'>Welcome to Translate Mate!</h1>
      <h3 className='subtitle' id = 'translator'>Please Enter your name</h3>
      <input id = 'translator' className='input' value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter your name' />
      <h4 className='subtitle' id='translator'>Enter the text you want to translate</h4>
      <input id='translator' className='input' value={text} onChange={(e) => dispatch(setText(e.target.value))} placeholder='Enter text' />
      <h4 id='translator' className='subtitle'>Select the language you want to translate to</h4>
      <select id='translator' className='dropdown' value={selectedLanguage} onChange={(e) => dispatch(setSelectedLanguage(e.target.value))}>
      {languagesData.data.languages.map(lang => (
          <option key={lang.language} value={lang.language}>{lang.name}</option>
        ))}
      </select>
      <button id='translator' className='submitbtn' onClick={handleTranslate}>Translate</button>
      <h4 id='translator' className='subtitle'>Translated Text</h4>
      <p id='translator' className='output'>{translatedText}</p>
      <button id='translator' className='voice' onClick={handleVoice}><img className = 'listen' src="listenImage.png" alt = "Listen to Translated Text" /></button>
      {audioPlayerVisible && (
        <div>
          <p>
            <audio controls>
              <source src={`data:audio/mp3;base64,${audioFile}`} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
            <br />
          </p>
        </div>
      )}
      <button id = 'translator' className='submitbtn' onClick={viewHistory}>View your translation history</button>
      {showHistory && history.length > 0 && (
      <>
      <h3 id = 'translator' className='historytitle'>Translation History for {name}</h3>
      <table className='table'>
        <thead>
          <tr className = 'tr'>
            <th>  Name  </th>
            <th>Text</th>
            <th>Translated Text</th>
            <th>Language</th>
          </tr>
        </thead>
        <tbody className='tbody'>
          {history.map((item, index) => (
            <tr key = {index}>
              <td>{item.name}</td>
              <td>{item.word_to_be_translated}</td>
              <td>{item.translated_word}</td>
              <td>{item.language}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </>
      )}</div>
  );
};

export default Translator;
