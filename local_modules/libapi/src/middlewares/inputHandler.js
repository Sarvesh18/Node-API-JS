'use strict';

const { validateInput } = require('../utils');

const validateBody = (schema) => {
    return (req, res, next) => {
        try {
            validateInput(schema, req.body);
            return next()
        }
        catch(err) {
            return next(err);
        }
    };
};

const validateQuery = (schema) => {
    return (req, res, next) => {
        try {
            validateInput(schema, req.query);
            return next()
        }
        catch (err) {
            return next(err);
        }
    };
};

const validateParams = (schema) => {
    return (req, res, next) => {
        try {
            validateInput(schema, req.params);
            return next()
        }
        catch (err) {
            return next(err);
        }
    };
};

module.exports = {
    validateBody,
    validateQuery,
    validateParams
};