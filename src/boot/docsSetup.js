'use strict';

const pug = require('pug');
//const jade = require('jade');
const path = require('path');
const _ = require('lodash');

const { error, success } = require('../../constant');
//const { error } = require('libapi').constants

const configureDocs = (app) => {

    //app.set("view engine", "pug");
    //app.set("views", __dirname + "/views");
    //res.render()
    
    //serve api error in pug template
    app.get('/apiDocs/error', (req, res) => {
        
        //pug.render()
        //pug.renderFile('', {})
        res.send(
            pug.compileFile(path.join('local_modules', 'libapi', 'src', 'docs', 'error.pug'))({
                error: _.merge(require('libapi').constants.error, error) 
            })
        );
    });

    //serve api success in pug template
    app.get('/apiDocs/success', (req, res) => {
        res.send(
            pug.compileFile(path.join('local_modules', 'libapi', 'src', 'docs', 'success.pug'))({
                success: _.merge(require('libapi').constants.success, success)
            })
        );
    });
};

module.exports = configureDocs;

