const mongoose = require('mongoose');

// Define the schema for users
const userSchema = new mongoose.Schema({
  // Username of the user (unique and required)
  username: {
    type: String,
    required: true,
    unique: true
  },
  // Password of the user (required)
  password: {
    type: String,
    required: true,
  },
  // Name of the user (required)
  name: {
    type: String,
    required: true,
  },
  // Type of the user (e.g., Doctor, Patient, etc.) (required)
  type: {
    type: String,
    required: true,
  },
  // Array of references to reports created by the user
  reports: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reports', // Refers to the Reports model
    }
  ]
}, {
  timestamps: true // Automatically add createdAt and updatedAt fields
});

// Create a model based on the user schema
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;
