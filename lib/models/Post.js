/* eslint-disable no-console */
const pool = require('../utils/pool');

module.exports = class Post {
  postId;
  message;
  githubId;
  createdAt;
  username;

  constructor(row) {
    this.postId = row.post_id;
    this.message = row.message;
    this.githubId = row.github_id;
    this.createdAt = row.created_at;
    this.username = row.username;
  }

  static async insertPost (message, githubId) {
    const username = await pool.query(`SELECT username FROM github_users
    LEFT JOIN posts
    ON github_users.id = posts.github_id
    WHERE github_id=$1`, [githubId]);
    console.log('usernamePost', username.rows[0]);

    const { rows } = await pool.query('INSERT INTO posts (message, github_id) VALUES ($1, $2) RETURNING *', [message, githubId]);
    console.log('rows', rows);
    const row = rows[0];
    console.log('row', row);
    const postData = { ...row, ...username.rows[0] };
    console.log('postData', postData);
    return new Post(postData);
  }

  static async getAllPosts () {
    const { rows } = await pool.query(`
    SELECT post_id, message, created_at, github_users.username 
    FROM posts
    LEFT JOIN github_users
    ON posts.github_id = github_users.id`);
    console.log(rows);

    return rows.map((row) => new Post(row));
  }

};
