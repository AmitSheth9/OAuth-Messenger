const { Router } = require('express');

module.exports = Router()
  .post('/', async (req, res) => {
    const { message } = req.body;
    const { githubId} = req.user.id;

  });
