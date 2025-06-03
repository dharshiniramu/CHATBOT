import React, { useState } from 'react';
import './jobapplication.css'; // Use same CSS file or separate if you prefer

const InternApplication = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    qualification: '',
    skills: '',
    college: '',
    position: '',
    resume: null,
  });

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const bgImageUrl = 'job_bg.jpg'; // same or different background image

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    // Name validation to accept only alphabets
    if (name === 'name') {
      if (!/^[a-zA-Z\s]*$/.test(value)) {
        setError('Name should only contain alphabets');
        return;
      }
      setError('');
    }
    
    if (name === 'resume') {
      setFormData({ ...formData, resume: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await fetch('http://localhost:5000/apply', {
        method: 'POST',
        body: data,
      });
      const result = await response.json();
      if (response.ok) {
        setMessage(result.message);
        setFormData({
          name: '',
          email: '',
          qualification: '',
          skills: '',
          college: '',
          position: '',
          resume: null,
        });
      } else {
        setError(result.message || 'Submission failed');
      }
    } catch (err) {
      setError('Server error');
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
        <h2 className="form-title">Internship Application</h2>

        {message && <div className="success-message">{message}</div>}
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Full Name</label>
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

          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="qualification">Qualification</label>
          <input
            type="text"
            id="qualification"
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            required
          />

          <label htmlFor="skills">Skills</label>
          <textarea
            id="skills"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            rows="3"
            required
          />

          <label htmlFor="college">College</label>
          <input
            type="text"
            id="college"
            name="college"
            value={formData.college}
            onChange={handleChange}
            required
          />

          <label htmlFor="position">Position Applied For</label>
          <input
            type="text"
            id="position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
          />

          <label htmlFor="resume">Upload Resume</label>
          <input
            type="file"
            id="resume"
            name="resume"
            accept=".pdf,.doc,.docx"
            onChange={handleChange}
            required
          />

          <input type="submit" value="Submit Application" />
        </form>
      </div>
    </div>
  );
};

export default InternApplication;
