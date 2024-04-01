const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
const db = require('./sqlsetup');

app.use(cors());

app.use(express.static("public"))

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.use(express.json()); //for parsing JSON

app.post('/api/saveTranslation', (req, res) => {
    const {name, originalText, translatedText, language} = req.body;

    //adding to sql database
    const query = 'INSERT INTO translations (name, word_to_be_translated, translated_word, language) VALUES(?,?,?,?)';
    db.connection.query(query, [name, originalText, translatedText, language], (err,results) => {
        if (err){
            console.error('Cannot save translation. Error: ' + err);
            res.status(500).send('Error saving translation');
            return;
        }
        res.status(200).send('Translation saved in query');
    });
});

//endpoint to fetch requested history
app.get('/api/translations/:name', (req, res) => {
    const name = req.params.name;

    //selecting data from sql
    const query = 'SELECT * FROM translations WHERE name = ?';
    db.connection.query(query, [name], (err,results) => {
        if (err){
            console.error('Cannot fetch translation for name ' + name + ' Error: ' + err);
            res.status(500).send('Error fetching translation');
            return;
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
