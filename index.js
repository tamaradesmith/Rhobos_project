const express = require('express');
const http = require('http')
const logger = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const cors = require('cors');
const app = express();

const nodes = require('./routes/nodes')


app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors());
// app.set(`view engine`, `ejs`);
app.use(logger('dev'));






app.use(nodes)






// '0.0.0.0'
const PORT = 4000;
const ADDRESS = "localhost"

app.listen(PORT, '0.0.0.0', () => {
    console.log( `Port: ${PORT}, address: ${ADDRESS}`);
});


