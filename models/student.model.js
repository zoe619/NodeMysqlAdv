const express = require('express');
var router = express.Router();
const mysql = require('mysql');

// create database
router.get('/', (req, res) => {
    let sql = 'CREATE DATABASE nodemysqladv';

    db.query(sql, err => {
        if (err) {
            throw err
        }
        res.send('database created')
        console.log('mysql database created')
    })
});

// // create table
// router.get('/createemployee', (req, res) => {
//     let sql = "CREATE TABLE employee(id int AUTO_INCREMENT, name VARCHAR(255), designation VARCHAR(255), primary key(id))";

//     db.query(sql, err => {
//         if (err) {
//             throw err
//         }
//         res.send('employee table created')
//     })
// })
module.exports = router