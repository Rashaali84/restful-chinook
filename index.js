'use strict';

const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const config = require('./config');
const api = require('./api');
const client = require('./client');
const app = express();
//const port = process.env.PORT || config.PORT;
app.set('view engine', 'ejs');

app.use(cors());
app.use(bodyParser.json());

// log to file
/*app.use(morgan('combined', {
  stream: fs.createWriteStream(
    path.join(__dirname, 'access.log'),
    { flags: 'a' }
  )
}));*/

// log to console
app.use(morgan('dev'));
//app.use('/', express.static(path.join(__dirname, 'client')));
app.use('/', (req, res, next) => {
  res.send({ hi: 'there' })
});
//app.use('/chinook', client);
//app.use('/api', api);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).end();
});

app.listen(config.PORT, () => {
  console.log(
    `listening at http://localhost:${config.PORT} (${config.MODE} mode)`
  );
});
