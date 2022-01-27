// optionally, we can destructure the Sequelize class
// with additional vscode type support
const Sequelize = require('sequelize');

const DB_NAME = 'instagram-clone';
const CONNECTION_STRING = `postgres://localhost:5432/${
  process.env.DATABASE_NAME || DB_NAME
}`;

const db = new Sequelize(CONNECTION_STRING);

module.exports = { db };
