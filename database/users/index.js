const db = require( '../connection' );
const bcrypt = require('bcrypt');

// Methods to Define
const ALL = `SELECT * FROM users`;
const GETEMAIL = `SELECT email FROM users WHERE email = $1`;
const GETUSERID = `SELECT id FROM users WHERE username = $1`;
const GETUSERNAME = `SELECT username FROM users WHERE username = $1`;
const GETUSERDATA = `SELECT * FROM users WHERE username = $1`;
const CREATEUSER = `INSERT INTO users ( username, password, profile_picture_path, total_score, email ) ` +
                   `VALUES ( $1, $2, $3, $4, $5 ) RETURNING *`;

// This code works with the commented out section in signup.js
// module.exports = {
//   all: () => db.any( ALL ),
//   isEmailInUse:  ( email ) => db.one( GETEMAIL, [ email ] ),
//   isUserNameInUse: ( username ) => db.one( GETUSERNAME, [ username ] ),
//   getUserData: ( username ) => db.one( GETUSERDATA, [ username ] ),
//   getUserId: ( username ) => db.one( GETUSERID, [ username ] ),
//   // Unsure about how long this is
//   createUser: ( username, password, profile_picture_path, total_score, email ) => 
//               db.one( CREATEUSER, [ username, password, profile_picture_path, total_score, email ] )
// };
let isEmailInUse = ( email ) => {
  return db.oneOrNone( GETEMAIL, [ email ] );
};

let isUserNameInUse = ( username ) => {
  return db.oneOrNone( GETUSERNAME, [ username ] );
};

let createUser = ( username, password, profile_picture_path, total_score, email ) => {
  db.one( CREATEUSER, [ username, password, profile_picture_path, 0, email ] );
};

module.exports = {
  getUserData: ( username ) => db.one( GETUSERDATA, [ username ] ),
  getUserId: ( username ) => db.one( GETUSERID, [ username ] ),
  create: ( username, email, password, photo_path ) =>
          Promise.all( [ isEmailInUse( email ), isUserNameInUse( username )] )
                 .then( ([ emailUsed, usernameUsed ]) => {
                    let errors = [];

                    if (emailUsed || usernameUsed) {
                      if (emailUsed) {
                        errors.push({msg: "Email address is already in use."});
                      }
                      if (usernameUsed) {
                        errors.push({msg: "Username is already in use."});
                      }
                      return errors;

                    } else {
                      bcrypt.hash(password, 10).then(hash => {
                        createUser( username, hash, photo_path, 0, email);
                        Promise.resolve();
                      });
                    }
                 })
};