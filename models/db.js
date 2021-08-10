const mysql = require('mysql');
// create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysqladv'
});

// connect to db
db.connect(err => {
    if (err) {
        throw err
    }
    console.log('mysql connected');
})
require('./student.model')
module.exports = db;