'use strict';

const chaiAsPromised = require('chai-as-promised');
const chai  = require('chai');
const assert = chai.assert;
chai.use(chaiAsPromised);
const config = require('../../config');
const log = require('bunyan').createLogger(config.log);
const dbConnection = require('../lib/connection');
const db = require('../lib/db');

describe('Local db tests', () => {
    let connection;

    before('Establishes mysql connection', (done) => {
        dbConnection.connect(config).then((sqlConnection) => {
            connection = sqlConnection;
            done();
        });
    });

    it('Gets player data from db', () => {
        return db.getPlayers(connection, log);
    });

    it('Gets team data from db', () => {
        return db.getTeams(connection, log);
    });

    it('Gets player data from db with invalid connection', () => {
        const wrongConnection = {};
        return assert.isRejected(db.getPlayers(wrongConnection, log));
    });

    it('Gets team data from db with invalid connection', () => {
        const wrongConnection = {};
        return assert.isRejected(db.getTeams(wrongConnection, log));
    });

    after('Close mysql connection', () => {
        connection.end();
    });
});