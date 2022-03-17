'use strict';

const _ = require('lodash');
const express = require('express');
const router = express.Router();

const { error, constant, success } = require('../../../../constant');
const { getApiError, getApiSuccess } = require('../../../../lib/utils');
const { validateInput } = require('../../../../local_modules/libapi').utils;

const { patientCtrl } = require('../ctrl');

const loginSchema = {
    type: 'object',
    properties: {
        'id': {
            type: 'string'
        },
        'password': {
            type: 'string',
            minLength: 5
        }
    },
    required: ['id', 'password'],
    additionalProperties: false
};

router.post('/login', async (req, res, next) => {
    try {

        validateInput(loginSchema, req.body);
        
        const { id, password } = req.body;
        
        const patient = await patientCtrl.findPatient({ 'id': id});
        
        if(patient.length) {

            if (password !== patient[0].password) {
                throw (getApiError(error.PASSWORD_MISMATCH));
            }
            else if (patient[0].userStatus === constant.userStatus.INACTIVE) {
                throw (getApiError(error.ACCOUNT_INACTIVE));    
            }
            //res.locals.data = _.omit(patient[0], 'password');
        }
        else {
            throw (getApiError(error.ID_NOT_FOUND));
        }

        res.json(getApiSuccess({}, success.LOGIN_SUCCESS));
    }
    catch (err) {
        return next(err);
    }
});

module.exports = router;

