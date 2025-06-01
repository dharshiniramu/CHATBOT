import React from 'react';
import './ImageAnnotation.css';
import { useNavigate } from 'react-router-dom';

const CADCAEAutomation = () => {
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
        background: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("/datalabelling_bg.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className="hero-content">
          <h1>Digital Engineering</h1>
          <h3>CAD/CAE Automation</h3>
        </div>
      </div>

      <div className="content-section">
        <div className="content-grid">
          <div className="image-container">
            <img 
              src={process.env.PUBLIC_URL + '/cad.jpg'} 
              alt="CAD/CAE Automation" 
              style={imageStyles.annotationImage}
            />
          </div>
          <div className="text-content">
            <div className="text-content-inner">
              <h2>CAD/CAE Automation</h2>
              <p>
                VISTA's CAD/CAE Automation services revolutionize engineering design processes by implementing 
                intelligent automation solutions. Our services streamline repetitive design tasks, reduce manual 
                effort, and ensure consistency across engineering projects. We leverage advanced scripting and 
                API integration to automate various CAD operations, from simple geometry creation to complex 
                model updates.
              </p>
              <p>
                Our automation solutions include custom tools for design rule checking, automated drawing 
                generation, batch processing of CAD files, and integration with PLM systems. By combining 
                traditional engineering expertise with modern automation techniques, we help organizations 
                significantly reduce design cycle time while maintaining high quality standards.
              </p>
              <p>
                Key features of our CAD/CAE Automation services:
                • Automated design validation and verification
                • Parametric model generation
                • Custom toolbar and plugin development
                • Batch processing and file conversion
                • Design optimization workflows
                • Integration with enterprise systems
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

export default CADCAEAutomation; 