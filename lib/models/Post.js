const pool = require('../utils/pool');

module.exports = class Post {
  postId;
  message;
  githubId;
  createdAt;

  constructor(row) {
    this.postId = row.post_id;
    this.message = row.message;
    this.githubId = row.github_id;
    this.createdAt = row.created_at;
  }

  static async insertPost (message, githubId) {
    const { rows } = pool.query('INSERT INTO posts (message, github_id) VALUES ($1, $2) RETURNING *', [message, githubId]);

    return new Post(rows[0]);
  }

};
