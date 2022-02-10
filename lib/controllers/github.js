/* eslint-disable no-console */
const { Router } = require('express');
const { getToken, getProfile } = require('../utils/oauth-utils');
const jwt = require('jsonwebtoken');

module.exports = Router()
  .get('/login', async (req, res) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&scope=user`);
  })
  .get('/login/callback', async (req, res) => {
    console.log(req.query.code);
    const token = await getToken(req.query.code);
    console.log('got token', token);
    const profile = await getProfile(token);
    console.log(profile);
    res.send('send');



    
  });
