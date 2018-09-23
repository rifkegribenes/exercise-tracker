const express = require('express');
const app = express();
const middleware = require('./middleware');
app.use(middleware);

const dotenv = require('dotenv').load();

// connect to db
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const configDB = require('./app/config/database.js');
mongoose.connect(configDB.url, configDB.options);
mongoose.Promise = global.Promise;

// routes ======================================================================
const router = require('./router');
router(app);

app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


// Not found middleware
app.use((req, res, next) => {
  return next({status: 404, message: 'not found'});
});

// Error Handling middleware
app.use((err, req, res, next) => {
  let errCode, errMessage;

  if (err.errors) {
    // mongoose validation error
    errCode = 400; // bad request
    const keys = Object.keys(err.errors);
    // report the first validation error
    errMessage = err.errors[keys[0]].message;
  } else {
    // generic or custom error
    errCode = err.status || 500;
    errMessage = err.message || 'Internal Server Error';
  }
  res.status(errCode).type('txt')
    .send(errMessage);
});


// launch ======================================================================
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Node.js listening on port ${port}...`));
