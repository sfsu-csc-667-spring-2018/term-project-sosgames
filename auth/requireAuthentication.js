const requireAuthentication = (request, response, next) => {
  if (request.isAuthenticated()) {
    return next();
  } else {
    request.flash('error_msg', "You must login to access this page.");
    response.redirect('/login');
  }
};
// We must implement isAuthenticated

module.exports = requireAuthentication;