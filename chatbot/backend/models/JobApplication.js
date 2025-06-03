const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^[a-zA-Z\s]+$/.test(v);
      },
      message: props => `${props.value} is not a valid name! Only alphabets are allowed.`
    }
  },
  email: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female', 'other']
  },
  qualification: {
    type: String,
    required: true
  },
  skills: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  resume: {
    type: String,
    required: true
  },
  applicationDate: {
    type: Date,
    default: Date.now
  },
  history: [{
    status: {
      type: String,
      enum: ['submitted', 'under_review', 'interviewed', 'rejected', 'accepted'],
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    notes: {
      type: String
    }
  }]
}, { 
  collection: 'job_applications',
  versionKey: false // This removes the __v field from documents
});

module.exports = mongoose.model('JobApplication', jobApplicationSchema, 'job_applications'); 

