const express = require('express');
const logger = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');

const app = express();

const rv = require('./routes/rv')


app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.set(`view engine`, `ejs`);
app.use(logger('dev'));






app.use(rv)






// '0.0.0.0'
const PORT = 4000;
const ADDRESS = "localhost"

app.listen(4000, '0.0.0.0', () => {
    console.log( `Port: ${PORT}, address: ${ADDRESS}`);
});


