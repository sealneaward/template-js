'use strict';

const mongoose = require('mongoose');

module.exports = function(log, players, teams){
    return function(req,res){
        res.render('player-selection.pug', {teams: teams, players: players});
    };
};