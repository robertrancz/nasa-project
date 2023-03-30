const express = require('express');

const planetsRouter = require('./planets/planets.router');
const launchesRouter = require('./launches/launches.router');

const apiV1 = express.Router();

apiV1.use(planetsRouter);
apiV1.use(launchesRouter);

module.exports = apiV1;
