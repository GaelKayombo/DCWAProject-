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

module.exports = router;
