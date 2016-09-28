'use strict';

const Promise = require('bluebird');
const mysql = require('mysql');


/*
* Get players from local db
* */
const getPlayers = (connection, log) => {
    return new Promise ((resolve,reject) => {
        connection.query('SELECT * FROM Players', (err, response) => {
            /* istanbul ignore if */
            if (err) {
                reject(err);
            } else {
                log.info('Got players');
                resolve(response);
            }
        });
    });
};

/*
 * Get teams from local db
 * */
const getTeams = (connection, log) => {
    return new Promise ((resolve,reject) => {
        connection.query('SELECT * FROM Teams', (err, response) => {
            /* istanbul ignore if */
            if (err) {
                reject(err);
            } else {
                log.info('Got teams');
                resolve(response);
            }
        });
    });
};

module.exports = {
    getTeams,
    getPlayers
};

