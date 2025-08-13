// starting point for the app (dotenv + mysql + mongo)
const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();

// body parsing for forms
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// mysql connection (you put it under models/)
const mysqlPool = require('./models/mysqlConnection');

// mongo connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('mongo db connected'))
  .catch(err => console.error('mongo db connection error', err));

// routes
const studentRoutes     = require('./students');
const departmentsRoutes = require('./departments');
const lecturersRoutes   = require('./lecturers');
const gradesRoutes      = require('./grades');

app.use(studentRoutes);
app.use(departmentsRoutes);
app.use(lecturersRoutes);
app.use(gradesRoutes);

// home page  banner + 4 buttons
app.get('/', (req, res) => {
  res.type('html').send(`
    <html>
      <head>
        <title>DCWA Project</title>
      </head>
      <body style="font-family: Arial; margin: 0; padding: 0;">
        <div style="background-color: #cce6ff; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">G00422049</h1>
          <p style="margin: 5px 0;">Welcome to my Data Centric Web Applications Project</p>
        </div>
        <div style="max-width: 760px; margin: 30px auto; text-align: center;">
          <p>this app shows mysql + mongo together and small pass fail thing on grades. keeping it simple so i can demo it fast</p>
          <a href="/students"     style="display:inline-block; padding:10px 20px; margin:10px; background:#4da6ff; color:#fff; text-decoration:none; border-radius:5px;">View Students</a>
          <a href="/grades"       style="display:inline-block; padding:10px 20px; margin:10px; background:#4da6ff; color:#fff; text-decoration:none; border-radius:5px;">View Grades</a>
          <a href="/lecturers"    style="display:inline-block; padding:10px 20px; margin:10px; background:#4da6ff; color:#fff; text-decoration:none; border-radius:5px;">View Lecturers</a>
          <a href="/departments"  style="display:inline-block; padding:10px 20px; margin:10px; background:#4da6ff; color:#fff; text-decoration:none; border-radius:5px;">View Departments</a>
        </div>
      </body>
    </html>
  `);
});

// quick test mysql (optional keep)
app.get('/test-mysql', async (req, res) => {
  try {
    const [rows] = await mysqlPool.query('SELECT 1 + 1 AS result');
    res.send(`MySQL test result: ${rows[0].result}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('MySQL connection error');
  }
});

// port + start
const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
