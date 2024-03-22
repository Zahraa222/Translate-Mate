const express = require('express');
const app = express();
const port = 4000;
const db = require('./Scripts/sqlsetup');

app.get('/api/translations', (req, res) => {
    db.getTranslations((err, results) => {
        if (err) {
            console.error('Error fetching translations: ' + err);
            res.status(500).send('Error fetching translations');
            return;
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
