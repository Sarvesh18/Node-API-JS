const ApiUtils = require('../../local_modules/libapi/src/utils/ApiUtils');

module.exports = {
    jwt: require('./jwt'),
    getApiError : new ApiUtils().getApiError,
    getApiSuccess : new ApiUtils().getApiSuccess
}