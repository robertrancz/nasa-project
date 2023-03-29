const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');

const { loadPlanetsData } = require('./models/planets.model');

const PORT = process.env.PORT || 8000;
const MONGO_URL = 'mongodb+srv://<username>:<password>@<server>';

const server = http.createServer(app);

mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready...');
});
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error: ', err);
});


async function startServer() {

  await mongoose.connect(MONGO_URL, {
    // these options are needed to avoid deprecation warnings
    useNewUrlParser: true,
    //useFindAndModify: false,
    //usecreateIndex: true,
    useUnifiedTopology: true,
  });
  
  // perform actions needed before starting the server
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
  });
}

startServer();
