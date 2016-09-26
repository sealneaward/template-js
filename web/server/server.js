'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const createServer = function(config, log, players, teams, next){
    const app = express();

    // server settings
    app.set('view engine', 'pug');
    app.set('views', path.join(__dirname, '../views'));
    app.use(express.static(__dirname +  'public'));
    app.use(bodyParser.urlencoded({ extended: true }));

    // load routes into server
    app.get('/', require('./routes/data')(log, players, teams));

    // listen on port
    app.listen(config.web.port);

    next(app);
};

module.exports = {
    createServer
};