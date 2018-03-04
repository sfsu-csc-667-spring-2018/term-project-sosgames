var express = require('express');

var app = express();

var routes = require('./routes');

app.set('view engine', 'ejs');

// var path = require('path');
// app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.home);

app.get('/register', routes.register);

app.get('/login', routes.login);

app.get('*', routes.notFound);


// Listen on port 3000
app.listen(3000,function () {
    console.log("server started on port 3000")
});