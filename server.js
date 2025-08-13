// starting point for the app (now with dotenv so we can hide configs)
const express = require('express');
require('dotenv').config(); // so we can use stuff from .env

const app = express();

// grabbing port from .env (or default 3000 if not there)
const PORT = process.env.PORT || 3000;

// home page route
app.get('/', (req, res) => {
  res.send('Hello from my DCWA project (now with env settings)');
});

// start the server
app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
