'use strict';

const crypto = require('crypto');

//
const encryptPassword = (password) => {
    const salt = crypto.randomBytes(128).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');  
    return ['pbkdf2', '10000', salt, hash].join('$');
    //return bcrypt.hashSync(password, 10);
};

//
const comparePassword = (password, encryptPassword) => {
    const salt = encryptPassword.split('$')[2];
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');  
    return hash === encryptPassword.split('$')[3] ? true : false;
    //return bcrypt.compare(password, encryptPassword);
};    

module.exports = {
    encryptPassword,
    comparePassword
};
