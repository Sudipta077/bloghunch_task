const { password } = require('pg/lib/defaults');
const pool = require('../config/db');

const createUser = async (email, password) => {
  const query = 'INSERT INTO person (email, password) VALUES ($1, $2) RETURNING *';
  const values = [email, password];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

module.exports = {
  createUser
};
