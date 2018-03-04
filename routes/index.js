exports.home = function(request, response){

    response.render('home', {
        title : "Landing Page for the 667 UNO game"
    });
};

exports.signIn = function(request, response){

    response.render('signIn', {
        title : "SignIn page"
    });
};


exports.notFound =  function(request, response){
    response.send("this is not the page you are looking for. 404");
};