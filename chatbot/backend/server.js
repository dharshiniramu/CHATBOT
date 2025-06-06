const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 5000;

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
mongoose.connect('mongodb+srv://mahaashri:Mahaa%40123@chatbot.iagvzxg.mongodb.net/chatbotDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Configure multer for file uploads

const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({ storage });


// --------------------
// Intern Schema
// --------------------
const InternSchema = new mongoose.Schema({
  name: String,
  email: String,
  qualification: String,
  skills: String,
  college: String,
  position: String,
  resume: {
    data: Buffer,
    contentType: String
  }
});
const Intern = mongoose.model('intern_applications', InternSchema);


// --------------------
// Job Schema
// --------------------
const JobSchema = new mongoose.Schema({
  name: String,
  email: String,
  qualification: String,
  skills: String,
  college: String,
  position: String,
  resume: String
});
const Job = mongoose.model('job_applications', JobSchema);

// --------------------
// Client Schema
// --------------------
const ClientSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  industry: String,
  volume: Number,
  projection: String,
  crowdSourcing: String,
  startDate: String,
  sampleData: String
});

const Client = mongoose.model('client_submissions', ClientSchema);


// --------------------
// Routes
// --------------------

// Intern Application
app.post('/apply', upload.single('resume'), async (req, res) => {
  try {
    const intern = new Intern({
      ...req.body,
      resume: req.file ? {
        data: req.file.buffer,
        contentType: req.file.mimetype
      } : null
    });
    await intern.save();
    res.status(200).send({ message: 'Intern application submitted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server Error' });
  }
});
app.get('/resume/:id', async (req, res) => {
  try {
    const intern = await Intern.findById(req.params.id);
    if (!intern || !intern.resume) {
      return res.status(404).send('No resume found');
    }
    res.set('Content-Type', intern.resume.contentType);
    res.send(intern.resume.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});


// Job Application
app.post('/job-apply', upload.single('resume'), async (req, res) => {
  try {
    const job = new Job({
      ...req.body,
      resume: req.file ? req.file.filename : null
    });
    await job.save();
    res.status(200).send({ message: 'Job application submitted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server Error' });
  }
});

// Client Form Submission
app.post('/client-submit', async (req, res) => {
  try {
    const client = new Client(req.body);
    await client.save();
    res.status(200).send({ message: 'Client form submitted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server Error' });
  }
});


app.listen(port, () => console.log(`Server running on port ${port}`));
