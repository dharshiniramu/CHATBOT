import React from 'react';
import { useEffect } from 'react';
import './client.css';

function Client() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
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
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" name="firstName" placeholder="Enter your first name" required />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" name="lastName" placeholder="Enter your last name" required />
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
