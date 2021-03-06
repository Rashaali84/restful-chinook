'use strict';

const fs = require('fs');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const config = require('./config');
const api = require('./api');
const port = process.env.PORT || 3000
const app = express();

app.use(cors());
app.use(bodyParser.json());

// log to file
app.use(morgan('combined', {
  stream: fs.createWriteStream(
    path.join(__dirname, 'access.log'),
    { flags: 'a' }
  )
}));
// log to console
if (config.MODE === 'development') {
  app.use(morgan('dev'));
};

app.use('/', express.static(path.join(__dirname, 'client')));

app.use('/api', api);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).end();
});

app.listen(port, () => {
  console.log(
    `listening at http://localhost:${port}${process.env.DB_PATH} (${config.MODE} mode)`
  );
});
