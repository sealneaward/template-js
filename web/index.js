'use strict';

const config = require('../config.js');
const db = require('../db/lib/db');
const log = require('bunyan').createLogger(config.log);

const server = require('./server/server');
const dbConnection = require('../db/lib/connection');

dbConnection.connect(config).then((connection) =>{
   db.getPlayers(connection, log).then((players) => {
      db.getTeams(connection, log).then((teams) => {
         server.createServer(config,log, players, teams, () => {
            log.info('template started successfully');
         });
      });
   });
}).catch((err) => {
   log.info('Could not connect to db: ', err);
});
