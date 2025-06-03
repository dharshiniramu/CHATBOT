import React, { useState } from 'react';
import { useEffect } from 'react';
import './client.css';

function Client() {
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Name validation for first name and last name
    if (name === 'firstName' || name === 'lastName') {
      if (!/^[a-zA-Z\s]*$/.test(value)) {
        setError('Name should only contain alphabets');
        return;
      }
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      industry: e.target.industry.value,
      volume: e.target.volume.value,
      projection: e.target.projection.value,
      crowdSourcing: e.target.crowdSourcing.value,
      startDate: e.target.startDate.value,
      sampleData: e.target.sampleData.value
    };

    try {
      const response = await fetch('http://localhost:5000/client-submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Form submitted successfully!');
        e.target.reset();
      } else {
        alert('Error submitting form');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting form');
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="client-page" style={{ 
      backgroundImage: "url('/job_bg.jpg')", 
      backgroundSize: "cover", 
      backgroundPosition: "center" 
    }}>
      <div className="client-form">
        <h2 className="form-title">Client Form</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input 
              type="text" 
              id="firstName" 
              name="firstName" 
              placeholder="Enter your first name" 
              pattern="[A-Za-z\s]+"
              title="Please enter only alphabets"
              onChange={handleChange}
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input 
              type="text" 
              id="lastName" 
              name="lastName" 
              placeholder="Enter your last name" 
              pattern="[A-Za-z\s]+"
              title="Please enter only alphabets"
              onChange={handleChange}
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Enter your email" required />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input type="tel" id="phone" name="phone" placeholder="Enter your phone number" required />
          </div>

          <div className="form-group">
            <label htmlFor="industry">Industry</label>
            <input type="text" id="industry" name="industry" placeholder="Enter your industry" required />
          </div>

          <div className="form-group">
            <label htmlFor="volume">Volume</label>
            <input type="number" id="volume" name="volume" placeholder="Enter expected volume" required />
          </div>

          <div className="form-group">
            <label htmlFor="projection">Projection</label>
            <input type="text" id="projection" name="projection" placeholder="Enter your projection" required />
          </div>

          <div className="form-group">
            <label htmlFor="crowdSourcing">Crowd Sourcing</label>
            <input type="text" id="crowdSourcing" name="crowdSourcing" placeholder="Enter crowd sourcing details" required />
          </div>

          <div className="form-group">
            <label htmlFor="startDate">Tentative Start Date</label>
            <input type="date" id="startDate" name="startDate" required />
          </div>

          <div className="form-group">
            <label htmlFor="sampleData">Sample data available</label>
            <select id="sampleData" name="sampleData" required>
              <option value="">Select an option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Client;
