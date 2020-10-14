/**
 * @module
 */
'use strict';

const _ = require('lodash');
const { error } = require('../../../../constant');
const { getApiError, jwt } = require('../../../../lib/utils');

/**
 * Api Key Check
 * @method
 * @param {req} req 
 * @param {res} res 
 * @param {next} next 
 */
const apiKeyCheck = (req, res, next) => {

    const apiKey = req.get('apiKey') || req.query.apiKey;

    const apiKeys = {
        ios: process.env.API_KEY_IOS,
        android: process.env.API_KEY_ANDROID
    }

    if (!_.isString(apiKey)) {
        return next(getApiError(error.MISSING_KEY));
    }

    const clientType = _.findKey(apiKeys, (value) => value === apiKey);

    res.locals.clientType = clientType;

    return next(_.isString(clientType) ? '' : getApiError(error.INVALID_KEY));
}

/**
 * Authorization Check
 * @method
 * @param {req} req 
 * @param {res} res 
 * @param {next} next 
 */
const authorizationCheck = () => {

    return (req, res, next) => {

        const token = req.get("Authorization") || req.query.Authorization;

        if (token) {
            jwt.verifyAuthToken(token, process.env.AUTH_SECRET_KEY)
                .then((decoded) => {
                    res.locals.user = decoded.user;
                    return next();
                })
                .catch((err) => {
                    return next(getApiError(error.INVALID_TOKEN, err.name === 'TokenExpiredError' ? 'Token is Expired': 'Auth Token Invalid'))
                });
        } else {
            return next(getApiError(error.MISSING_TOKEN));
        }
    }
};

//method - GET, POST, PUT, DEL 
//permission - UserStatus
//session - Session Expired //invalidate 

//blacklist
//revoked
//Privilege Level Change
//session
//Session Expiration
const sessionCheck = () => {

};

const validateUser = () => {

};


const permissionCheck = () => {

};

module.exports = {
    apiKeyCheck,
    authorizationCheck
};