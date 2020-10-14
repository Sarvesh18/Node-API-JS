/**
 * @constant {object} ERROR
 * HTTP Status Code
 * 1xx Information
 * 2xx Successful
 * 3xx Redirection
 * 4xx Client Error
 * 5xx Server Error
 */
//code
//error
//message
//resource

module.exports = {
    //4xx Client Error

    //400 BadRequest
    //Invalid_Request
    //404 Not Found
    INVALID_INPUT: {
        status: 400,
        code: 'INVALID_INPUT',
        detail: 'The request input is not as expected.',
        desc: 'Bad Request'
    },
    //AccessDenied 403 Forbidden
    //AlreadyExists
    //409 Conflict
    //Internal Server Error
    //UnauthorisedAccess
    
    INVALID_TOKEN: {
        status: 401,
        code: 'INVALID_TOKEN',
        detail: 'Access denied. Current user does not has access for this resource.',
        desc: 'Auth Token Invalid'
    },
    MISSING_TOKEN: {
        status: 401,
        code: 'MISSING_TOKEN',
        detail: 'Access denied. Current user does not has access for this resource.',
        desc: 'Auth Token Missing'
    },
    INVALID_KEY: {
        status: 403,
        code: 'INVALID_KEY',
        detail: 'Your request did not include an API key.',
        desc: 'API Key Invalid'
    },
    MISSING_KEY: {
        status: 403,
        code: 'MISSING_KEY',
        detail: 'Your request did not include an API key.',
        desc: 'API Key Missing'
    },

    //5xx Server Error
    INTERNAL_ERROR: {
        status: 500,
        code: 'INTERNAL_ERROR',
        detail: 'An unexpected internal error has occurred. Please contact Support for more information.',
        desc: 'Internal Server Error'
    },


    SOMETHING_WENT_WRONG: {
        status: 500,
        code: 'SOMETHING_WENT_WRONG',
        detail: 'Something Went Wrong.',
        desc: 'Internal Server Error'
    },

    
    ID_NOT_FOUND: {
        status: 404,
        code: 'ID_NOT_FOUND',
        detail: 'ID is not registered.',
        desc: 'Resource Not Found'
    },
    PASSWORD_MISMATCH: {
        status: 401,
        code: 'PASSWORD_MISMATCH',
        detail: 'Your input password did not match.',
        desc: 'Unauthorized'
    },
    


    OTP_MISMATCH: {
        status: 401,
        code: 'OTP_MISMATCH',
        detail: 'Your otp did not match.',
        desc: 'Unauthorized'
    },


    ID_EXIST: {
        status: 409,
        code: 'ID_EXIST',
        detail: 'ID already exists. Try another!',
        desc: 'Conflict'
    },

    MOBILE_EXIST: {
        status: 409,
        code: 'MOBILE_EXIST',
        detail: 'Mobile Number already exists. Try another!',
        desc: 'Conflict'
    },

    ACCOUNT_INACTIVE: {
        status: 403,
        code: 'ACCOUNT_INACTIVE',
        detail: 'Your account is inactive. Please contact admin.',
        desc: 'Forbidden'
    },

    INVALID_DATE: {
        status: 403,
        code: 'INVALID_DATE',
        detail: 'Date is lesser than today is not allowed.',
        desc: 'Forbidden'
    },


    //INPUT_FORMAT_INVALID
    FILE_FORMAT_UNSUPPORTED: {
        status: 415,
        code: 'FILE_FORMAT_UNSUPPORTED',
        detail: 'File format is not allowed.',
        desc: 'Unsupported Media Type'
    },

    FILE_TOO_LARGE: {
        status: 413,
        code: 'FILE_TOO_LARGE',
        detail: 'File size exceeds upload size limit.',
        desc: 'Payload Too Large'
    },

    FILE_NOT_FOUND: {
        status: 400,
        code: 'FILE_NOT_FOUND',
        detail: 'No file found in request body.',
        desc: 'Resource Not Found.'
    },

    UPLOAD_ERROR: {
        status: 500,
        code: 'UPLOAD_ERROR',
        detail: 'Something went wrong.',
        desc: 'Internal Server Error'
    },

}