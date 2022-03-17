'use strict';

const _ = require('lodash');
const moment = require('moment');
const express = require('express');
const router = express.Router();

const { patientCtrl } = require('../../authModule/ctrl');
const { error, constant, success } = require('../../../../constant');
const { jwt, getApiError, getApiSuccess } = require('../../../../lib/utils');
const { validateInput } = require('../../../../local_modules/libapi').utils;

const changePasswordSchema = {
    type: 'object',
    properties: {
        'oldPassword': {
            type: 'string',
            minLength: 5
        },
        'newPassword': {
            type: 'string',
            minLength: 5
        }
    },
    required: ['oldPassword', 'newPassword'],
    additionalProperties: false
};

router.put('/password', async (req, res, next) => {
    try {
        validateInput(changePasswordSchema, req.body);
        const { oldPassword, newPassword } = req.body;
        
        const { user } = res.locals;
       
        const patient = await patientCtrl.findPatient({ 'userId': user.userId});
        
        if (patient.length) {
            if (oldPassword !== patient[0].password) {
                throw (getApiError(error.PASSWORD_MISMATCH));
            }

            const update = {
                password: newPassword
            };

            const condition = {
                userId: user.userId
            };

            await patientCtrl.updatePatient(condition, update);

            const data = {
                'userId': patient[0].userId,
                'userType': patient[0].userType,
                'userStatus': patient[0].userStatus,
                'id': patient[0].id,
                'patientId': patient[0].patientId,
                'createdAt': Date.now()
            };
    
            const authToken = jwt.createAuthToken(data, process.env.AUTH_SECRET_KEY, process.env.AUTH_EXPIRES_IN);
    
            res.set('Authorization', authToken);
            res.locals.data = _.omit(patient[0], 'password');
        }
        else {
            throw (getApiError(error.ID_NOT_FOUND));
        }

        res.json(getApiSuccess(res.locals.data, success.PASSWORD_UPDATE));
    }
    catch (err) {
        return next(err);
    }
});

module.exports = router;

