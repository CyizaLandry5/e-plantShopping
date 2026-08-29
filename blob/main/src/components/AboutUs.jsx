import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div>
      <nav className="navbar">
        <div className="nav-brand">🌿 Paradise Nursery</div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/plants">Plants</Link>
          <Link to="/cart">🛒 Cart</Link>
        </div>
      </nav>

      <div className="about-container">
        <h1>🌱 About Paradise Nursery</h1>
        <p>
          Welcome to Paradise Nursery, your trusted source for beautiful, 
          high-quality houseplants. Founded in 2020, we're passionate about 
          bringing the beauty of nature into homes and offices.
        </p>
        <p>
          <strong>Our Mission:</strong> To make the joy of plant ownership 
          accessible to everyone while promoting sustainable practices and 
          environmental awareness.
        </p>
        <p>
          <strong>Our Values:</strong>
        </p>
        <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
          <li>🌿 Quality plants sourced from sustainable growers</li>
          <li>🤝 Exceptional customer service</li>
          <li>🌍 Environmental responsibility</li>
          <li>📚 Education about plant care</li>
        </ul>
        <p>
          Whether you're a seasoned plant parent or just starting your green 
          journey, Paradise Nursery is here to help you find the perfect 
          plants for your space.
        </p>
        <p style={{ marginTop: '1rem' }}>
          <Link to="/plants" style={{ color: '#2e7d32', fontWeight: 'bold' }}>
            🌿 Browse Our Plants →
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AboutUs;