import React, {useState} from 'react'
import './Translator.css'
import axios from 'axios';


const Translator = () => {
  const [text, setText] = useState('')
  const [translatedText, setTranslatedText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en'); // ['en', 'es', 'fr', 'de'


  const handleTranslate = () => {
    // call the translation API
    const fetchTranslation = async () => {
    axios.post(`https://translation.googleapis.com/language/translate/v2`,null, { params: {
      key: process.env.REACT_APP_TRANSLATION_API_KEY,
      q: text,
      target: selectedLanguage,
    }})

    .then((response) => {
      setTranslatedText(response.data.data.translations[0].translatedText);
    })
    .catch((err) => console.error(err));
  }
    fetchTranslation();
  }

  return (
    <div className='body'>
      <h1 className='title'>Welcome to Translate Mate!</h1>
        <h4 className='subtitle'>Enter the text you want to translate</h4>
      <input className= 'input' value={text} onChange={(e) => setText(e.target.value)} placeholder='Enter text'/>
      <h4 className='subtitle'>Select the language you want to translate to</h4>
        <select className='dropdown' value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
            <option value='en'>English</option>
            <option value='es'>Spanish</option>
            <option value='fr'>French</option>
            <option value='de'>German</option> </select>
      <button className='submitbtn' onClick={handleTranslate}>Translate</button>
      <h4 className='subtitle'>Translated Text</h4>
      <p className='output'>{translatedText}</p>
    </div>
  )
}


export default Translator