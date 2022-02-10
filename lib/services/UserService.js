const { getToken, getProfile } = require('../utils/oauth-utils');
const GithubUser = require('../models/GithubUser');

module.exports = class UserService {

  static async authorizeAndInsert(code) {
    const token = await getToken(code);
    const { login, email, avatar } = await getProfile(token);
    let user = await GithubUser.findUsername(login);
    if(!user) {
      user = await GithubUser.createUser(login, email, avatar);
    }
    return user;
  }
};
