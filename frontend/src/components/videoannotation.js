import React from 'react';
import './ImageAnnotation.css';
import { useNavigate } from 'react-router-dom';

const VideoAnnotation = () => {
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
           <h3>Video Annotation</h3>
        </div>
      </div>

      

      <div className="content-section">
        <div className="content-grid">
          <div className="image-container">
            <img 
              src={process.env.PUBLIC_URL + '/video_annotation.jpg'} 
              alt="Image Annotation Example" 
              style={imageStyles.annotationImage}
            />
          </div>
          <div className="text-content">
            <div className="text-content-inner">
              <h2>Video Annotation</h2>
              <p>
  Video annotation plays a pivotal role in enhancing the safety and intelligence of autonomous driving systems. 
  VISTA’s Video Annotation services are designed to label complex driving behaviors and road events such as 
  turning, stopping, lane changes, merging, and more. These annotations help decode patterns and behaviors of 
  drivers and surrounding vehicles during real-world driving scenarios.


  These VISTA annotation techniques are essential for tasks such as pose estimation, image segmentation, 
  and object detection. They support precise object recognition and classification in photos. 
  For complicated objects like cars and pedestrians, polygon annotation is especially helpful in outlining 
  With a focus on quality and accuracy, VISTA ensures that each frame is meticulously labeled to enhance the training of machine learning models. 
  This ultimately supports safer, more reliable autonomous driving technologies across various environments and scenarios.
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

export default VideoAnnotation; 