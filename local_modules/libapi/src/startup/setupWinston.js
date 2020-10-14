'use strict';

const path = require('path');
const winston = require('winston');

let logger = null;

const initLogger = () => {

    //fs.existsSync('logs') || fs.mkdirSync('logs');

    const options = {
        /*infofile: {
            level: "info",
            filename: path.join(__dirname,'../../logs/info.log'),
            maxsize: 1024 * 1024,
            timestamp: true
        },
        debugfile: {
            level: "debug",
            filename: path.join(__dirname, '../../logs/debug.log'),
            maxsize: 1024 * 1024,
            timestamp: true
        },*/
        errorfile: {
            level: "error",
            filename: path.join(__dirname, './logs/error.log'),
            maxsize: 1024 * 1024,
            timestamp: true
        },
        /*consolefile: {
            level: "error",
        }*/
    }

    //winston.add(winston.transports.File, {});
    const logger = winston.createLogger({
        transports: [
            //new winston.transports.File(options.infofile),
            //new winston.transports.File(options.debugfile),
            new winston.transports.File(options.errorfile),
            //new winston.transports.Console(options.console)
        ]
    });

    return logger;
}; 

const setupLogger = () => {

    if(!logger) {
        logger = initLogger();
    }
    return logger;
};

module.exports = setupLogger;