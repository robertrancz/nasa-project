//const passport = require('passport');

function requireAuth(req, res, next) {

    console.log('Current user: ', req.user || 'not logged in');

    const isLoggedIn = req.isAuthenticated() && req.user;
    if (!isLoggedIn) {
        return res.status(401).json({ message: 'You must be logged in to access this resource' });
    }

    next();
}

module.exports = { requireAuth };