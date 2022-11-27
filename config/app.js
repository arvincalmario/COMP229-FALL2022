var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
let compress = require('compression');
let bodyParser = require('body-parser');
let methodOverride = require('method-override');
let passport = require('passport');
let cors = require('cors');

var indexRouter = require('../routes/index');
var usersRouter = require('../routes/users');
var inventoryRouter = require('../routes/inventory');

var app = express();

// Enable cors
app.use(cors());
app.options('*', cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Sets up passport
app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/inventory', inventoryRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404, "Endpoint not found."));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
  res.json(
    {
      success: false,
      message: err.message
    }
  )
});

module.exports = app;
