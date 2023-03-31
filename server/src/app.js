const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');

const apiV1 = require('./routes/api-v1');

const app = express();

app.use(cors({
    origin: 'https://localhost:3000',
}));

app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());

app.use('/v1', apiV1);

// allow the client side routing to work
app.get('/*', (req, res) => {
    // set the default page to index.html
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;