'use strict';

const jwt = require('jsonwebtoken');

//Create JWT
const create = (payload, secretKey, options) => {
    return jwt.sign(
        payload,
        secretKey,
        options
    );
};

//Verify Token
const verify = (token, secretKey) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err)
                return reject(err);
            return resolve(decoded);
        })
    })
};

//Create Token for Customer
const createAuthToken = (user, secretKey, expiresIn) => {
    return create(
        { user: user }, 
        secretKey,
        { expiresIn: expiresIn } 
    );
}

//Verify Token A/t apiFor
const verifyAuthToken = (token, secretKey) => {
    return verify(token, secretKey);
}

module.exports = {
    createAuthToken,
    verifyAuthToken,
}
