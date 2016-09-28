'use strict';

const chai = require('chai');
const assert = chai.assert;
const supertest = require('supertest');

const db = require('../../db/lib/db');
const dbConnection = require('../../db/lib/connection');
const server = require('../server/server');
const config = require('../../config');
const log = require('bunyan').createLogger(config.log);

describe('Server Tests', () => {
    let app, api;

    before((done) => {

        api = supertest(config.web.url);
        dbConnection.connect(config).then((connection) =>{
            db.getPlayers(connection, log).then((players) => {
                db.getTeams(connection, log).then((teams) => {
                    server.createServer(config,log,players, teams,(createdServer) => {
                        log.info('server successfully created');
                        app = createdServer;
                        done();
                    });
                });
            });
        });
    });

    it('Test response of default page', (done) => {
        api.get('/')
            .set('Accept', 'application/json')
            .expect(200,done);
    });
});