require('dotenv').config(); // Load environment variables from .env file

const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URI; // Get MongoDB URI from environment variable

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to the db'));

db.once('open', function () {
  console.log("Successfully connected to the Database");
});

module.exports = db;

