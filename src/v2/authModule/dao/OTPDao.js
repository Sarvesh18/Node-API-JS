'use strict';

const { constant } = require('../../../../constant');
const { CacheDao } = require('../../../../local_modules/libapi').dao;

class OTPDao extends CacheDao {

    constructor() {
        super(constant.cacheName.OTP);
        this.name = constant.cacheName.OTP;
    }
    
};

module.exports = OTPDao;