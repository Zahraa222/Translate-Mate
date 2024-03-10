import React, {useState} from 'react'
import './Translator.css'


const Translator = () => {
  const [text, setText] = useState('')
  const [translatedText, setTranslatedText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en'); // ['en', 'es', 'fr', 'de'


  const handleTranslate = () => {
    // call the translation API
    // set the translated text
    const test = text + 'in ' + selectedLanguage;
    setTranslatedText(test);
  }

  return (
    <div className='body'>
      <h1 className='title'>Welcome to Translate Mate! Enter your desired text</h1>
      <input className= 'input' value={text} onChange={(e) => setText(e.target.value)} />
      <h4 className='subtitle'>Select the language you want to translate to</h4>
        <select className='dropdown' value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
            <option value='en'>English</option>
            <option value='es'>Spanish</option>
            <option value='fr'>French</option>
            <option value='de'>German</option> </select>
      <button className='submitbtn' onClick={handleTranslate}>Translate</button>
      <p className='output'>{translatedText}</p>
    </div>
  )
}


export default Translator