const db = require( '../connection' );

// Methods to Define
const ALL = `SELECT * FROM users`;
const GETEMAIL = `SELECT email FROM users WHERE email = $1`;
const GETUSERNAME = `SELECT username FROM users WHERE username = $1`;
const CREATEUSER = `INSERT INTO users ( username, password, profile_picture_path, total_score, email ) ` +
                   `VALUES ( $1, $2, $3, $4, $5 ) RETURNING *`;

module.exports = {
  all: () => db.any( ALL ),
  getOneByEmail:  ( email ) => db.oneOrNone( GETEMAIL, [ email ] ),
  getOneByUsername: ( username ) => db.oneOrNone( GETUSERNAME, [ username ] ),
  // Unsure about how long this is
  createUser: ( username, password, profile_picture_path, total_score, email ) => 
              db.one( CREATEUSER, [ username, password, profile_picture_path, total_score, email ] )
};