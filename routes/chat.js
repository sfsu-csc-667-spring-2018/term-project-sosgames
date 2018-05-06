const express = require('express');
const router = express.Router();
const auth = require('../auth/requireAuthentication');

router.post('/', (request, response, next) => {
  const { message } = request.body;
  const user = request.user.username;

  request.app.io.of('lobby').emit('message', { user, message });

  response.sendStatus(200);
});

module.exports = router;
