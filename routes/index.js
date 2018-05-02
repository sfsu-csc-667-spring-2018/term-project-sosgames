const express = require('express');
const router = express.Router();
const auth = require('../auth/requireAuthentication');

router.get('/', auth.indexAuthentication, (request, response, next) => {
  response.render('login', {
    title: 'UNO'
  });
});

module.exports = router;