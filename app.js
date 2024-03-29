var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var debug = require('debug')('borderguru-coding-test:app');

const dbConnection = require('./services/database-connection');

var index = require('./routes/index');
var orders = require('./routes/orders');
var companies = require('./routes/companies');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(async function(req, res, next) {
  const dbOptions = {
    uri: process.env.MONGO_URI
  };

  try {
    const client = await dbConnection.connect(dbOptions);

    if (client.isConnected()) {
      debug('db connection established');
      const db = dbConnection.getDb(process.env.DATABASE_NAME);
      // pass the collection and let the service module cache it
      const orderService = require('./services/order')(db.collection('orders'));
      const companyService = require('./services/company')(
        db.collection('companies')
      );
      res.locals.orderService = orderService;
      res.locals.companyService = companyService;
    }

    next();
  } catch (e) {
    debug('e', e);
    debug('connection is not established just yet');
  }
});

app.use('/', index);
app.use('/orders', orders);
app.use('/companies', companies);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
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

module.exports = app;
