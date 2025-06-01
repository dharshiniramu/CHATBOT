import React from 'react';
import './ImageAnnotation.css';
import { useNavigate } from 'react-router-dom';

const BigDataAnalysis = () => {
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
          <h1>AIML Services</h1>
          <h3>Big Data Analysis</h3>
        </div>
      </div>

      <div className="content-grid">
        <div className="image-container">
          <img 
            src={process.env.PUBLIC_URL + '/bigdata.jpg'} 
            alt="Big Data Analysis" 
            style={imageStyles.annotationImage}
          />
        </div>
        <div className="text-content">
          <div className="text-content-inner">
            <h2>Big Data Analysis</h2>
            <p>
              VISTA's Big Data Analysis services help organizations harness the power of massive datasets to 
              drive innovation and competitive advantage. Our solutions enable businesses to process, analyze, 
              and derive meaningful insights from large volumes of structured and unstructured data.
            </p>
            <p>
              Our Big Data capabilities include:
              • Data Lake Implementation
              • Stream Processing
              • Batch Processing
              • Real-time Analytics
              • Data Warehousing
              • ETL Pipeline Development
            </p>
            <p>
              We provide comprehensive solutions for:
              • Scalable Data Architecture Design
              • Distributed Computing Implementation
              • Data Quality and Governance
              • Advanced Analytics and Machine Learning
              • Performance Optimization
              • Data Security and Compliance
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

export default BigDataAnalysis; 