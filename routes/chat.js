const express = require('express');
const router = express.Router();

router.post('/', (request, response, next) => {
  const { message } = request.body;
  // const user = request.user;
  // above breaks atm
  const user = 'username';

  request.app.io.of('lobby').emit('message', { user, message });

  response.sendStatus(200);
});

module.exports = router;
