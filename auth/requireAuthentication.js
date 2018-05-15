const requireAuthentication = (request, response, next) => {
  if (request.isAuthenticated()) {
    //DEBUG ADDED
    console.log('Is authenticated in requireAuthentication');
    return next();
  } else {
    //DEBUG ADDED
    console.log(
      'Is not authenticated in requireAuthentication. You should see a flash.'
    );
    request.flash('error_msg', 'You must login to access this page.');
    response.redirect('/login');
  }
};

const indexAuthentication = (request, response, next) => {
  if (request.isAuthenticated()) {
    //DEBUG ADDED
    console.log(
      'Is authenticated in indexAuthentication, you should be redirected to lobby.'
    );
    response.redirect('/lobby');
  } else {
    //DEBUG ADDED
    console.log(
      'Is not authenticated in indexAuthentication, you should see login page'
    );
    return next();
  }
};

module.exports = {
  requireAuthentication: requireAuthentication,
  indexAuthentication: indexAuthentication
};
