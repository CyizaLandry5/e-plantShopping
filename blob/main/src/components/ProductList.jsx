import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addItem } from '../features/cart/CartSlice';

// Sample plant data with categories
const plantData = {
  indoor: [
    { id: 1, name: 'Monstera Deliciosa', price: 29.99, image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=300' },
    { id: 2, name: 'Snake Plant', price: 24.99, image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=300' },
    { id: 3, name: 'Peace Lily', price: 19.99, image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=300' },
    { id: 4, name: 'Pothos', price: 14.99, image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=300' },
    { id: 5, name: 'Fiddle Leaf Fig', price: 49.99, image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=300' },
    { id: 6, name: 'Zebra Plant', price: 34.99, image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=300' },
  ],
  outdoor: [
    { id: 7, name: 'Lavender', price: 15.99, image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=300' },
    { id: 8, name: 'Rosemary', price: 12.99, image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=300' },
    { id: 9, name: 'Thyme', price: 9.99, image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=300' },
    { id: 10, name: 'Oregano', price: 10.99, image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=300' },
    { id: 11, name: 'Mint', price: 8.99, image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=300' },
    { id: 12, name: 'Sage', price: 11.99, image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=300' },
  ],
  succulents: [
    { id: 13, name: 'Aloe Vera', price: 14.99, image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=300' },
    { id: 14, name: 'String of Pearls', price: 22.99, image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=300' },
    { id: 15, name: 'Jade Plant', price: 19.99, image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=300' },
    { id: 16, name: 'Burros Tail', price: 17.99, image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=300' },
    { id: 17, name: 'Echeveria', price: 12.99, image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=300' },
    { id: 18, name: 'Hens and Chicks', price: 9.99, image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=300' },
  ]
};

const ProductList = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const [addedItems, setAddedItems] = useState([]);

  const handleAddToCart = (plant) => {
    const cartItem = {
      id: plant.id,
      name: plant.name,
      price: plant.price,
      image: plant.image,
      quantity: 1
    };
    dispatch(addItem(cartItem));
    setAddedItems([...addedItems, plant.id]);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const isItemAdded = (plantId) => {
    return addedItems.includes(plantId) || cartItems.some(item => item.id === plantId);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="nav-brand">🌿 Paradise Nursery</div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/plants" style={{ fontWeight: 'bold' }}>Plants</Link>
          <Link to="/cart" className="cart-link">
            🛒 Cart {getTotalItems() > 0 && <span className="cart-badge">{getTotalItems()}</span>}
          </Link>
        </div>
      </nav>

      <div className="product-container">
        <h1 style={{ color: '#2e7d32', marginBottom: '2rem' }}>Our Plants</h1>
        
        {/* Indoor Plants */}
        <div className="category-section">
          <h2 className="category-title">🏠 Indoor Plants</h2>
          <div className="product-grid">
            {plantData.indoor.map(plant => (
              <div key={plant.id} className="product-card">
                <img src={plant.image} alt={plant.name} className="product-image" />
                <div className="product-info">
                  <h3 className="product-name">{plant.name}</h3>
                  <p className="product-price">${plant.price.toFixed(2)}</p>
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(plant)}
                    disabled={isItemAdded(plant.id)}
                  >
                    {isItemAdded(plant.id) ? 'Added ✓' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Outdoor Plants */}
        <div className="category-section">
          <h2 className="category-title">🌳 Outdoor Plants</h2>
          <div className="product-grid">
            {plantData.outdoor.map(plant => (
              <div key={plant.id} className="product-card">
                <img src={plant.image} alt={plant.name} className="product-image" />
                <div className="product-info">
                  <h3 className="product-name">{plant.name}</h3>
                  <p className="product-price">${plant.price.toFixed(2)}</p>
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(plant)}
                    disabled={isItemAdded(plant.id)}
                  >
                    {isItemAdded(plant.id) ? 'Added ✓' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Succulents */}
        <div className="category-section">
          <h2 className="category-title">🌵 Succulents</h2>
          <div className="product-grid">
            {plantData.succulents.map(plant => (
              <div key={plant.id} className="product-card">
                <img src={plant.image} alt={plant.name} className="product-image" />
                <div className="product-info">
                  <h3 className="product-name">{plant.name}</h3>
                  <p className="product-price">${plant.price.toFixed(2)}</p>
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(plant)}
                    disabled={isItemAdded(plant.id)}
                  >
                    {isItemAdded(plant.id) ? 'Added ✓' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;