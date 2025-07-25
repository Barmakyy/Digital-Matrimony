const mongoose = require('mongoose');

const witnessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true }
}, { _id: false });

const documentSchema = new mongoose.Schema({
  type: { type: String, required: true },
  url: { type: String, required: true }
}, { _id: false });

const marriageApplicationSchema = new mongoose.Schema({
  applicant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  spouse1: {
    name: { type: String, required: true },
    dob: { type: Date, required: true },
    address: { type: String, required: true }
  },
  spouse2: {
    name: { type: String, required: true },
    dob: { type: Date, required: true },
    address: { type: String, required: true }
  },
  witnesses: [witnessSchema],
  documents: [documentSchema],
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  officer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  scheduledDate: { type: Date },
  certificateUrl: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MarriageApplication', marriageApplicationSchema); 