/* eslint-disable no-console */
const fetch = require('cross-fetch');

const getToken = async (code) => {
  const tokenReq = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code,
    }),

  });
  const { access_token } = await tokenReq.json();
  return access_token;
};

const getProfile = async (token) => {
  const profileReq = await fetch('https://api/github.com/user', {
    headers: {
      Accept: 'application/json',
      Authorization: `token ${token}`,
    },
  });
  const profile = await profileReq.json();
  console.log(profile);
  return profile;
};

module.exports = { getToken, getProfile };
