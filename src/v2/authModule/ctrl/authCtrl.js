'use strict';
const { OTPDao, UserDao } = require('./../dao');
const { error } = require('../../../../constant');

const { getApiError } = require('../../../../lib/utils');

const OTP = new OTPDao(); 
const User = new UserDao();

const setOTP = async (dailingCode, mobileNumber) => {

};

const getOTP = async (dailingCode, mobileNumber, otp) => {
    if(otp !== '1234') {
        throw getApiError(error.OTP_MISMATCH);
    }
};

const isIdExist = async (id) => {
    const ID = await User.find('USERID', { 'id': id});
    if(ID.length) {
        throw getApiError(error.ID_EXIST);
    }
};

const isMobileExist = async (dialingCode, mobileNumber) => {
    const mobile = await User.find('USERID', { 'dialingCode': dialingCode, 'mobileNumber': mobileNumber });
    if(mobile.length) {
        throw getApiError(error.MOBILE_EXIST);
    }
};

module.exports = {
    setOTP,
    getOTP,

    isIdExist,
    isMobileExist,
}