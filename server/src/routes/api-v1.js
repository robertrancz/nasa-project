const express = require('express');

const planetsRouter = require('./planets/planets.router');
const launchesRouter = require('./launches/launches.router');
const authRouter = require('./auth/auth.router');

const apiV1 = express.Router();

apiV1.use(planetsRouter);
apiV1.use(launchesRouter);
apiV1.use(authRouter);

module.exports = apiV1;
