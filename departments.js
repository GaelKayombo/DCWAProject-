// department routes  mysql side
const express = require('express');
const router = express.Router();
const mysqlPool = require('./mysqlConnection');

// quick test to make sure mysql is good for departments
router.get('/departments-test', async (req, res) => {
  try {
    const [rows] = await mysqlPool.query('SELECT did, name FROM department ORDER BY did LIMIT 5');
    res.json(rows); // just dump it so i can see
  } catch (err) {
    console.error('departments-test err', err);
    res.status(500).send('mysql read failed for departments');
  }
});


// departments page first pass
router.get('/departments', async (req, res) => {
  try {
    const [rows] = await mysqlPool.query(
      'SELECT did, name FROM department ORDER BY did ASC'
    );

    // super plain page so i can see it quick
    res.type('html').send(`
      <html>
        <head><title>Departments</title></head>
        <body style="font-family: Arial; max-width: 760px; margin: 30px auto">
          <h1>Departments</h1>
          <ul>
            ${rows.map(r => `<li><strong>${r.name}</strong> — ${r.did}</li>`).join('')}
          </ul>
          <p><a href="/">Home</a></p>
        </body>
      </html>
    `);
  } catch (err) {
    console.error('departments list err', err);
    res.status(500).send('mysql read failed');
  }
});

module.exports = router;
