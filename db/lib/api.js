'use strict';

const request = require('request');
const Promise = require('bluebird');
const mysql = require('mysql');

const deleteData = (log, connection) => {
    return new Promise ((resolve, reject) => {
        connection.query('DROP TABLE IF EXISTS Player,Team ', (err, response) => {
            if (err) {
                reject(err);
            } else {
                log.info('Dropped tables');
                resolve(response);
            }
        });
    });
};

/*
* Get data from stats.nba.com
* */
const getData = (log, config, connection) => {
    return new Promise ((resolve,reject) => {
        // delete db on each population to avoid overlap
        deleteData(log, connection).then(
            getTeams(log,config.urls.teams, connection)
        ).then(
            getPlayers(log,config.urls.players, connection)
        ).then(() => {
            resolve();
        }).catch((err) => {
            log.info('Could not insert team data successfully: ', err);
            reject(err);
        });
    });
};

/*
* Get team data from api and organize headers into team object
* */
const getTeams = (log, url, connection) => {
    return new Promise ((resolve,reject) => {
        let data;

        request(url,(err,response) => {
            if (err) {
                log.info('Could not get data', err);
                reject(err);
                return;
            } else {
                log.info('Got data');
                response = JSON.parse(response.body).resultSets[0];
                const headers = response.headers;
                data = response.rowSet;

                //set headers as keys
                data = data.map((playerData) => {
                    const playerObj = {};
                    headers.forEach((header, index) => {
                        if(header === "TEAM_ID" || header === "TEAM_NAME")
                        {
                            playerObj[header] = playerData[index];
                        }
                    });
                    return playerObj;
                });
                insertTeams(connection, data).then((err) => {
                    /* istanbul ignore if */
                    if(err){
                        log.info('Could not save teams: ', err);
                        reject(err);
                    } else {
                        log.info('Successfully saved teams');
                        resolve();
                    }
                });
            }
        });
    });
};

/*
* Get player data from api then organize headers to form player object
* */
const getPlayers = (log, url, connection) => {
    return new Promise ((resolve,reject) => {
        let data;

        request(url,(err,response) => {
            if (err) {
                log.info('Could not get data', err);
                reject(err);
                return;
            } else {
                log.info('Got data');
                response = JSON.parse(response.body).resultSets[0];
                data = response.rowSet;
                const headers = response.headers;

                insertPlayers(connection, data).then((err) => {
                    /* istanbul ignore if */
                    if(err){
                        log.info('Could not save players: ', err);
                        reject(err);
                    } else {
                        log.info('Successfully saved players');
                        resolve();
                    }
                });
            }
        });
    });
};

/*
* insert/update into db
* */
const insertPlayers = (connection, data) => {
    return new Promise ((resolve,reject) => {
        const query = 'INSERT INTO Players (' +
            'PLAYER_ID,' +
            'PLAYER_NAME,' +
            'TEAM_ID,' +
            'TEAM_ABBREVIATION,' +
            'GP,' +
            'W,' +
            'L,' +
            'MIN,' +
            'STL,' +
            'BLK,' +
            'DREB,' +
            'DEF_RIM_FGM,' +
            'DEF_RIM_FGA,' +
            'DEF_RIM_FG_PCT' +
            ') VALUES ?';

        connection.query(query, data, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });

    });
};

/*
 *  insert/update into db
 * */
const insertTeams = (data) => {
    return new Promise ((resolve,reject) => {
        const query = 'INSERT INTO Teams (' +
            'TEAM_ID,' +
            'TEAM_NAME' +
            ') VALUES ?';

        connection.query(query, data, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

module.exports = {
    deleteData,
    getData,
    getTeams,
    getPlayers
};