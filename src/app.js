/* eslint-disable import/no-unresolved */
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./database');

// imports routes
const indexRouter = require('./routes/index');
const userRouter = require('./routes/users');
const addressRouter = require('./routes/adresses');
const paymentRouter = require('./routes/payments');
const categoryRouter = require('./routes/categories');
const productRouter = require('./routes/products');
const searchRouter = require('./routes/search');
const saleRouter = require('./routes/sales');

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
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));

// routes
app.use('/api/v1', indexRouter);
app.use('/api/v1', userRouter);
app.use('/api/v1', addressRouter);
app.use('/api/v1', paymentRouter);
app.use('/api/v1', categoryRouter);
app.use('/api/v1', productRouter);
app.use('/api/v1', searchRouter);
app.use('/api/v1', saleRouter);

module.exports = app;
