module.exports = {
    dir: require('./setupDir'),
    knex: require('./setupKnex'),
    redis: require('./setupRedis'),
    mongo: require('./setupMongo'),
    logger: require('./setupWinston'),
};