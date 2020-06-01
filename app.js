'use strict';
const http = require('http');
const port = process.env.PORT || 3000



//const fs = require('fs');
const path = require('path');
const express = require('express');
//const bodyParser = require('body-parser');
//const morgan = require('morgan');
//const cors = require('cors');
//const config = require('./config');
const api = require(path.join(__dirname, 'api'));
const client = require(path.join(__dirname, 'client'));
const app = express();
//app.set('view engine', 'ejs');
//app.use(cors());
//app.use(bodyParser.json());

app.use('/', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Hello World</h1>');
});
/*const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Hello World</h1>');
});*/
app.use('/chinook', client);
app.use('/api', api);

app.listen(port, () => {
    console.log(`Server running at port ` + port);
});

/*server.listen(port, () => {
    console.log(`Server running at port ` + port);
});*/