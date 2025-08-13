// lecturers page first pass  keep it simple html
router.get('/lecturers', async (req, res) => {
  try {
    const lecturers = await Lecturer.find();

    // super plain page so i can see it quick
    res.type('html').send(`
  <html>
    <head><title>Lecturers</title></head>
    <body style="font-family: Arial; margin:0; padding:0;">
      <div style="background-color:#cce6ff; padding:16px; text-align:center;">
        <h1 style="margin:0;">Lecturers</h1>
      </div>

      <div style="max-width:760px; margin:24px auto;">
        <div style="margin-bottom:14px;">
          <a href="/" style="display:inline-block; padding:10px 16px; background:#e9f3ff; color:#0b72b9; text-decoration:none; border:1px solid #b9dcff; border-radius:6px;">Home</a>
        </div>

        <ul>
          ${lecturers.map(l => `<li style="margin:6px 0;">
            <strong>${l.name}</strong> — ${l._id} ${l.did ? `(dept ${l.did})` : ``}
          </li>`).join('')}
        </ul>
      </div>
    </body>
  </html>
`);

  } catch (err) {
    console.error('lecturers list err', err);
    res.status(500).send('mongo read failed');
  }
});
