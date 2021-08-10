const express = require('express');
var router = express.Router();
var db = require('../models/db')

router.get('/', (req, res) => {
    res.render('student/addOrEdit', {
        viewTitle: 'Insert Student Adv'
    })
})

router.post('/', (req, res) => {
    if (req.body._id == '') {
        insertRecord(req, res);
    } else {
        updateRecord(req, res)
    }
})

function insertRecord(req, res) {

    let post = {
        'fullName': req.body.fullName,
        'email': req.body.email,
        'mobile': req.body.mobile,
        'city': req.body.city
    }
    let sql = 'INSERT INTO students set ?';
    db.query(sql, post, err => {
        if (!err) {
            res.redirect('/student/list')
        } else {
            console.log('error inserting ' + err)
        }
    })
}

function updateRecord(req, res) {
    let newName = req.body.fullName;
    let email = req.body.email;
    let mobile = req.body.mobile;
    let city = req.body.city;
    let sql = `UPDATE students SET fullName = '${newName}', email = '${email}', mobile = '${mobile}', 
    city = '${city}' where id = '${req.body._id}' `;

    let query = db.query(sql, err => {
        if (!err) {
            res.redirect('student/list')
        } else {
            console.log('error updating ' + err)
        }
    })

}

// get all students
router.get('/list', (req, res) => {
    let sql = 'SELECT * FROM students';

    let query = db.query(sql, (err, results) => {
        if (!err) {
            res.render('student/list', {
                list: results
            })
        } else {
            console.log('error in retrieval ' + err)
        }
    })
})

// get by id
router.get('/:id', (req, res) => {
    let sql = `SELECT * FROM students where id = '${req.params.id}' `;
    let query = db.query(sql, (err, results) => {
        if (!err) {
            res.render('student/addOrEdit', {
                viewTitle: 'Update Student Adv',
                fullName: results[0].fullName,
                email: results[0].email,
                mobile: results[0].mobile,
                city: results[0].city,
                id: results[0].id
            })

            console.log(results[0].fullName);
        } else {
            console.log('error getting by id ' + err)
        }
    })
})

// delete record
router.get('/delete/:id', (req, res) => {

    let sql = `DELETE FROM students where id = ${req.params.id}`;
    db.query(sql, err => {
        if (!err) {
            res.render('student/list')
        } else {
            console.log('Error in deleting ' + err)
        }
    })

})


module.exports = router