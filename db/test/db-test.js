'use strict';

const chai  = require('chai');
const mongoose = require('mongoose');
const config = require('../../config');
const connection = require('../lib/connection');
const db = require('../lib/db');

describe('Local db tests', () => {
    before('Establishes mongo connection', (done) => {
        connection.connect(config).then(() => {
            done();
        });
    });

    it('Gets player data from db', () => {
        return db.getPlayers();
    });

    it('Gets team data from db', () => {
        return db.getTeams();
    });

    after('Close mongo connection', () => {
        mongoose.connection.close();
    });
});