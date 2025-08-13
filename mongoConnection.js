// mongo connection bit
const mongoose = require('mongoose');
require('dotenv').config();

async function connectMongo() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/dcwa');
    console.log('connected to mongo');
  } catch (err) {
    console.error('mongo connection error', err);
  }
}

module.exports = connectMongo;
