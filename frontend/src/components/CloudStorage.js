import React from 'react';
import './ImageAnnotation.css';
import { useNavigate } from 'react-router-dom';

const CloudStorage = () => {
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
      marginRight: '20px'
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
          <h3>Cloud Storage Solutions</h3>
        </div>
      </div>

      <div className="content-grid">
        <div className="image-container" style={imageStyles.imageContainer}>
          <img 
            src={process.env.PUBLIC_URL + '/cloud_storage.jpg'} 
            alt="Cloud Storage Solutions" 
            style={imageStyles.annotationImage}
          />
        </div>
        <div className="text-content">
          <div className="text-content-inner">
            <h2>Cloud Storage Solutions</h2>
            <p>
              VISTA's Cloud Storage solutions provide secure, scalable, and reliable storage infrastructure 
              for businesses of all sizes. Our cloud storage services enable organizations to store, access, 
              and manage their data efficiently while ensuring data protection and compliance.
            </p>
            <p>
              Our storage solutions include:
              • Object Storage
              • Block Storage
              • File Storage
              • Archive Storage
              • Backup Solutions
              • Disaster Recovery
            </p>
            <p>
              Key benefits:
              • Unlimited Scalability
              • High Durability
              • Data Encryption
              • Geographic Redundancy
              • Cost Optimization
              • Easy Integration
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

export default CloudStorage; 