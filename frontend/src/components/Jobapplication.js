import React, { useState } from 'react';
import './jobapplication.css';  // Make sure to save your CSS here

const bgImageUrl = 'job_bg.jpg'; // replace with your image URL

const JobApplication = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    qualification: '',
    skills: '',
    college: '',
    position: ''
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Name validation to accept only alphabets
    if (name === 'name') {
      if (!/^[a-zA-Z\s]*$/.test(value)) {
        setError('Name should only contain alphabets');
        return;
      }
      setError('');
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    if (resumeFile) data.append('resume', resumeFile);

    try {
      setMessage('');
      setError('');
      const res = await fetch('http://localhost:5000/job-apply', {
        method: 'POST',
        body: data,
      });

      if (res.ok) {
        const result = await res.json();
        setMessage(result.message || 'Application submitted successfully!');
        setFormData({
          name: '',
          email: '',
          qualification: '',
          skills: '',
          college: '',
          position: ''
        });
        setResumeFile(null);
        e.target.reset();
      } else {
        const errorData = await res.json();
        setError(errorData.message || 'Submission failed');
      }
    } catch (err) {
      setError('Error submitting form: ' + err.message);
    }
  };

  return (
    <div
      className="job-application-page"
      style={{
        backgroundImage: `url(${bgImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="job-application-form">
        <h2 className="form-title">Job Application Form</h2>

        {message && <div className="success-message">{message}</div>}
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            pattern="[A-Za-z\s]+"
            title="Please enter only alphabets"
            required 
          />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

          <label htmlFor="qualification">Qualification:</label>
          <input type="text" id="qualification" name="qualification" value={formData.qualification} onChange={handleChange} required />

          <label htmlFor="skills">Skills:</label>
          <input type="text" id="skills" name="skills" value={formData.skills} onChange={handleChange} />

          <label htmlFor="college">College:</label>
          <input type="text" id="college" name="college" value={formData.college} onChange={handleChange} />

          <label htmlFor="position">Position:</label>
          <input type="text" id="position" name="position" value={formData.position} onChange={handleChange} />

          <label htmlFor="resume">Resume:</label>
          <input
            type="file"
            id="resume"
            name="resume"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            required
          />

          <input type="submit" value="Submit Application" />
        </form>
      </div>
    </div>
  );
};

export default JobApplication;
