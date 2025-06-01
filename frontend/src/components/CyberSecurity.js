import React from 'react';
import './ImageAnnotation.css';
import { useNavigate } from 'react-router-dom';

const CyberSecurity = () => {
  const navigate = useNavigate();

  const imageStyles = {
    annotationImage: {
      width: '100%',
      height: '600px',
      display: 'block',
      borderRadius: '10px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      objectFit: 'cover'
    }
  };

  return (
    <div className="annotation-container">
      <header className="navbar">
        <div className="logo">
          <span className="vista">VISTA</span><br />
          <span className="tagline">Innovation@work</span>
        </div>
        <nav className="nav-links">
          <a href="/">HOME</a>
          <a href="/about">ABOUT US</a>
          <div className="services-dropdown">
            <a href="/services" className="active">SERVICES ▾</a>
          </div>
          <a href="/industries">INDUSTRIES</a>
          <a href="/insights">INSIGHTS</a>
          <a href="/careers">CAREERS</a>
          <a href="/csr">CSR</a>
        </nav>
        <button className="contact-btn" onClick={() => navigate('/contact')}>Contact Us</button>
      </header>
       
      <div className="service-hero" style={{ 
        background: ' url("/datalabelling_bg.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className="hero-content">
          <h1>Digital Engineering</h1>
          <h3>Cyber Security</h3>
        </div>
      </div>

      <div className="content-section">
        <div className="content-grid">
          <div className="image-container">
            <img 
              src={process.env.PUBLIC_URL + '/cybersecurity.jpg'} 
              alt="Cyber Security Services" 
              style={imageStyles.annotationImage}
            />
          </div>
          <div className="text-content">
            <div className="text-content-inner">
              <h2>Cyber Security</h2>
              <p>
                VISTA's Cyber Security services provide comprehensive protection for your digital assets and 
                infrastructure. We offer end-to-end security solutions that safeguard your organization 
                against evolving cyber threats. Our team of security experts implements robust security 
                measures across networks, applications, and cloud environments.
              
              
                Our services encompass security assessment, threat detection, incident response, and 
                continuous monitoring. We employ advanced security technologies and best practices to 
                identify vulnerabilities, prevent breaches, and ensure compliance with industry standards 
                and regulations.
            
           
                Key aspects of our Cyber Security services:
                • Security Architecture Design
                • Vulnerability Assessment and Penetration Testing
                • Security Information and Event Management (SIEM)
                • Identity and Access Management
                • Cloud Security Solutions
                • Security Awareness Training
                • Incident Response and Recovery
                • Compliance and Risk Management
              </p>
            </div>
            <button className="learn-more-btn" onClick={() => navigate('/client')}>
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CyberSecurity; 