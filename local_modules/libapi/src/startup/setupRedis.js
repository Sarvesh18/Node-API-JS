'use strict';
const Redis = require('ioredis');

let redis = null;

const initRedis = () => {
    
    return new Redis({
        //port: '127.0.0.1',
        //host: '6379'
    });

};

const setupRedis = () => {
    
    if(!redis) {
        redis = initRedis();
    }
    return redis;
};

module.exports = setupRedis; 