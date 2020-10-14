'use strict';
const { constant } = require('../../../../constant');
const { CrudDao } = require('../../../../local_modules/libapi').dao;

class UserDao extends CrudDao {

    constructor() {
        super(constant.tableName.USERS);
        this.name = constant.tableName.USERS;
    }
    
};

module.exports = UserDao;