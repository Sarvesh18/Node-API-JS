'use strict';

const _ = require('lodash');
//const errStackParser = require('error-stack-parser');

/**
 * @class
 * @extends Error
 */
class ApiError extends Error {
 
    /**
     * @constructor
     * @param {string} message - Error Message 
     */
    constructor(message) {
        super(message);

        this._status = ApiError.DEFAULT_STATUS;
        
        this._code = ApiError.DEFAULT_CODE;
        
        this._detail = message;
        
        //this._stack =  errStackParser.parse(this);
    }

    static get DEFAULT_STATUS() {
        return 500;
    };
    
    /**
     * HTTP status code
     * @type {number}
     */
    get status() {
        return this._status;
    }

    withStatus(status) {
        if(!_.isFinite(status)) {
            throw new Error('status should be a number.');
        }
        this._status = status;
        return this;
    }

    static get DEFAULT_CODE() {
        return 'INTERNAL_ERROR';
    };

    /**
     * Specific error code
     * @type {number}
     */
    get code() {
        return this._code;
    }

    withCode(code) {
        if(!_.isString(code)) {
            throw new Error('code should be a string.');
        }
        this._code = code;
        return this;
    }

    /**
     * Arbitrary detail 
     * @type {*}
     */
    get detail() {
        return this._detail;
    }

    withDetail(detail) {
        this._detail = detail;
        return this;
    }
}

/**
 * @type {ApiError}
 */
module.exports = ApiError;

/*
EACCESS (Permission denied)
EADDRINUSE (Address already in use)
ECONNREFUSED (Connection refused)
ECONNRESET (Connection reset by peer)
EEXIST
EISDIR
EMFILE
ENOENT (No such file or directory)
ENOTDIR
ENOTEMPTY
ENOTFOUND
EPERM (Operation not permitted)
EPIPE
ETIMEDOUT (Operation timed out)
 */