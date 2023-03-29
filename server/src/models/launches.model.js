const launches = require('./launches.mongo');
const planets = require('./planets.mongo');

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    destination: 'Kepler-442 b',
    launchDate: 'January 4, 2030',
    customer: ['ZTM', 'NASA'],
    upcoming: true,
    success: true,
};

saveLaunch(launch);

async function existsLaunchWithId(launchId) {
    return await launches.findOne({
        flightNumber: launchId,
    });
}

async function getAllLaunches() {
    return await launches.find(
        {},
        { '_id': 0, '__v': 0 }
    );
}

async function saveLaunch(launch) {
    const planet = await planets.findOne({
        keplerName: launch.destination,
    });

    if(!planet) {
        throw new Error(`The planet '${launch.destination}' does not exist in our database.`);
    }

    await launches.findOneAndUpdate(
        { flightNumber: launch.flightNumber },
        launch,
        { upsert: true }
    );
}

async function getLatestFlightNumber() {
    const latestLaunch = await launches.findOne().sort('-flightNumber');

    if(!latestLaunch) {
        return 1;
    }

    return latestLaunch.flightNumber;
}

async function scheduleNewLaunch(launch) {

    const newLaunch = Object.assign(launch, {
        success: true,
        upcoming: true,
        customers: ['Zero to Mastery', 'NASA'],
        flightNumber: await getLatestFlightNumber() + 1,
    });

    await saveLaunch(newLaunch);
}

async function abortLaunchById(launchId) {
    const aborted = await launches.updateOne(
        { flightNumber: launchId, },
        { upcoming: false, success: false, },
    );

    return aborted.ok === 1 && aborted.nModified === 1;
}


module.exports = {
    getAllLaunches,
    scheduleNewLaunch,
    existsLaunchWithId,
    abortLaunchById,
};