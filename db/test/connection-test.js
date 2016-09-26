'use strict';

const chaiAsPromised = require('chai-as-promised');
const chai  = require('chai');
const mongoose = require('mongoose');
const _ = require('lodash');
const assert = chai.assert;
chai.use(chaiAsPromised);

const config = require('../../config');
const connection = require('../lib/connection');

describe('Local mongodb connection test', () => {
    it('successfully connects to local db', () => {
        return connection.connect(config);
    });

    it('connects to local db with invalid credentials', (done) => {
        const wrongConfig = _.cloneDeep(config);
        wrongConfig.mongo.uri = 'notvalid';
        assert.isRejected(connection.connect(config)).then(() => {
            done();
        });
    });

    after('close connection', () => {
       mongoose.connection.close();
    });
});