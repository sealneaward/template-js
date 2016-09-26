'use strict';

const config = require('../config.js');
const api = require('./lib/api');
const connection = require('./lib/connection');
const log = require('bunyan').createLogger(config.log);

connection.connect(config).then((connection) =>{
    api.getData(log, config, connection).then(() => {
        log.info('Succesfully inserted data into mysql database');
        // close connection
        connection.release();
    });
}).catch((err) => {
    log.error('Error inserting data into collection: ', err);
});