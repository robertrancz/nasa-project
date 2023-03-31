const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
const cookieSession = require('cookie-session');

const apiV1 = require('./routes/api-v1');
const { GoogleAuthStrategy } = require('./services/oauth-google');

passport.use(GoogleAuthStrategy());

// Save the session in the cookie
passport.serializeUser((user, done) => {
    done(null, user);
});

// Retrieve the session from the cookie
passport.deserializeUser((user, done) => {
    done(null, user);
});

const app = express();

app.use(cookieSession({
    name: 'nasa-session',
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY_1, process.env.COOKIE_KEY_2],
}));

app.use(passport.initialize());
app.use(passport.session());

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