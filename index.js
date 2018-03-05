/* Load modules */
const express = require("express");
const app = express();
const bodyParser = require("body-parser");


//swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

/* Database configuration */
const database = require('./app/config/dbconfig');

/* Init database */
database.init();

/* Init server listening */
const port = process.argv[2] || 3000;
const host = 'localhost';

/* Express configuration */
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/* Router configuration */
const REST_API_ROOT = '/api';
app.use(REST_API_ROOT, require('./app/routes/router'));

//swagger configuration
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912
if (!module.parent) {
 app.listen(port, host, function () {
    console.log('Server running at http://' + host + ':' + port);
    console.log('Swagger docs running at http://' + host + ':' + port + '/api-docs'); 
 });   
}

module.exports = app;
