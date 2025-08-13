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
    <body style="font-family: Arial; margin:0; padding:0;">
      <div style="background-color:#cce6ff; padding:16px; text-align:center;">
        <h1 style="margin:0;">Departments</h1>
      </div>

      <div style="max-width:760px; margin:24px auto;">
        <div style="margin-bottom:14px;">
          <a href="/" style="display:inline-block; padding:10px 16px; background:#e9f3ff; color:#0b72b9; text-decoration:none; border:1px solid #b9dcff; border-radius:6px;">Home</a>
        </div>

        <ul>
          ${rows.map(r => `<li style="margin:6px 0;"><strong>${r.name}</strong> — ${r.did}</li>`).join('')}
        </ul>
      </div>
    </body>
  </html>
`);

  } catch (err) {
    console.error('departments list err', err);
    res.status(500).send('mysql read failed');
  }
});

module.exports = router;
