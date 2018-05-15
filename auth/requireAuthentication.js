const requireAuthentication = (request, response, next) => {
  if (request.isAuthenticated()) {
    //DEBUG ADDED
    console.log('Is authenticated');
    return next();
  } else {
    //DEBUG ADDED
    console.log('Is notauthenticated');
    request.flash('error_msg', 'You must login to access this page.');
    response.redirect('/login');
  }
};

const indexAuthentication = (request, response, next) => {
  if (request.isAuthenticated()) {
    //DEBUG ADDED
    console.log('Is authenticated');
    response.redirect('/lobby');
  } else {
    //DEBUG ADDED
    console.log('Is not authenticated');
    return next();
  }
};

module.exports = {
  requireAuthentication: requireAuthentication,
  indexAuthentication: indexAuthentication
};
