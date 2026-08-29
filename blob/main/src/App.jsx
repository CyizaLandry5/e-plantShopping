import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import './App.css';
import AboutUs from './components/AboutUs';
import ProductList from './components/ProductList';
import CartItem from './components/CartItem';
import { useSelector } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/plants" element={<ProductList />} />
            <Route path="/cart" element={<CartItem />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

const LandingPage = () => {
  const navigate = useNavigate();
  const [showProductList, setShowProductList] = useState(false);
  const cartItems = useSelector(state => state.cart.items);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Handle Get Started button click
  const handleGetStarted = () => {
    setShowProductList(true);
    // Navigate to the product listing page
    navigate('/plants');
  };

  return (
    <div className="landing-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-brand">🌿 Paradise Nursery</div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/plants">Plants</Link>
          <Link to="/cart" className="cart-link">
            🛒 Cart 
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>
        </div>
      </nav>
      
      {/* Landing Page Content */}
      <div className="landing-content">
        <h1 className="company-name">🌿 Paradise Nursery</h1>
        <p className="tagline">Bring Nature Home</p>
        <p className="description">
          Discover our collection of beautiful houseplants and bring the beauty of nature into your home.
        </p>
        <button 
          className="get-started-btn" 
          onClick={handleGetStarted}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default App;