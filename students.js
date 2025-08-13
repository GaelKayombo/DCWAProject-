// student routes  mysql side
const express = require('express');
const router = express.Router();
const mysqlPool = require('./mysqlConnection');

// quick test to make sure mysql is good
router.get('/students-test', async (req, res) => {
  try {
    const [rows] = await mysqlPool.query('SELECT sid, name, age FROM student ORDER BY sid LIMIT 5');
    res.json(rows); // just dump it so i can see
  } catch (err) {
    console.error('students-test err', err);
    res.status(500).send('mysql read failed');
  }
});

// students page first pass  keep it simple html
router.get('/students', async (req, res) => {
  try {
    const [rows] = await mysqlPool.query(
      'SELECT sid, name, age FROM student ORDER BY sid ASC'
    );

    // super plain page so i can see it quick
    res.type('html').send(`
  <html>
    <head><title>Students</title></head>
    <body style="font-family: Arial; margin:0; padding:0;">
      <div style="background-color:#cce6ff; padding:16px; text-align:center;">
        <h1 style="margin:0;">Students</h1>
      </div>

      <div style="max-width:760px; margin:24px auto;">
        <div style="margin-bottom:14px;">
          <a href="/students/add" style="display:inline-block; padding:10px 16px; background:#4da6ff; color:#fff; text-decoration:none; border-radius:6px;">Add Student</a>
          <a href="/" style="display:inline-block; padding:10px 16px; margin-left:8px; background:#e9f3ff; color:#0b72b9; text-decoration:none; border:1px solid #b9dcff; border-radius:6px;">Home</a>
        </div>

        <ul>
          ${rows.map(r => `<li style="margin:6px 0;"><strong>${r.name}</strong> — ${r.sid}, age ${r.age}
            <a href="/students/edit/${r.sid}" style="margin-left:8px; text-decoration:none; color:#0b72b9;">edit</a>
          </li>`).join('')}
        </ul>
      </div>
    </body>
  </html>
`);

  } catch (err) {
    console.error('students list err', err);
    res.status(500).send('mysql read failed');
  }
});

// add student form
router.get('/students/add', (req, res) => {
res.type('html').send(`
  <html>
    <head>
      <title>Students</title>
    </head>
    <body style="font-family: Arial; max-width: 760px; margin: 30px auto">
      <div style="background-color: #0073e6; color: white; padding: 10px; text-align: center; font-size: 1.2em;">
        DCWA Project — G00422049
      </div>

      <h1>Students</h1>
      <ul>
        ${rows.map(r => `<li><strong>${r.name}</strong> — ${r.sid}, age ${r.age}</li>`).join('')}
      </ul>
      <p><a href="/">Home</a></p>
    </body>
  </html>
`);
});

// save new student
router.post('/students/add', async (req, res) => {
  const { name = '', age = '' } = req.body;
  const ageNum = Number(age);

  if (!name.trim() || Number.isNaN(ageNum)) {
    return res.status(400).send('invalid data fam');
  }

  try {
    await mysqlPool.query(
      'INSERT INTO student (name, age) VALUES (?, ?)',
      [name.trim(), ageNum]
    );
    res.redirect('/students');
  } catch (err) {
    console.error('add student err', err);
    res.status(500).send('mysql insert fail');
  }
});


module.exports = router;
