// lecturer model  simple one for mongo
const mongoose = require('mongoose');

const Lecturer = mongoose.model(
  'Lecturer',
  new mongoose.Schema(
    {
      _id: String,                 // like L001
      name: { type: String, required: true },
      did: String                  // dept id like COM
    },
    { collection: 'lecturers', timestamps: true }
  )
);

module.exports = Lecturer;
