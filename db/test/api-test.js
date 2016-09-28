'use strict';

const chaiAsPromised = require('chai-as-promised');
const chai  = require('chai');
const assert = chai.assert;
const _ = require('lodash');
const config = require('../../config');
const dbConnection = require('../lib/connection');
const api = require('../lib/api');
const log = require('bunyan').createLogger(config.log);

chai.use(chaiAsPromised);

describe('NBA Statistics API tests', () => {
    let connection;

    before('Establishes mysql connection and truncates data', (done) => {
        dbConnection.connect(config).then((sqlConnection) => {
            connection = sqlConnection;
            api.deleteData(log, connection).then(() => {
               done();
            });
        });
    });

    it('Gets data from api with valid url', () => {
        return api.getData(log, config, connection);
    });

    it('Gets data from api with invalid url', () => {
        const invalidConfig = _.cloneDeep(config);
        invalidConfig.urls = {
          players: "notvalid.com",
          teams: "notvalid.com"
        };

        return assert.isRejected(api.getData(log, invalidConfig, connection));
    });

    it('Inserts teams with invalid data', () => {
        return assert.isRejected(api.insertTeams(connection, []));
    });

    it('Inserts players with invalid data', () => {
        return assert.isRejected(api.insertPlayers(connection, []));
    });

    after('Close mysql connection', () => {
       connection.end();
    });
});