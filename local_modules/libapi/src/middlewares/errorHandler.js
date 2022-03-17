'use strict';

const _ = require('lodash');
const winston = require('winston');

const { ApiError, ApiUtils } = require('../utils');

const errorHandler = (err, req, res, next) => {

    if(res.headersSent) {
        res.end();
    }
    else if(err instanceof ApiError) {

        winston.log('error', `API ERROR: ${req.method}:${req.url}`, err);

        new ApiUtils().sendErrorResponse(err, res);
    }
    else if(err instanceof Error) {

        winston.log('error', `SERVER ERROR: ${req.method}:${req.url}`, err);

        //err.stack
        //logError
        //Notifier.notifiy(title, message{ }) - To send mail
        new ApiUtils().sendErrorResponse(new ApiError('Internal Server Error.').withStatus(500).withDetail(inspectDetail(err)), res);
    }
    else {
        
        winston.log('error', `UNKNOWN ERROR: ${req.method}:${req.url}`, err);

        new ApiUtils().sendErrorResponse(new ApiError('Internal Server Error.').withStatus(500).withDetail(inspectDetail(err)), res);
    }

    next();
};


/**
 * 
 * @param {*} err 
 */
const inspectDetail = (err) => {

    if (err instanceof Error && _.has(err, 'message')) {
        return err.message;
    }

    /*
    //Duplicate Key
    error.name
    error.code
    error.detail
    */

    return 'Unknown Error';
}


/**
 * @type {errorHandler}
 */
module.exports = errorHandler;
