const db = require('../connection');

const CREATE_USER =
  `INSERT INTO users ( username, password, profile_picture_path, total_score, email ) ` +
  `VALUES ( $1, $2, $3, $4, $5 ) RETURNING *`;

const createUser = (
  username,
  password,
  profile_picture_path,
  total_score,
  email
) => {
  return db.one(CREATE_USER, [
    username,
    password,
    profile_picture_path,
    0,
    email
  ]);
};

module.exports = createUser;
