const express = require('express');
const passport = require('passport');

const authRouter = express.Router();

authRouter.get('/auth/google-login', passport.authenticate('google', { scope: ['email'] }));

authRouter.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/login-failure',
    successRedirect: '/',
    session: true,
    }),
    (req, res) => {
        console.log('Google auth callback worked');
    }
);

authRouter.get('/auth/logout', (req, res) => {
    req.logout();   // Removes req.user and clears the login session
    return res.redirect('/');
});

authRouter.get('/login-failure', (req, res) => {
    return res.status(401).json({ message: 'Login failed' });
});

module.exports = authRouter;
