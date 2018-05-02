const requireAuthentication = (request, response, next) => {
  if (request.isAuthenticated()) {
    return next();
  } else {
    response.redirect('/login');
  }
};

module.exports = requireAuthentication;
