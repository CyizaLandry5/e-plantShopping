import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeItem, updateQuantity } from '../features/cart/CartSlice';

const CartItem = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  // 1. Calculate total number of items in cart
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // 2. Calculate total cart amount (sum of all items)
  const getTotalCost = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // 3. Calculate total cost for each individual plant
  const getItemTotal = (item) => {
    return (item.price * item.quantity).toFixed(2);
  };

  // 4. Handle increase quantity
  const handleIncrease = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  // 5. Handle decrease quantity
  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    } else {
      // If quantity is 1, remove the item completely
      dispatch(removeItem({ id: item.id }));
    }
  };

  // 6. Handle delete item (remove completely from cart)
  const handleDelete = (item) => {
    dispatch(removeItem({ id: item.id }));
  };

  // 7. Handle checkout - shows "Coming Soon" message
  const handleCheckout = () => {
    alert('Coming Soon! Checkout feature will be available shortly.');
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-brand">🌿 Paradise Nursery</div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/plants">Plants</Link>
          <Link to="/cart" className="cart-link" style={{ fontWeight: 'bold' }}>
            🛒 Cart 
            {getTotalItems() > 0 && <span className="cart-badge">{getTotalItems()}</span>}
          </Link>
        </div>
      </nav>

      {/* Shopping Cart Page */}
      <div className="cart-container">
        <div className="cart-header">
          <h1 style={{ color: '#2e7d32' }}>🛒 Shopping Cart</h1>
          {/* 1. Show total cart amount */}
          <div className="cart-total">
            Total: ${getTotalCost().toFixed(2)}
          </div>
        </div>

        {cartItems.length === 0 ? (
          // Empty cart message
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
            {/* Display each cart item */}
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                {/* Display thumbnail */}
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="cart-item-image" 
                />
                
                <div className="cart-item-info">
                  {/* Display name */}
                  <div className="cart-item-name">{item.name}</div>
                  {/* Display unit price */}
                  <div className="cart-item-price">${item.price.toFixed(2)} each</div>
                  {/* Display total cost for this plant */}
                  <div style={{ marginTop: '0.25rem', color: '#2e7d32', fontWeight: 'bold' }}>
                    Item Total: ${getItemTotal(item)}
                  </div>
                </div>
                
                <div className="cart-item-controls">
                  {/* Decrease quantity button */}
                  <button 
                    className="quantity-btn"
                    onClick={() => handleDecrease(item)}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  
                  {/* Display quantity */}
                  <span className="quantity-display">{item.quantity}</span>
                  
                  {/* Increase quantity button */}
                  <button 
                    className="quantity-btn"
                    onClick={() => handleIncrease(item)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                  
                  {/* Delete button for each item */}
                  <button 
                    className="delete-btn"
                    onClick={() => handleDelete(item)}
                    aria-label="Delete item"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}

            {/* Cart action buttons */}
            <div className="cart-actions">
              {/* Checkout button with "Coming Soon" */}
              <button 
                className="checkout-btn" 
                onClick={handleCheckout}
              >
                💳 Checkout
              </button>
              
              {/* Continue shopping button - links back to product listing */}
              <Link to="/plants">
                <button className="continue-btn">🛍️ Continue Shopping</button>
              </Link>
            </div>

            {/* Summary section showing total items and total amount */}
            <div style={{ 
              marginTop: '1rem', 
              padding: '1rem', 
              background: '#e8f5e9', 
              borderRadius: '5px',
              textAlign: 'center',
              border: '1px solid #4caf50'
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