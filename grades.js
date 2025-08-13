// grades page mysql side
const express = require('express');
const router = express.Router();
const mysqlPool = require('./mysqlConnection');

// tiny helper for colouring
function passFailTag(score) {
  if (score == null || Number.isNaN(Number(score))) return '';
  return Number(score) < 40
    ? '<span style="color:#b52828;font-weight:700">FAIL</span>'
    : '<span style="color:#257a3e;font-weight:700">PASS</span>';
}

// list grades per student  keep it simple html
router.get('/grades', async (req, res) => {
  try {
    // students by name so it reads nice
    const [students] = await mysqlPool.query(
      'SELECT sid, name FROM student ORDER BY name ASC'
    );

    // join grades + modules  left join to keep students with no grades
    const [rows] = await mysqlPool.query(`
      SELECT s.sid, s.name AS studentName, m.name AS moduleName, g.grade
      FROM student s
      LEFT JOIN grade g ON g.sid = s.sid
      LEFT JOIN module m ON m.mid = g.mid
      ORDER BY s.name ASC, g.grade ASC
    `);

    // group grades by sid
    const bySid = new Map();
    for (const s of students) bySid.set(s.sid, []);
    for (const r of rows) {
      if (r.moduleName && r.grade !== null) {
        bySid.get(r.sid).push({ module: r.moduleName, grade: r.grade });
      }
    }

    // render super plain page
    const listHtml = students.map(s => {
      const items = bySid.get(s.sid);
      if (!items || items.length === 0) {
        return `<li><strong>${s.name}</strong></li>`;
      }
      const line = items
        .map(x => `${x.module}: ${x.grade} ${passFailTag(x.grade)}`)
        .join(', ');
      return `<li><strong>${s.name}</strong> — ${line}</li>`;
    }).join('');

   res.type('html').send(`
  <html>
    <head><title>Grades</title></head>
    <body style="font-family: Arial; margin:0; padding:0;">
      <div style="background-color:#cce6ff; padding:16px; text-align:center;">
        <h1 style="margin:0;">Grades</h1>
      </div>

      <div style="max-width:760px; margin:24px auto;">
        <div style="margin-bottom:14px;">
          <a href="/" style="display:inline-block; padding:10px 16px; background:#e9f3ff; color:#0b72b9; text-decoration:none; border:1px solid #b9dcff; border-radius:6px;">Home</a>
        </div>

        <ul>${listHtml}</ul>
      </div>
    </body>
  </html>
`);
  } catch (err) {
    console.error('grades page err', err);
    res.status(500).send('mysql read failed');
  }
});

module.exports = router;
