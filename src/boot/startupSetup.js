'use strict';

const { dir, knex, redis, logger } = require('../../local_modules/libapi').startup;

const configureStartup = async () => {

    //Setup Dir
    dir('./tmp/');

    //Connect DB
    await knex();

    //Connect Redis
    //await redis();

    //await setupSource();

    //await setupConsumer();

};

module.exports = configureStartup;