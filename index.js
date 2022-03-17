'use strict';

const express = require('express');
const app = express();

app.set('host', process.env.SERVER_HOST || '127.0.0.1');
app.set('port', process.env.SERVER_PORT || 8090);

require('./src/boot')(__dirname, app)
    .then((res) => {
        
        app.listen(app.get('port'), () => {
            console.log('%s 🌎 is running at http://%s:%d in %s mode', '✓', app.get('host'), app.get('port'), app.get('env'));
        });
    })
    .catch((err) => {
        
        throw err;
    });