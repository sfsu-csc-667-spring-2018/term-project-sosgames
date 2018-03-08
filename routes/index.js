exports.home = function(request, response){
    response.render('home', {
        title : "Landing Page for the 667 UNO game"
    });
};

exports.register = function(request, response){
    response.render('register', {
        title : "Registration"
    });
};

exports.login = function(request, response){
    response.render('login', {
        title : "Login"
    });
};

exports.notFound =  function(request, response){
    response.send("this is not the page you are looking for. 404");
};