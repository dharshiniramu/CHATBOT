import React from 'react';
import './ImageAnnotation.css';
import { useNavigate } from 'react-router-dom';

const ImageAnnotation = () => {
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
          <a href="/" className="ripple">HOME</a>
          <a href="/about" className="ripple">ABOUT US</a>
          <div className="services-dropdown">
            <a href="/services" className="active ripple">SERVICES ▾</a>
          </div>
          <a href="/industries" className="ripple">INDUSTRIES</a>
          <a href="/insights" className="ripple">INSIGHTS</a>
          <a href="/careers" className="ripple">CAREERS</a>
          <a href="/csr" className="ripple">CSR</a>
        </nav>
        <button className="contact-btn ripple" onClick={() => navigate('/contact')}>Contact Us</button>
      </header>
       
      <div className="service-hero" style={{ 
        background: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("/datalabelling_bg.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className="hero-content">
          <h1>Data Labelling</h1>
           <h3>Image Annotation</h3>
        </div>
      </div>

      <div className="content-section">
        <div className="content-grid">
          <div className="image-container">
            <img 
              src={process.env.PUBLIC_URL + '/img_annotation.jpg'} 
              alt="Image Annotation Example" 
              style={imageStyles.annotationImage}
            />
          </div>
          <div className="text-content">
            <div className="text-content-inner">
              <h2>Image Annotation</h2>
              <p>
                VISTA offers multiple techniques for image annotation, including line and spline annotation, bounding box
                annotation, polygon annotation, semantic segmentation, instance segmentation, and key point
                annotation. The process of bounding box annotation entails putting boxes around moving vehicles and
                pedestrians. To represent shapes more accurately, objects are outlined with polygons using polygon
                annotation. Semantic segmentation uses labels on each pixel in an image to distinguish between various
                regions. In an image, instance segmentation facilitates the distinction between various instances of the
                same object class. An image's key points, like facial landmarks, can be marked with a key point annotation.
                To label objects like boundaries and roads, line and spline annotation entails drawing lines and curves.
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

export default ImageAnnotation; 