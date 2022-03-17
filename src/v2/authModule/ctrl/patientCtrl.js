'use strict';
const { UserDao } = require('./../dao');
const { constant } = require('../../../../constant');

const User = new UserDao();

const createPatient = async (name, gender, id, dialingCode, mobileNumber, password) => {
    
    //TODO:
    //encrypt password
    
    const insert = {
        name,
        gender,
        id,
        dialingCode, 
        mobileNumber,
        password,

        dob: new Date(),
        
        userType: constant.userType.PATIENT,
        userStatus: constant.userStatus.ACTIVE,

        confidentiality: constant.confidentiality.NORMAL
    };
    await User.save(insert, 'USERID');

    //createUser
};

const findPatient = (condition) => {
    return User.find(['userId', 'userType', 'userStatus', 'name', 'dob', 'gender', 'confidentiality', 'id', 'patientId', 'email', 'dialingCode', 'mobileNumber', 'password', 'createdAt', 'updatedAt'], condition);
};

const updatePatient = (condition, update) => {
    return User.update(condition, update);
};

module.exports = {
    createPatient,
    findPatient,
    updatePatient
}