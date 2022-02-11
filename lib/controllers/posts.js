/* eslint-disable no-console */
const { Router } = require('express');
const Post = require('../models/Post');
const authenticate = require('../middleware/authenticate');


module.exports = Router()
  .post('/', authenticate, async (req, res) => {
    const { message } = req.body;
    const githubId = req.user.id;
    console.log(message, githubId);
    const returned = await Post.insertPost(message, githubId);
    res.send(returned);
  })
  .get('/', authenticate, async (req, res) => {
    const posts = await Post.getAllPosts();
    console.log('allposts', posts);
    res.send(posts);
  });
