import React from 'react';
import './ImageAnnotation.css';
import { useNavigate } from 'react-router-dom';

const SaaS = () => {
  const navigate = useNavigate();

  const imageStyles = {
    annotationImage: {
      width: '100%',
      height: '600px',
      display: 'block',
      borderRadius: '10px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      objectFit: 'cover'
    },
    imageContainer: {
      marginLeft: 'auto',
      marginRight: '20px',
      padding: '20px'
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
        background: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("/datalabelling_bg.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className="hero-content">
          <h1>Cloud Services</h1>
          <h3>Software as a Service (SaaS)</h3>
        </div>
      </div>

      <div className="content-grid">
        <div className="image-container" style={imageStyles.imageContainer}>
          <img 
            src={process.env.PUBLIC_URL + '/saas.jpg'} 
            alt="Software as a Service" 
            style={imageStyles.annotationImage}
          />
        </div>
        <div className="text-content">
          <div className="text-content-inner">
            <h2>Software as a Service (SaaS)</h2>
            <p>
              VISTA's Software as a Service (SaaS) solutions deliver cloud-based applications that are 
              accessible from any device with an internet connection. Our SaaS offerings eliminate the 
              need for complex software installation, maintenance, and infrastructure management.
            </p>
            <p>
              Our SaaS solutions include:
              • Enterprise Applications
              • Collaboration Tools
              • Business Intelligence
              • Customer Relationship Management
              • Project Management
              • Resource Planning
            </p>
            <p>
              Key advantages:
              • Instant Access
              • Automatic Updates
              • Cost Efficiency
              • Scalable Usage
              • Data Security
              • Cross-platform Compatibility
            </p>
          </div>
          <button className="learn-more-btn" onClick={() => navigate('/client')}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaaS; 