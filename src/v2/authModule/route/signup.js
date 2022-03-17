'use strict';

const _ = require('lodash');
const moment = require('moment');
const express = require('express');
const router = express.Router();

const { error, constant, success } = require('../../../../constant');
const { jwt, getApiError, getApiSuccess } = require('../../../../lib/utils');
const { validateInput } = require('../../../../local_modules/libapi').utils;

//const { patient } = require('../../../../data');

const { authCtrl, patientCtrl } = require('../ctrl');

const signupSchema = {
    type: 'object',
    properties: {
        'name': {
            type: 'string',
            pattern: '[A-Za-z ]+'
        },
        'gender': {
            type: 'string',
            enum: ['M', 'F']
        },
        'id': {
            type: 'string'
        },
        'dialingCode': {
            type: 'string',
            minLength: 2,
            maxLength: 5
        },
        'mobileNumber': {
            type: 'string',
            pattern: '[0-9]+',
            minLength: 10,
            maxLength: 10
        },
        'password': {
            type: 'string',
            minLength: 5
        },
        'otp': {
            type: 'string',
            minLength: 4,
            maxLength: 4
        }
    },
    required: ['name', 'gender', 'id', 'dialingCode', 'mobileNumber', 'password', 'otp'],
    additionalProperties: false
};

router.post('/signup', async (req, res, next) => {
    try {

        validateInput(signupSchema, req.body);
        const { name, gender, id, dialingCode, mobileNumber, password, otp } = req.body;
        
        await authCtrl.isIdExist(id);
        await authCtrl.isMobileExist(dialingCode, mobileNumber);
        await authCtrl.getOTP(dialingCode, mobileNumber, otp); 

        await patientCtrl.createPatient(name, gender, id, dialingCode, mobileNumber, password);
        
        const patient = await patientCtrl.findPatient({'mobileNumber': mobileNumber});

        const user = {
            'userId': patient[0].userId,
            'userType': patient[0].userType,
            'userStatus': patient[0].userStatus,
            'id': patient[0].id,

            'patientId': patient[0].patientId,
            'createdAt': Date.now()
        };

        const authToken = jwt.createAuthToken(user, process.env.AUTH_SECRET_KEY, process.env.AUTH_EXPIRES_IN);

        res.set('Authorization', authToken);
        res.locals.data = _.omit(patient[0], 'password');
        
        res.json(getApiSuccess(res.locals.data, success.SIGNUP_SUCCESS));
    }
    catch (err) {
        return next(err);
    }
});

module.exports = router;

