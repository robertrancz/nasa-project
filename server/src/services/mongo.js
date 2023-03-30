const mongoose = require('mongoose');

// TODO: update with your MongoDB connection string
const MONGO_URL = 'mongodb+srv://<username>:<password>@<server>';

mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready...');
  });

mongoose.connection.on('error', (err) => {
console.error('MongoDB connection error: ', err);
});

async function mongoConnect() {
mongoose.connect(MONGO_URL, {
    // these options are needed to avoid deprecation warnings
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify: false,
    //usecreateIndex: true,
    });
}

async function mongoDisconnect() {
    await mongoose.disconnect();
}

module.exports = { mongoConnect, mongoDisconnect };
