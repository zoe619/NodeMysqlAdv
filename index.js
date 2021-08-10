require('./models/db')

const express = require('express');
const path = require('path');
const handlebars = require('handlebars')
const exphbs = require('express-handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const bodyparser = require('body-parser');
const { json } = require('body-parser');

const studentsController = require('./controllers/studentController');

var app = express();
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/', (req, res) => {
    res.send(`
        <h2>Welcome to the students database advance!!</h2>
        <h3>Click here to get access to the <b><a href="/student/list">Database</a></b></h3>`)
})


app.set('views', path.join(__dirname, '/views/'))

app.engine(
    'hbs',
    exphbs({
        handlebars: allowInsecurePrototypeAccess(handlebars),
        extname: 'hbs',
        defaultLayout: 'mainLayouts',
        layoutsDir: __dirname + '/views/layouts/'
    })
)

app.set("view engine", "hbs")

app.listen(3000, () => {
    console.log('server started on port 3000');
})

app.use('/student', studentsController)