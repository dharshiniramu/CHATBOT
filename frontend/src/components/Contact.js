import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-container">
      <header className="navbar">
        <div className="logo">
          <span className="vista">VISTA</span><br />
          <span className="tagline">Innovation@work</span>
        </div>
        <nav className="nav-links">
          <a href="/">HOME</a>
          <a href="/about">ABOUT US</a>
          <a href="/services">SERVICES</a>
          <a href="/industries">INDUSTRIES</a>
          <a href="/insights">INSIGHTS</a>
          <a href="/careers">CAREERS</a>
          <a href="/csr">CSR</a>
        </nav>
        <button className="contact-btn">Contact Us</button>
      </header>

      <div className="contact-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="subtitle">Contact</span>
          <h1>Get in touch with us</h1>
         
        </div>
      </div>

      <div className="contact-info-container">
        <div className="contact-card">
          <div className="icon-wrapper">
            <i className="location-icon">📍</i>
          </div>
          <h2>ADDRESS</h2>
          <p>1999 S BASCOM AVE, STE 700 | CAMPBELL | CALIFORNIA | USA 95008.</p>
          <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="contact-link">
            FIND ON MAP
          </a>
        </div>

        <div className="contact-card">
          <div className="icon-wrapper">
            <i className="phone-icon">📱</i>
          </div>
          <h2>PHONE</h2>
          <p>CALL US ON: +1 (866) 898-9971</p>
          <button className="contact-link">GET CALL BACK</button>
        </div>

        <div className="contact-card">
          <div className="icon-wrapper">
            <i className="email-icon">✉️</i>
          </div>
          <h2>EMAIL</h2>
          <p>INFO@VISTAES.COM</p>
          <p>SALES@VISTAES.COM</p>
          <a href="mailto:info@vistaes.com" className="contact-link">SEND MAIL</a>
        </div>
      </div>
    </div>
  );
};

export default Contact; 