const express = require('express');
const passport = require('passport');

const authRouter = express.Router();

authRouter.get('/auth/google-login', passport.authenticate('google', { scope: ['email'] }));

authRouter.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/login-failure',
    successRedirect: '/',
    session: false,
    }),
    (req, res) => {
        console.log('Google auth callback worked');
    }
);

authRouter.get('/auth/logout', (req, res) => {});

authRouter.get('/login-failure', (req, res) => {
    return res.status(401).json({ message: 'Login failed' });
});

module.exports = authRouter;
