'use strict';

const ApiError = require('./ApiError');

class ApiUtils {

    constructor() {}

    getApiError(err, msg) {
        
        return new ApiError()
            .withStatus(err.status)
            .withCode(err.code)
            .withDetail(msg || err.detail);
    };

    getApiSuccess(data, msg) {

        return {
            //status: 200,
            isError: false,
            data: data,
            message: msg || 'OK'
        };
    };

    sendErrorResponse(apiError, res) {
        
        res.status(apiError.status).json({
            isError: true,
            code: apiError.code,
            detail: apiError.detail
        });
    };

    sendSuccessResponse(apiSuccess, res) {

        res.status(apiSuccess.status || 200).json({
            isError: false,
            data: apiSuccess.data,
            message: apiSuccess.message
        });
    };

};

module.exports = ApiUtils;