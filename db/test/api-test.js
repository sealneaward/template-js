'use strict';

const chaiAsPromised = require('chai-as-promised');
const chai  = require('chai');
const assert = chai.assert;
const mongoose = require('mongoose');
const _ = require('lodash');
const config = require('../../config');
const connection = require('../lib/connection');
const api = require('../lib/api');
const log = require('bunyan').createLogger(config.log);

chai.use(chaiAsPromised);

describe('NBA Statistics API tests', () => {
    before('Establishes mongo connection', (done) => {
        connection.connect(config).then(() => {
            done();
        });
    });

    it('Gets data from api with valid url', () => {
        return api.getData(log, config);
    });

    it('Gets data from api with invalid urls 1/2', (done) => {
        const invalidConfig = _.cloneDeep(config);
        invalidConfig.urls.players = 'notvalid.com';

        assert.isRejected(api.getData(log, invalidConfig)).then(() => {
            done();
        });
    });

    it('Gets data from api with invalid urls 1/2', (done) => {
        const invalidConfig = _.cloneDeep(config);
        invalidConfig.urls.teams = 'notvalid.com';

        assert.isRejected(api.getData(log, invalidConfig)).then(() => {
            done();
        });
    });

    it('Gets player data from api with invalid url', (done) => {
        const invalidConfig = _.cloneDeep(config);
        invalidConfig.urls = {
          players: "notvalid.com",
          teams: "notvalid.com"
        };

        assert.isRejected(api.getPlayers(log, invalidConfig.urls.players)).then(() => {
            done();
        });
    });

    it('Gets team data from api with invalid url', (done) => {
        const invalidConfig = _.cloneDeep(config);
        invalidConfig.urls = {
            players: "notvalid.com",
            teams: "notvalid.com"
        };

        assert.isRejected(api.getTeams(log, invalidConfig.urls.teams)).then(() => {
            done();
        });
    });

    after('Close mongo connection', () => {
       mongoose.connection.close();
    });
});