// starting point for the app
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello from my DCWA project');
});

app.listen(3000, () => {
  console.log('server running on port 3000');
});
