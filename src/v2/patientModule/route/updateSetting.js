'use strict';

const _ = require('lodash');
const moment = require('moment');
const express = require('express');
const router = express.Router();

const { patientCtrl } = require('../../authModule/ctrl');
const { error, constant, success } = require('../../../../constant');
const { getApiError, getApiSuccess } = require('../../../../lib/utils');
const { validateInput } = require('../../../../local_modules/libapi').utils;

const updateSettingSchema = {
    type: 'object',
    properties: {
        'confidentiality': {
            type: 'string',
            enum: ['N', 'C', 'S'] 
        }
    },
    required: ['confidentiality'],
    additionalProperties: false
};

router.put('/setting', async (req, res, next) => {
    try {
        validateInput(updateSettingSchema, req.body);
        const { confidentiality } = req.body;
        
        const { user } = res.locals;

        let patient = await patientCtrl.findPatient({ 'userId': user.userId});
        
        if (patient.length) {

            const update = {
                confidentiality
            };

            const condition = {
                userId: user.userId
            };

            await patientCtrl.updatePatient(condition, update);

            patient = await patientCtrl.findPatient({ 'userId': user.userId});
        
            res.locals.data = _.omit(patient[0], 'password');
        }
        else {
            throw (getApiError(error.ID_NOT_FOUND));
        }

        res.json(getApiSuccess(res.locals.data, success.SETTING_UPDATE));
    }
    catch (err) {
        return next(err);
    }
});

module.exports = router;

