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

module.exports = {
  isEmailInUse:  ( email ) => db.one( GETEMAIL, [ email ] ),
  isUserNameInUse: ( username ) => db.one( GETUSERNAME, [ username ] ),
  getUserData: ( username ) => db.one( GETUSERDATA, [ username ] ),
  getUserId: ( username ) => db.one( GETUSERID, [ username ] ),
  // Error created - when a post request is made, "ReferenceError: isUserNameInUse is not defined
  //  at Object.create" is shown
  create: ( username, email, password, photo_path ) =>
          Promise.all( [ isEmailInUse( email ), isUserNameInUse( username )] 
                 .then( ([ emailUsed, usernameUsed ]) => {
                    console.log('a');
                    let errors = [];
                    if (emailInUse || userNameInUse) {
                      if (emailInUse) {
                        errors.push({msg: "Email address is already in use."});
                      }
                      if (userNameInUse) {
                        errors.push({msg: "Username is already in use."});
                      }
                      Promise.reject( errors );
                    } else {
                      bcrypt.hash(password, 10).then(hash => {
                        Promise.resolve(User.createUser( username, hash, photo_path, 0, email));
                      });
                    }
                 })),

  createUser: ( username, password, profile_picture_path, total_score, email ) => 
              db.one( CREATEUSER, [ username, password, profile_picture_path, 0, email ] )
};