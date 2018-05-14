const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const expressValidator = require('express-validator');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash'); // Might delete
// const LocalStrategy = require('passport-local').Strategy;

const { Cards, Games, UsersGames, GamesCards } = require('./database');

// Make use of environment variables defined in .env
if (
  process.env.NODE_ENV === 'development' ||
  process.env.NODE_ENV === 'production'
) {
  require('dotenv').config();
}

// Routers
const index = require('./routes/index');
const users = require('./routes/users'); // TODO: rm? or use this to include login, logout, signup?
const login = require('./routes/login');
const logout = require('./routes/logout');
const signup = require('./routes/signup');
const lobby = require('./routes/lobby');
const game = require('./routes/game');
const tests = require('./routes/tests'); // TODO: rm?
const chat = require('./routes/chat');

const app = express();
app.io = require('./sockets');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(expressLayouts);

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET)); // DEBUG - Set secret to encrypt cookie
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(
  session({
    store: new (require('connect-pg-simple')(session))(),
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secure: app.get('env') != 'development'
    } // 30 days
  })
);

// Passport Initialize
app.use(passport.initialize());
app.use(passport.session());
// Helps dynamically create navbar
app.use((request, response, next) => {
  response.locals.isAuthenticated = request.isAuthenticated();
  next();
});

// Express Validator - Taken from Middleware Options on Github
app.use(
  expressValidator({
    errorFormatter: function(param, msg, value) {
      let namespace = param.split('.'),
        root = namespace.shift(),
        formParam = root;

      while (namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }

      return {
        param: formParam,
        msg: msg,
        value: value
      };
    }
  })
);

// Connect Flash
app.use(flash());

// Global Variables for Flash Messages
app.use(function(request, response, next) {
  response.locals.success_msg = request.flash('success_msg');
  response.locals.error_msg = request.flash('error_msg');
  response.locals.error = request.flash('error');
  response.locals.user = request.user || null;
  next();
});

// Middleware for routes
app.use('/', index);
app.use('/users', users); // TODO: rm? or use this to include login, logout, signup?
app.use('/login', login);
app.use('/logout', logout);
app.use('/signup', signup);
app.use('/lobby', lobby);
app.use('/game', game);
app.use('/chat', chat);
app.use('/tests', tests); // TODO: rm?

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// GamesCards.getCardInDeck(1)
//   .then( cardData => {
//     console.log(cardData);
//   });

// for(i = 0; i < 108; i++){
//   GamesCards.changeInDeck(true,1,i);
// }

GamesCards.draw(1, 1, 2)
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.log(error);
  });

// GamesCards.findCardById(1,1)
//   .then(card => {
//     console.log(card);
//   })

module.exports = app;
