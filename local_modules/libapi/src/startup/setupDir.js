'use strict';

const fs = require('fs');

const initDir = (dir) => {
    fs.mkdirSync(dir);
};

const setupDir = (dir) => {

    if(!fs.existsSync(dir)) {
        initDir(dir);
    };
    return;
}

module.exports = setupDir;