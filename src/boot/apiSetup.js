'use strict';

const cors = require('cors');
const express = require('express');

const { mountRoutes } = require('../../local_modules/libapi').utils;
const { authHandler, errorHandler } = require('../../local_modules/libapi').middlewares;

const configureAPI = async app => {

	app.use((req, res, next) => {
		
		console.log(new Date().toISOString(), '=', req.method, '=', req.originalUrl);

		return next();
	});

	app.use(
		cors()
		/*{
        'origin': '*',
        'methods': 'GET,PUT,POST,DELETE',
        'allowedHeaders': [],
        'exposedHeaders': []
        }*/
	);

	//Callback or Webhook or Public API
	app.use('/api/v2/public', mountRoutes('src/v2/publicModule'));

	
	app.use('/api', express.json());

	app.use('/api', authHandler.apiKeyCheck);


	//With Auth - Protected Route
	//app.use('/api/v1/common', mountRoutes('src/v1/commonModule'));

	//app.use('/api/v1/patient', authHandler.authorizationCheck(), mountRoutes('src/v1/patientModule'));
	

	//Group
	/*
	{
  "group": "ClientAdmin",
  "permissions": [
    {
      "resource": "user/status/*",
      "methods": ["PUT"],
      "action": "allow"
    }
  ]
}
*/

	app.use('/api/v2/auth', mountRoutes('src/v2/authModule'));

	app.use('/api/v2/patient', authHandler.authorizationCheck(), mountRoutes('src/v2/patientModule'));

	app.use(errorHandler);
};

module.exports = configureAPI;
