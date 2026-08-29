import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeItem, updateQuantity } from '../features/cart/CartSlice';

const CartItem = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalCost = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleIncrease = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem({ id: item.id }));
    }
  };

  const handleDelete = (item) => {
    dispatch(removeItem({ id: item.id }));
  };

  const handleCheckout = () => {
    alert('Coming Soon! Checkout feature will be available shortly.');
  };

  return (
    <div>
      <nav className="navbar">
        <div className="nav-brand">🌿 Paradise Nursery</div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/plants">Plants</Link>
          <Link to="/cart" className="cart-link" style={{ fontWeight: 'bold' }}>
            🛒 Cart {getTotalItems() > 0 && <span className="cart-badge">{getTotalItems()}</span>}
          </Link>
        </div>
      </nav>

      <div className="cart-container">
        <div className="cart-header">
          <h1 style={{ color: '#2e7d32' }}>🛒 Shopping Cart</h1>
          <div className="cart-total">
            Total: ${getTotalCost().toFixed(2)}
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
              🌱 Your cart is empty
            </p>
            <Link to="/plants">
              <button className="continue-btn">Start Shopping</button>
            </Link>
          </div>
        ) : (
          <>
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-price">${item.price.toFixed(2)} each</div>
                  <div style={{ marginTop: '0.25rem', color: '#555' }}>
                    Total: ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
                <div className="cart-item-controls">
                  <button 
                    className="quantity-btn"
                    onClick={() => handleDecrease(item)}
                  >
                    −
                  </button>
                  <span className="quantity-display">{item.quantity}</span>
                  <button 
                    className="quantity-btn"
                    onClick={() => handleIncrease(item)}
                  >
                    +
                  </button>
                  <button 
                    className="delete-btn"
                    onClick={() => handleDelete(item)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}

            <div className="cart-actions">
              <button className="checkout-btn" onClick={handleCheckout}>
                💳 Checkout
              </button>
              <Link to="/plants">
                <button className="continue-btn">🛍️ Continue Shopping</button>
              </Link>
            </div>

            <div style={{ 
              marginTop: '1rem', 
              padding: '1rem', 
              background: '#e8f5e9', 
              borderRadius: '5px',
              textAlign: 'center'
            }}>
              <p style={{ fontWeight: 'bold', color: '#2e7d32' }}>
                Total Items: {getTotalItems()} | 
                Total Amount: ${getTotalCost().toFixed(2)}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartItem;