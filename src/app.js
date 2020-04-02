const express = require('express');
const db = require('./database');

const app = express();

db.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database: ', err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api', (req, res) =>
  res.json({ success: true, message: 'Hello World' })
);

module.exports = app;
