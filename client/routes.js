// server.js
// load the things we need
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const config = require('../config');


// use res.render to load up an ejs view file

router.get('/', (req, res) => {
    //res.render('pages/index');
    res.send('hello from chinook');
});

// index page 
router.get('/artists', function (req, res) {

    fetch(`http://localhost:${config.PORT}/api/artists`, {
        method: 'GET'
    })
        .then((res) => {
            // if (res.status === 400 || res.status === 404)
            return res.json();

        })
        .then((message) => {
            res.render('pages/artists/index', {
                rows: message
            });
            //res.render('pages/artists/index');
        })
        .catch(ex => {
            console.error(ex);

        });

});

// about page 
router.get('/about', function (req, res) {
    res.render('pages/about');
});

//app.listen(8000);
//console.log('8000 is the magic port');
module.exports = router;