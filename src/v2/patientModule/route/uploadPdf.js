'use strict';

const fs = require('fs');
const express = require('express');
const router = express.Router();

const { error, constant, success } = require('../../../../constant');
const { getApiSuccess } = require('../../../../lib/utils');
const { validateInput } = require('../../../../local_modules/libapi').utils;

const { uploadHandler } = require('../../../../local_modules/libapi').middlewares;

/*const uploadParamSchema = {
    type: 'object',
    properties: {
        'content': {
            type: "string",
            enum: ["image", "pdf"]
        },
    },
    required: ['content'],
    additionalProperties: false
};*/

const uploadSchema = {
    type: 'object',
    properties: {
        'documentName': {
            type: "string",
            minLength: 1
        },
        'hospitalName': {
            type: "string",
            minLength: 1
        },
    },
    required: ['documentName', 'hospitalName'],
    additionalProperties: false
};

router.post('/upload/pdf', uploadHandler('./tmp/', 'pdf'), async (req, res, next) => {
    try {

        const data = fs.readFileSync(req.files[0].path);
        fs.unlinkSync(req.files[0].path);

        validateInput(uploadSchema, req.body);
        
        //data:image/gif;base64,
        const base64 = Buffer.from(data).toString('base64');
        //fs.writeFileSync('./base64.png', Buffer.from(base64, 'base64'));

        /**
         * Key
         * ETag
         * Bucket
         * -Location
         * -Filename
         */
        //userId: res.locals.user.userId,
        //location: upload.Location,
        //purpose: req.body.purpose || 'unknown'
        
        res.json(getApiSuccess({}, success.UPLOAD_DONE));
    }
    catch(err) {
        return next(err);
    }
});

module.exports = router;