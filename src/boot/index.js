'use strict';

//const path = require('path');
//const express = require('express');

//graceful shutdown

const boot = async (rootDir, app) => {
	try {
		if (app.get('env') === 'staging') {
			//const morgan = require('morgan');
			//app.use(morgan('dev'));
			require('./docsSetup')(app);
		}

		//Startup
		await require('./startupSetup')();

		//API Gateway
		await require('./apiSetup')(app);

		//await require('./docsSetup')(app);
		
		
		//configSetup
		//scheduleSetup
		//socketSetup
		//staticSetup
		//viewSetup
		//app.use('/static', express.static(path.join(__dirname, 'data')))


		//app.use((req, res, next) => {
			//res.status(400).send('Not Found');
		//});

		//graceful shutdown
	} catch (err) {
		//Notify by email
		console.log('Error in Boot===>', err);
		app.use((req, res, next) => {
			res.status(503).send('Service Unavailable');
		});
	}
};

module.exports = boot;
