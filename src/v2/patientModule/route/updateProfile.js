'use strict';

const _ = require('lodash');
const moment = require('moment');
const express = require('express');
const router = express.Router();

const { patientCtrl } = require('../../authModule/ctrl');
const { error, constant, success } = require('../../../../constant');
const { getApiError, getApiSuccess } = require('../../../../lib/utils');
const { validateInput } = require('../../../../local_modules/libapi').utils;

const updateProfileSchema = {
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
        'dob': {
            type: 'string',
            format: "date",
        }
    },
    required: ['name', 'gender', 'dob'],
    additionalProperties: false
};

router.put('/profile', async (req, res, next) => {
    try {
        validateInput(updateProfileSchema, req.body);
        const { name, gender, dob } = req.body;
        
        const { user } = res.locals;

        const isError = new Date().setHours(0, 0, 0, 0) <= new Date(dob).setHours(0, 0, 0, 0); //setHours(23, 59, 59, 0)        
        if (isError) {
            throw getApiError(error.INVALID_DATE);
        }

        let patient = await patientCtrl.findPatient({ 'userId': user.userId});
        
        if (patient.length) {

            const update = {
                name,
                gender,
                dob
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

        res.json(getApiSuccess(res.locals.data, success.PROFILE_UPDATE));
    }
    catch (err) {
        return next(err);
    }
});

module.exports = router;

