import React from 'react';
import './ImageAnnotation.css';
import { useNavigate } from 'react-router-dom';

const TextAnnotation = () => {
  const navigate = useNavigate();

  // Define inline styles for images
  const imageStyles = {
    serviceBackground: {
      width: '100%',
      height: '250px',
      objectFit: 'cover',
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: -1,
    },
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
          <h1>Data Labelling</h1>
           <h3>Text Annotation</h3>
        </div>
      </div>

      <div className="content-section">
        <div className="content-grid">
          <div className="image-container">
            <img 
              src={process.env.PUBLIC_URL + '/text-annotation.jpg'} 
              alt="Image Annotation Example" 
              style={imageStyles.annotationImage}
            />
          </div>
          <div className="text-content">
            <div className="text-content-inner">
              <h2>Text Annotation</h2>
              <p>
               Text annotation is fundamental to Natural Language Processing (NLP), allowing machines to interpret and respond to human language with greater accuracy. VISTA’s Text Annotation services are tailored to enhance AI systems by precisely labeling unstructured text from diverse sources. These services power critical tasks such as sentiment analysis, entity recognition, intent classification, and part-of-speech tagging. By structuring raw text data into meaningful formats, VISTA supports the development of intelligent chatbots, recommendation engines, fraud detection systems, and language translation tools.
              
               VISTA’s expert annotators provide detailed tagging of named entities like people, organizations, locations, and dates, as well as emotional tones and user intents. Advanced techniques like coreference resolution and dependency annotation help AI models understand relationships between words and phrases, improving semantic analysis. 
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

export default TextAnnotation; 