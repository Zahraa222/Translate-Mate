import React, {useState} from 'react'
import './Translator.css'


const Translator = () => {
  const [text, setText] = useState('')
  const [translatedText, setTranslatedText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en'); // ['en', 'es', 'fr', 'de'


  const handleTranslate = () => {
    // call the translation API
    const fetchTranslation = async () => {
        const response = await fetch('https://translation.googleapis.com/language/translate/v2',
        { method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                q: text,
                target: selectedLanguage,
                //sample api, change when cloud is set up
                //key: 'AIzaSyCf0Xy0OnhxlduyEt3K8zP-sOuu-l_u6uA1',
            }),
            });

    // set the translated text
    const result = await response.json();
    setTranslatedText(result.data.translations[0].translatedText);
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