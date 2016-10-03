'use strict';
const _ = require('lodash');

module.exports = function(log, players){
    return function(req,res){
        // filter for player id then send json with stats
        const player_id = parseInt(req.query.id);
        if(!player_id){
            res.json({message:'ID cannot be null'});
        } else {
            const player = _.find(players, (player) => {
                return player.PLAYER_ID == player_id;
            });

            if(!player){
                res.json({message:'Cannot find player.'});
            } else {
                res.json(player);
            }
        }
    };
};