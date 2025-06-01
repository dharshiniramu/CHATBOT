import React from 'react';
import './ImageAnnotation.css';
import { useNavigate } from 'react-router-dom';

const DataAnalytics = () => {
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
          <h3>Data Analytics</h3>
        </div>
      </div>

      <div className="content-grid">
        <div className="image-container">
          <img 
            src={process.env.PUBLIC_URL + '/data_analytics.jpg'} 
            alt="Data Analytics Services" 
            style={imageStyles.annotationImage}
          />
        </div>
        <div className="text-content">
          <div className="text-content-inner">
            <h2>Data Analytics Services</h2>
            <p>
              VISTA's Data Analytics services transform raw data into actionable insights that drive business decisions. 
              Our comprehensive analytics solutions combine statistical analysis, machine learning, and data visualization 
              to uncover patterns, trends, and correlations in complex datasets.
            </p>
            <p>
              We offer end-to-end analytics solutions including:
              • Descriptive Analytics - Understanding historical data patterns
              • Diagnostic Analytics - Identifying root causes of business problems
              • Predictive Analytics - Forecasting future trends and behaviors
              • Prescriptive Analytics - Recommending optimal actions
              • Real-time Analytics - Processing and analyzing streaming data
            </p>
            <p>
              Our team leverages advanced tools and techniques to deliver:
              • Custom dashboards and visualizations
              • Automated reporting systems
              • Predictive models and forecasting
              • Customer segmentation and behavior analysis
              • Performance optimization recommendations
              • Risk analysis and management insights
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

export default DataAnalytics; 