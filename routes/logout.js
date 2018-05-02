const express = require('express');
const router = express.Router();

// This doesn't work as intended. Clears cookie but I feel like it needs work
router.get('/', (request, response, next) => {
  if (request.cookies) {
    response.clearCookie('user_id');
    response.redirect('/login');
  }
});

module.exports = router;
