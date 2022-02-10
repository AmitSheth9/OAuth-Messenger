/* eslint-disable no-console */
const { Router } = require('express');
const UserService = require('../services/UserService');
const jwt = require('jsonwebtoken');

const ONE_DAY = 1000 * 60 * 60 * 24;

module.exports = Router()
  .get('/login', async (req, res) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&scope=user`);
  })
  .get('/login/callback', async (req, res) => {
    const user = await UserService.authorizeAndInsert(req.query.code);
    console.log('returnedsqluser', user);
    const sessionToken = await jwt.sign({ ...user }, process.env.JWT_SECRET, { expiresIn: '1 day' });
    console.log('sessiontoken', sessionToken);
    res.cookie('session', sessionToken, {
      httpOnly: true,
      maxAge: ONE_DAY,
    });
    console.log('cookie', req.cookies.session);
    res.send(user);
  })
  .delete('/', async (req, res) => {
    res.clearCookie(process.env.COOKIE_NAME);
    res.json({ success: true, message: 'Signed Out Succesfully' });
  });
