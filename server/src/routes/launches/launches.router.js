const express = require('express');
const { httpGetAllLaunches, httpScheduleNewLaunch, httpAbortLaunch } = require('./launches.controller');

const launchesRouter = express.Router();

launchesRouter.get('/launches', httpGetAllLaunches);
launchesRouter.post('/launches', httpScheduleNewLaunch);
launchesRouter.delete('/launches/:id', httpAbortLaunch);

module.exports = launchesRouter;