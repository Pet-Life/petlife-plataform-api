const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api', (req, res) =>
  res.json({ success: true, message: 'Hello World' })
);

module.exports = app;
