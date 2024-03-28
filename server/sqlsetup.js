require('dotenv').config({ path: '.env.local' });
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.REACT_APP_DB_HOST, 
    user: process.env.REACT_APP_DB_USER,
    database: process.env.REACT_APP_DB_NAME,
    password: process.env.REACT_APP_DB_PASS,
    port: process.env.REACT_APP_DB_PORT
});

const getTranslations = (callback) => {
    connection.query('SELECT * FROM translations', (err, results) => {
        callback(err, results);
    });
};

module.exports = {getTranslations, connection};