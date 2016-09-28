'use strict';

const chaiAsPromised = require('chai-as-promised');
const chai  = require('chai');
const _ = require('lodash');
const assert = chai.assert;
chai.use(chaiAsPromised);
const config = require('../../config');
const dbConnection = require('../lib/connection');

describe('Local mysql connection test', () => {
    it('successfully connects to local db', () => {
        return dbConnection.connect(config);
    });

    it('connects to local db with invalid credentials', () => {
        const wrongConfig = _.cloneDeep(config);
        wrongConfig.mysql.host = 'notvalid';
        return assert.isRejected(dbConnection.connect(wrongConfig));
    });
});