const express = require('express');
const router = express.Router();

// This doesn't work as intended. Clears cookie but I feel like it needs work
router.get('/', (request, response, next) => {
  if (request.isAuthenticated()) {
    request.logout();
    // response.clearCookie('user_id');
    // response.clearCookie('username');
    request.flash('success_msg', "You've successfully logged out.");
    response.redirect('/login');
  }
});

module.exports = router;
