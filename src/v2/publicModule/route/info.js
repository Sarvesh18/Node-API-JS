'use strict';

const express = require('express');
const router = express.Router();

const { success } = require('../../../../constant');
const { getApiSuccess } = require('../../../../lib/utils');
const { name, version } = require('../../../../package.json');

/**
 * @api {get} /api/
 * @apiName Get Info
 * @apiGroup Other
 */
router.get('/', async (req, res, next) => {
    try {
        res.locals.data = {
            'NAME': name,
            'VERSION': version,
            'NODE_ENV': process.env.NODE_ENV,
        };
        res.json(getApiSuccess(res.locals.data, success.OK));
    }
    catch (error) {
        return next(error);
    }
});

module.exports = router;