/* eslint-disable no-console */
const getToken = async (code) => {
  console.log(`MOCK INVOKED: getToken(${code})`);
  return `MOCK_TOKEN_FOR_CODE_${code}`;
};

const getProfile = async (token) => {
  console.log(`MOCK INVOKED: getProfile(${token})`);
  return {
    login: 'fake_login',
    email: 'a@a.com',
    avatar_url: null,
  };
};

module.exports = { getToken, getProfile };
