const express = require('express');
const { httpGetAllLaunches, httpScheduleNewLaunch, httpAbortLaunch } = require('./launches.controller');
const { requireAuth } = require('../../middlewares/require-auth');

const launchesRouter = express.Router();

launchesRouter.get('/launches', httpGetAllLaunches);
launchesRouter.post('/launches', requireAuth, httpScheduleNewLaunch);
launchesRouter.delete('/launches/:id', httpAbortLaunch);

module.exports = launchesRouter;