var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const uri = "mongodb+srv://HelpEasy:HelpEasy@cluster0.wvfmn6c.mongodb.net/?retryWrites=true&w=majority";
const mongoose = require('mongoose')
const cors = require('cors')
const app = express();

mongoose.connect(uri, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
}, (err) => {
  if (err) {
    console.log("error in connection");
  } else {
    console.log("mongodb is connected");
}});

var indexRouter = require('./routes/index');
const shelterRouter = require('./routes/shelterRouter')
const formRouter = require('./routes/formRouter')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
app.use('/', indexRouter)
app.use('/shelters', shelterRouter)
app.use('/requestforms', formRouter)

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
