const mongoose = require('mongoose');

const tenderSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
 
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  qualification: [{ // Changed to lowercase
    type: String,
    required: true
  }],
  location: String,
  image: String, // Changed from urlencoded to String
  deadline: { // Changed to lowercase for consistency
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Tender = mongoose.model('Tender', tenderSchema);

module.exports = Tender;
