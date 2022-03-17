'use strict';

const _ = require('lodash');
const express = require('express');
const router = express.Router();

const { authCtrl } = require('../ctrl');
const { success } = require('../../../../constant');
const { getApiSuccess } = require('../../../../lib/utils');
const { validateInput } = require('../../../../local_modules/libapi').utils;

const sendOTPSchema = {
    type: 'object',
    properties: {
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
        }
    },
    required: ['dialingCode', 'mobileNumber'],
    additionalProperties: false
};

router.post('/send-otp', async (req, res, next) => {
    try {
        validateInput(sendOTPSchema, req.body);
        const { dialingCode, mobileNumber } = req.body;
        
        await authCtrl.isMobileExist(dialingCode, mobileNumber);
        
        await authCtrl.setOTP(dialingCode, mobileNumber);
        
        res.json(getApiSuccess({}, success.OTP_SENDED));
    }
    catch (err) {
        return next(err);
    }
});

module.exports = router;

