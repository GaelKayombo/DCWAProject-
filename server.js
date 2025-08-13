// starting point for the app (dotenv + MySQL connected)
const express = require('express');
require('dotenv').config();

const app = express();

// import mysql connection
const mysqlPool = require('./mysqlConnection');

// mongo db connection
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('mongo db connected'))
  .catch(err => console.error('mongo db connection error', err));

// port from env or default
const PORT = process.env.PORT || 3000;

// home page route
app.get('/', (req, res) => {
  res.send('Hello from my DCWA project (MySQL now connected)');
});

// quick test route to see if MySQL works
app.get('/test-mysql', async (req, res) => {
  try {
    const [rows] = await mysqlPool.query('SELECT 1 + 1 AS result');
    res.send(`MySQL test result: ${rows[0].result}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('MySQL connection error');
  }
});

// start the server
app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
