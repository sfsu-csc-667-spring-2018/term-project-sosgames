const express = require('express');
const router = express.Router();

// This doesn't work as intended. Clears cookie but I feel like it needs work
router.get('/', (request, response, next ) => {
  if( request.cookies.user_id ) {
    response.clearCookie('user_id');
    request.flash('success_msg', "You've successfully logged out.");
    response.redirect('/login');
  }
});

module.exports = router;