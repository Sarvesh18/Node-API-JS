'use strict';

const _ = require('lodash');
const express = require('express');
const router = express.Router();

const { error, success } = require('../../../../constant');
const { getApiError, getApiSuccess } = require('../../../../lib/utils');
const { validateInput } = require('../../../../local_modules/libapi').utils;

const { authCtrl, patientCtrl } = require('../ctrl');

const resendOTPSchema = {
    type: 'object',
    properties: {
        'id': {
            type: 'string'
        }
    },
    required: ['id'],
    additionalProperties: false
};

router.post('/resend-otp', async (req, res, next) => {
    try {
        validateInput(resendOTPSchema, req.body);
        const { id } = req.body;
        
        const patient = await patientCtrl.findPatient({ 'id': id});
        
        if (patient.length) { 
            
            await authCtrl.setOTP(patient[0].dailingCode, patient[0].mobileNumber);
        }
        else {
            throw (getApiError(error.ID_NOT_FOUND));
        }

        res.json(getApiSuccess({}, success.OTP_SENDED));
    }
    catch (err) {
        return next(err);
    }
});

module.exports = router;

