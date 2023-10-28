const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const roomRouter = require('./routes/room');
const rentRouter = require('./routes/rent');
const mongoose = require('mongoose')

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/HotelDb').then(() => {
  console.log("mongodb connected.")
}).catch((err) => {
  console.log('mongodb connection error')
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session(({
  secret: 'sdaasdasgfdgdf55!',
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: new Date(253402300799999)
  }
})));

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
})

app.use('/', roomRouter)
app.use('/', authRouter)
app.use('/', indexRouter);
app.use('/', rentRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
