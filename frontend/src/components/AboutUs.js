import React from 'react';
import './AboutUs.css';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="about-container">
      <header className="navbar">
        <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <span className="vista">VISTA</span><br />
          <span className="tagline">Innovation@work</span>
        </div>
        <nav className="nav-links">
          <a onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>HOME</a>
          <a onClick={() => navigate('/about')} className="active" style={{ cursor: 'pointer' }}>ABOUT US</a>
          <div className="services-dropdown">
            <a onClick={() => navigate('/services')} style={{ cursor: 'pointer' }}>SERVICES ▾</a>
          </div>
          <a onClick={() => navigate('/industries')} style={{ cursor: 'pointer' }}>INDUSTRIES</a>
          <a onClick={() => navigate('/insights')} style={{ cursor: 'pointer' }}>INSIGHTS</a>
          <a onClick={() => navigate('/careers')} style={{ cursor: 'pointer' }}>CAREERS</a>
          <a onClick={() => navigate('/csr')} style={{ cursor: 'pointer' }}>CSR</a>
        </nav>
        <button className="contact-btn" onClick={() => navigate('/contact')}>Contact Us</button>
      </header>

      <main className="about-content">
        <section className="hero-section">
          <h1>About VISTA</h1>
          <p className="tagline-large">Innovating Tomorrow's Solutions Today</p>
        </section>

        <section className="company-info">
          <div className="info-card">
            <h2>Who We Are</h2>
            <p>
              VISTA Private Limited is a leading technology solutions provider specializing in digital engineering, 
              data services, and innovative tech solutions. Founded with a vision to transform businesses through 
              cutting-edge technology, we've grown into a trusted partner for organizations worldwide.
            </p>
          </div>

          <div className="info-card">
            <h2>Our Mission</h2>
            <p>
              To deliver exceptional value through innovative technology solutions while maintaining the highest 
              standards of quality and customer satisfaction. We strive to be at the forefront of technological 
              advancement, helping our clients navigate the digital landscape with confidence.
            </p>
          </div>

          <div className="info-card">
            <h2>Our Expertise</h2>
            <ul className="expertise-list">
              <li>Advanced FEA/CFD Simulation</li>
              <li>Data Labelling & AI Services</li>
              <li>Digital Engineering Solutions</li>
              <li>Cloud Services & Infrastructure</li>
              <li>Structural Engineering</li>
              <li>AI/ML Integration</li>
            </ul>
          </div>
        </section>

        <section className="stats-section">
          <div className="stat-card">
            <h3>06</h3>
            <p>Locations</p>
          </div>
          <div className="stat-card">
            <h3>500+</h3>
            <p>Successful Projects</p>
          </div>
          <div className="stat-card">
            <h3>120+</h3>
            <p>ADAS Functions Delivered</p>
          </div>
          <div className="stat-card">
            <h3>12+</h3>
            <p>Data Engineering tools</p>
          </div>
        </section>

        <section className="values-section">
          <h2>Our Core Values</h2>
          <div className="values-grid">
            <div className="value-item">
              <h3>Innovation</h3>
              <p>Constantly pushing boundaries to deliver cutting-edge solutions</p>
            </div>
            <div className="value-item">
              <h3>Excellence</h3>
              <p>Maintaining the highest standards in everything we do</p>
            </div>
            <div className="value-item">
              <h3>Integrity</h3>
              <p>Operating with transparency and ethical principles</p>
            </div>
            <div className="value-item">
              <h3>Collaboration</h3>
              <p>Working together to achieve exceptional results</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutUs; 