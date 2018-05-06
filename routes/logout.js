const express = require('express');
const router = express.Router();

// This doesn't work as intended. Clears cookie but I feel like it needs work
router.get('/', (request, response, next) => {
  request.logout();

  request.session.destroy(() => {
    response.clearCookie('io');
    response.clearCookie('connect.sid');
    response.redirect('/');
  });
});

module.exports = router;
