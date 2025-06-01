const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const JobApplication = require('../models/JobApplication.js');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    // Sanitize filename
    const uniqueName = Date.now() + '-' + file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  // Accept only certain file types
  const allowedTypes = ['.pdf', '.doc', '.docx'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF, DOC, and DOCX files are allowed.'));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// POST /api/job-applications/apply
router.post('/apply', upload.single('resume'), async (req, res) => {
  try {
    console.log('=== Starting Job Application Submission ===');
    console.log('Request body:', req.body);
    
    if (!req.file) {
      console.error('Resume file is missing');
      return res.status(400).json({ error: 'Resume file is required' });
    }
    
    console.log('File details:', {
      filename: req.file.filename,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      path: req.file.path
    });

    // Validate required fields
    const requiredFields = ['name', 'email', 'gender', 'qualification', 'skills', 'experience', 'position'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      console.error('Missing required fields:', missingFields);
      return res.status(400).json({ 
        error: 'Missing required fields', 
        details: `Missing fields: ${missingFields.join(', ')}` 
      });
    }

    // Create new application
    const newApplication = new JobApplication({
      name: req.body.name,
      email: req.body.email,
      gender: req.body.gender,
      qualification: req.body.qualification,
      skills: req.body.skills,
      experience: req.body.experience,
      position: req.body.position,
      resume: req.file.filename, // Store just the filename
      history: [{
        status: 'submitted',
        timestamp: new Date(),
        notes: 'Application submitted'
      }]
    });

    console.log('Created application object:', JSON.stringify(newApplication.toObject(), null, 2));

    // Validate the document
    const validationError = newApplication.validateSync();
    if (validationError) {
      console.error('Mongoose validation error:', validationError);
      return res.status(400).json({
        error: 'Validation error',
        details: Object.values(validationError.errors).map(err => err.message).join(', ')
      });
    }

    console.log('Validation passed, attempting to save...');

    try {
      const savedApplication = await newApplication.save();
      console.log('Application saved successfully:', {
        id: savedApplication._id,
        name: savedApplication.name,
        email: savedApplication.email,
        resume: savedApplication.resume
      });
      
      res.status(201).json({ 
        message: 'Application submitted successfully',
        applicationId: savedApplication._id 
      });
    } catch (saveError) {
      console.error('MongoDB save error:', {
        name: saveError.name,
        message: saveError.message,
        code: saveError.code,
        stack: saveError.stack
      });
      throw saveError;
    }

  } catch (err) {
    console.error('=== Job Application Error ===');
    console.error('Error type:', err.name);
    console.error('Error message:', err.message);
    console.error('Error code:', err.code);
    console.error('Stack trace:', err.stack);
    
    // Clean up uploaded file if save failed
    if (req.file) {
      try {
        fs.unlinkSync(req.file.path);
        console.log('Cleaned up uploaded file:', req.file.path);
      } catch (unlinkError) {
        console.error('Error cleaning up file:', unlinkError);
      }
    }

    res.status(500).json({ 
      error: 'Error submitting application',
      details: err.message
    });
  }
});

module.exports = router;
