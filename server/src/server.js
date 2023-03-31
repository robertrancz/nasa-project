const fs = require('fs');
const https = require('https');
//const http = require('http');
require('dotenv').config();
const app = require('./app');

const { mongoConnect } = require('./services/mongo');
const { loadPlanetsData } = require('./models/planets.model');
const { loadHistoricalLaunchData } = require('./models/launches.model');

const PORT = process.env.PORT || 8000;

const server = https.createServer(
  {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem'),
  },
  app);
//const server = http.createServer(app);

async function startServer() {
  // perform actions needed before starting the server
  await mongoConnect();  
  await loadPlanetsData();
  await loadHistoricalLaunchData();

  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
  });
}

startServer();
