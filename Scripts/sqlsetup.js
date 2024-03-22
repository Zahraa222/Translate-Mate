const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '127.0.0.1', //ip address might vary based on what's provided when creating a proxy
    user: 'root',
    database: 'TranslationHistory',
    password: 'ECE428',
    port: 3306
});

const getTranslations = (callback) => {
    connection.query('SELECT * FROM translations', (err, results) => {
        callback(err, results);
    });
};

module.exports = {getTranslations, connection};