/* eslint-disable import/no-unresolved */
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const db = require('./database');

// imports routes
const indexRouter = require('./routes/index');
const userRouter = require('./routes/users');
const paymentRouter = require('./routes/payments');

const app = express();

db.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database: ', err);
  });

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

// routes
app.use('/api/v1', indexRouter);
app.use('/api/v1', userRouter);
app.use('/api/v1', paymentRouter);

module.exports = app;
