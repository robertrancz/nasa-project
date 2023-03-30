const axios = require('axios');
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

async function loadHistoricalLaunchData() {

    const firstLaunch = await findLaunch({
        flightNumber: 1,
        rocket: 'Falcon 1',
        mission: 'FalconSat',
    });

    if(firstLaunch) {
        console.log('Historical launch data already downloaded.');
        return;
    } else {
        await downloadHistoricalLaunches();
    }
}

async function downloadHistoricalLaunches() {
    console.log('Loading historical launch data from SpaceXData API...');

    const SpaceX_API_URL = 'https://api.spacexdata.com/v4/launches/query';

    const response = await axios.post(SpaceX_API_URL, {
        query: {},
        options: {
            pagination: false,
            populate: [
                {
                    path: 'rocket',
                    select: { name: 1 },
                },
                {
                    path: 'payloads',
                    select: { customers: 1 },
                }
            ]
        },
    });

    if(response.status !== 200) {
        console.log('Problem downloading launch data using SpaceX API.');
        throw new Error('Historical launch data download failed.');
    }

    const launchDocs = response.data.docs;

    for(const launchDoc of launchDocs) {
        const payloads = launchDoc['payloads'];
        const customers = payloads.flatMap((payload) => {
            return payload['customers'];
        });

        const flightData = {
            flightNumber: launchDoc['flight_number'],
            mission: launchDoc['name'],
            rocket: launchDoc['rocket']['name'],
            launchDate: launchDoc['date_local'],
            upcoming: launchDoc['upcoming'],
            success: launchDoc['success'],
            customers,
        };

        console.log(`${flightData.flightNumber} ${flightData.mission}`);

        await saveLaunch(flightData);
    }
}

async function findLaunch(filter) {
    return await launches.findOne(filter);
}

async function existsLaunchWithId(launchId) {
    return await findLaunch({
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
    const planet = await planets.findOne({
        keplerName: launch.destination,
    });

    if(!planet) {
        throw new Error(`The planet '${launch.destination}' does not exist in our database.`);
    }

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
    loadHistoricalLaunchData,
    getAllLaunches,
    scheduleNewLaunch,
    existsLaunchWithId,
    abortLaunchById,
};