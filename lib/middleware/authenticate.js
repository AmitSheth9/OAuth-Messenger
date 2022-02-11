/* eslint-disable no-console */
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    const { session } = req.cookies;
    if (!session) throw new Error('You must be signed in');
    const user = jwt.verify(session, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    error.status = 401;
    next(error);
  }
};
