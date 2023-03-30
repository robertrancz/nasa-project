const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL;

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
