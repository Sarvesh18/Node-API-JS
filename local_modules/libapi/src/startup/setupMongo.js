'use strict';

let mongo = null;

const initMongo = () => {

    return;
}; 

const setupMongo = () => {

    if(!mongo) {
        mongo = initMongo();
    }
    return mongo;
};

module.exports = setupMongo;