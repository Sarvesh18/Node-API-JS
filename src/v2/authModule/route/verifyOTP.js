'use strict';

const _ = require('lodash');
const moment = require('moment');
const express = require('express');
const router = express.Router();

const { error, constant, success } = require('../../../../constant');
const { jwt, getApiError, getApiSuccess } = require('../../../../lib/utils');
const { validateInput } = require('../../../../local_modules/libapi').utils;

const { authCtrl, patientCtrl } = require('../ctrl');

const verifyOTPSchema = {
    type: 'object',
    properties: {
        'id': {
            type: 'string'
        },
        'otp': {
            type: 'string',
            minLength: 4,
            maxLength: 4
        }
    },
    required: ['id', 'otp'],
    additionalProperties: false
};

router.post('/verify-otp', async (req, res, next) => {
    try {
        validateInput(verifyOTPSchema, req.body);
        const { id, otp } = req.body;

        const patient = await patientCtrl.findPatient({ 'id': id});
        
        if (patient.length) {

            await authCtrl.getOTP(patient[0].dialingCode, patient[0].mobileNumber, otp)

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
        }
        else {
            throw (getApiError(error.ID_NOT_FOUND));
        }

        res.json(getApiSuccess(res.locals.data, success.OTP_VERIFIED));
    }
    catch(err) {
        return next(err);
    }
});

module.exports = router;