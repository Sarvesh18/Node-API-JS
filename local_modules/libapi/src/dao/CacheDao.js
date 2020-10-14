'use strict';

const { redis } = require('../startup');

/**
 * @class
 */
class CacheDao {
    
    constructor(name) {
        this.name = name;
    }

    set(key, val) {
        key = this.name + key;
        return redis().set(key, val, 'EX', '360')
    }
    
    get(key) {
        key = this.name + key;
        return redis.get(key);
    }
    
    del() {
        key = this.name + key;
        return redis.del(key);
    }
}

module.exports = CacheDao