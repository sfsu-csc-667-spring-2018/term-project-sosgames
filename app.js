const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const expressValidator = require('express-validator');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');

if (
  process.env.NODE_ENV === 'development' ||
  process.env.NODE_ENV === 'production'
) {
  require('dotenv').config();
}

const index = require('./routes/index');
const login = require('./routes/login');
const logout = require('./routes/logout');
const signup = require('./routes/signup');
const lobby = require('./routes/lobby');
const game = require('./routes/game');
const chat = require('./routes/chat');

const app = express();
app.io = require('./sockets');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(expressLayouts);

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.static(path.join(__dirname, 'public')));

app.enable('trust proxy');
app.use(
  session({
    store: new (require('connect-pg-simple')(session))(),
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secure: app.get('env') != 'development'
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((request, response, next) => {
  response.locals.isAuthenticated = request.isAuthenticated();
  next();
});

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

app.use(flash());

app.use(function(request, response, next) {
  response.locals.success_msg = request.flash('success_msg');
  response.locals.error_msg = request.flash('error_msg');
  response.locals.error = request.flash('error');
  response.locals.user = request.user || null;
  next();
});

app.use('/', index);
app.use('/login', login);
app.use('/logout', logout);
app.use('/signup', signup);
app.use('/lobby', lobby);
app.use('/game', game);
app.use('/chat', chat);

app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
