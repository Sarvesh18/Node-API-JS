'use strict';

const Ajv = require('ajv');
/*const localize = {
    en: require('ajv-i18n/localize/en')
};*/

const { error } = require('../../../../constant');
const { getApiError } = require('../../../../lib/utils');

/**
 * 
 * @param {*} schema 
 * @param {*} input 
 */

const validateInput = (schema, input) => {

    input = input || {};

    const ajv = new Ajv({
        allErrors: true,
    });

    //var validate = ajv.compile(schema);
    //var valid = validate(input);
    const valid = ajv.validate(schema, input);

    //localize.en(ajv.errors.message);
    if (!valid) {
        throw getApiError(error.INVALID_INPUT, ajv.errorsText(ajv.errors/*, { separator: '\n' }*/));
    }
    return null;
}

module.exports = validateInput;