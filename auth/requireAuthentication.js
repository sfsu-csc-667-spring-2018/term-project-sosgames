const requireAuthentication = (request, response, next) => {
  if (request.isAuthenticated()) {
    return next();
  } else {
    request.flash('error_msg', 'You must login to access this page.');
    response.redirect('/login');
  }
};

const indexAuthentication = (request, response, next) => {
  if (request.isAuthenticated()) {
    response.redirect('/lobby');
  } else {
    return next();
  }
};

module.exports = {
  requireAuthentication: requireAuthentication,
  indexAuthentication: indexAuthentication
};
