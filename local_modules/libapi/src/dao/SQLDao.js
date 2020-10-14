'use strict';

const _ = require('lodash');
const { knex } = require('../startup');

//ER_BAD_FIELD_ERROR - 1054
//ER_BAD_NULL_ERROR - 1048
//ER_NO_DEFAULT_FOR_FIELD - 1364
//ER_DUP_ENTRY - 1062

/**
 * @class
 */
class SQLDao {

    constructor(name) {
        this.name = name;
    }

    save(value, select) {
        return knex().table(this.name).insert(value).returning(select);
    }
    
    find(select, condition) {
        return knex().table(this.name).select(select).where(condition);
    }

    update(condition, update) {
        return knex().table(this.name).where(condition).update(update);
    }

    remove(condition) {
        return knex().table(this.name).where(condition).del();
    }



    
    //updateIn(table, key, val, update) {
        //return knex(table).whereIn(key, val).update(update);
    //}

    //removeIn(table, key, val) {
        //return knex(table).whereIn(key, val).del();
    //}

    upsert(table, insert, update) {
        //return knex.raw(`${knex(table).insert(insert).toQuery()} ON DUPLICATE KEY UPDATE ${update}`);
    }

    aggregate(query) {
        //return knex.raw(query);
    }

    distinct(table, condition) {
        //return knex(table).distinct(condition);
    }

    count(table, select, condition) {
        condition = condition || {};
        //return knex(table).count(select).where(condition);
    }

    paginate(table, select, condition, skip, limit, sort) {
        const SKIP = 0;
        const LIMIT = 10;
        select = _.isArray(select) ? select : '*';
        condition = _.isPlainObject(condition) ? condition : {};
        skip = _.isFinite(skip) ? Math.max(0, skip) : SKIP;//skip * limit
        limit = _.isFinite(limit) ? limit : LIMIT;
        sort = _.isPlainObject(sort) ? sort : null;//'ASC'

        //return knex(table).select(select).where(condition).offset(skip).limit(limit).orderBy(sort.by, sort.order);
    }
}

module.exports = SQLDao;