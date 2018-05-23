const express = require('express');
const router = express.Router();

router.get('/', (request, response, next) => {
  request.logout();

  request.session.destroy(() => {
    response.clearCookie('io');
    response.clearCookie('connect.sid');
    response.redirect('/');
  });
});

module.exports = router;
