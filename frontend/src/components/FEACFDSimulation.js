import React from 'react';
import './ImageAnnotation.css';
import { useNavigate } from 'react-router-dom';

const FEACFDSimulation = () => {
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
          <h3>FEA/CFD Simulation</h3>
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
              <h2>FEA / CFD Simulation</h2>
              <p>
               At Vista, our FEA (Finite Element Analysis) and CFD (Computational Fluid Dynamics) simulation services provide high-fidelity insights into complex engineering problems across various industries. Using advanced tools and validated modeling techniques, we help clients assess structural integrity, thermal performance, fluid flow behavior, and mechanical stress under real-world conditions. Our team of experienced engineers supports the entire product development cycle—from concept design to final validation—minimizing physical prototyping costs and accelerating time to market.

Our simulation expertise covers static and dynamic analysis, heat transfer, fatigue life prediction, fluid-structure interaction, turbulence modeling, and more. Whether it’s optimizing the aerodynamic performance of a vehicle, enhancing cooling systems in electronics, or evaluating stress distribution in mechanical components, Vista delivers accurate and actionable simulation results. By integrating simulation with design workflows, we empower our clients to innovate with confidence, reduce risk, and make informed engineering decisions early in the development process.
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

export default FEACFDSimulation; 