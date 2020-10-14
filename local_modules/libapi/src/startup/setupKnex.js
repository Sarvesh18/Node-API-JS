'use strict';

let knex = null;

const initKnex = () => {

    return require('knex')({
        client: process.env.DB_CLIENT,
        connection: {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASS
        },
        pool: {
            min: 2,
            max: 10
        },
        debug: false,
        seeds: {
            directory: process.env.SEEDS_DIR
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: process.env.MIGRATIONS_DIR
        }
    });
}; 

const setupKnex = () => {

    if(!knex) {
        knex = initKnex();
    }
    return knex;
};

module.exports = setupKnex;