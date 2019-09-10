const express = requires = require('express');
const logger = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const app = express();
const rv = require('./routes/rv')




app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.set(`view engine`, `ejs`);
app.use(logger('dev'));


app.use(rv)



const PORT = 4000;
const ADDRESS = "localhost"

app.listen(PORT, ADDRESS, ()=>{
    console.log(`PORT: ${PORT}, ADDRESS: ${ADDRESS}`)
})