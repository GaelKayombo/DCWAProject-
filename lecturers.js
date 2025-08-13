// lecturers page first pass  keep it simple html
router.get('/lecturers', async (req, res) => {
  try {
    const lecturers = await Lecturer.find();

    // super plain page so i can see it quick
    res.type('html').send(`
      <html>
        <head><title>Lecturers</title></head>
        <body style="font-family: Arial; max-width: 760px; margin: 30px auto">
          <h1>Lecturers</h1>
          <ul>
            ${lecturers.map(l => `<li><strong>${l.name}</strong> — ${l._id}, dept ${l.did}</li>`).join('')}
          </ul>
          <p><a href="/">Home</a></p>
        </body>
      </html>
    `);
  } catch (err) {
    console.error('lecturers list err', err);
    res.status(500).send('mongo read failed');
  }
});
