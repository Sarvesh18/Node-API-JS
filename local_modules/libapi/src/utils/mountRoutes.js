'use strict';

const fs = require('fs');
const glob = require('glob');

const express = require('express');

//const util = require('util');
//const glob = util.promisify(require('glob'));

const mountRoutes = (cwd) => {

    const router = express.Router();

    const routes = glob.sync('**/route/**/*.js', { cwd: cwd, realpath: true });

    routes.forEach(route => {
                    
        if(route && fs.existsSync(route) && require(route) && typeof require(route) === 'function') {

            router.use(require(route));
        }
    });

    return router;
};

module.exports = mountRoutes;