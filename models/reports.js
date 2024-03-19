const mongoose = require('mongoose');

// Define the schema for reports
const reportSchema = new mongoose.Schema({
  // Reference to the user who created the report
  createdByDoctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Refers to the User model
  },
  // Reference to the patient for whom the report is created
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Refers to the User model
  },
  // Status of the report, with enum validation
  status: {
    type: String,
    required: true,
    enum: ['Negative', 'Travelled-Quarantine', 'Symptoms-Quarantine', 'Positive-Admit']
  },
  // Date when the report was created
  date: {
    type: Date,
    required: true,
  }
}, {
  timestamps: true // Automatically add createdAt and updatedAt fields
});

// Create a model based on the report schema
const Reports = mongoose.model('Reports', reportSchema);

// Export the Reports model
module.exports = Reports;
