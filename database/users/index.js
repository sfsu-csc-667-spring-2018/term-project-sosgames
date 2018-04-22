const db = require( '../connection' );

// Methods to Define
const ALL = `SELECT * FROM users`;
const GETEMAIL = `SELECT email FROM users WHERE email = $1`;
const GETUSERNAME = `SELECT username FROM users WHERE username = $1`;
const CREATEUSER = `INSERT INTO users ( username, password, profile_picture_path, total_score, email ) ` +
                   `VALUES ( $1, $2, $3, $4, $5 ) RETURNING *`;

module.exports = {
  all: () => db.any( ALL ),
  isEmailInUse:  ( email ) => db.oneOrNone( GETEMAIL, [ email ] ),
                                // .then( result => {
                                //   if ( !result ) {
                                //     return false;
                                //   } else {
                                //     return true;
                                //   }
                                // })
                                // .catch( error => true ),
                                
  getOneByUsername: ( username ) => db.oneOrNone( GETUSERNAME, [ username ] ),
  // Unsure about how long this is
  createUser: ( username, password, profile_picture_path, total_score, email ) => 
              db.one( CREATEUSER, [ username, password, profile_picture_path, total_score, email ] )
};


// module.exports = {
//   isEmailInUse: email => db.one("SELECT COUNT(*) FROM users WHERE email=$1", email).then( result => result === 1).catch( error => true )
// }