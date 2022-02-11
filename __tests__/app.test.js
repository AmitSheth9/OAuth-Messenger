/* eslint-disable no-console */
const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

const agent = request.agent(app);
jest.mock('../lib/utils/oauth-utils');

describe('backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should redirect to github oauth page', async () => {
    const req = await request(app).get('/api/v1/github/login');

    expect(req.header.location).toMatch(/https:\/\/github.com\/login\/oauth\/authorize\?client_id=[\w\d]+&redirect_uri=http:\/\/localhost:7890\/api\/v1\/github\/login\/callback&scope=user/i);
  });
  it('should log the user in', async () => {
    const req = await request
      .agent(app)
      .get('/api/v1/github/login/callback?code=15');

    expect(req.body).toEqual({
      id: expect.any(String),
      username: 'fake_login',
      email: 'a@a.com',
      avatar: null,
    });
  });
  it('logs a user out', async() => {
    const res = await agent.delete('/api/v1/github');
    console.log(res);
    expect(res.body).toEqual({ success: true, message: 'Signed Out Succesfully' });
  });
  it('should post a message if authenticated', async () => {
    await agent.get('/api/v1/github/login/callback?code=15');
    const res = await agent
      .post('/api/v1/posts')
      .send({
        message: 'test',
        github_id: 1,
      });
  
    expect(res.body).toEqual({
      postId: expect.any(String),
      message: 'test',
      githubId: expect.any(String),
      createdAt: expect.any(String),
    });
  });
  it('should get all posts if authenticated', async () => {
    await agent.get('/api/v1/github/login/callback?code=15');
    const post = await agent.post('/api/v1/posts').send({ message: 'test get all messages' });
    console.log(post.body);
    const res = await agent.get('/api/v1/posts');

    expect(res.body).toEqual([{
      postId: expect.any(String),
      message: 'test get all messages',
      createdAt: expect.any(String),
      username: 'fake_login'
    }]);
  });
});
