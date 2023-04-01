  const GoogleOAuthStrategy = require('passport-google-oauth20').Strategy;

function GoogleAuthStrategy() {
    return new GoogleOAuthStrategy(authOptions, verifyCallback);
}

const authOptions = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/v1/auth/google/callback',
};

const verifyCallback = (accessToken, refreshToken, profile, done) => {
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);
    console.log('Google profile', profile);

    done(null, profile);
};

module.exports = { GoogleAuthStrategy };