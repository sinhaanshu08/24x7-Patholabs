// CartContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../../../Firebase/Firebase';
import { ref, push, remove } from 'firebase/database';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart items from local storage on component mount
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (storedCartItems) {
      setCartItems(storedCartItems);
    }
  }, []);

  // Update local storage whenever cart items change
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Clear local storage when the component unmounts
  useEffect(() => {
    return () => {
      localStorage.removeItem('cartItems');
    };
  }, []);

  const addToCart = (item) => {
    // Check if the item is already in the cart
    const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id);
    if (isItemInCart) return;

    // Add item to local state
    setCartItems((prevItems) => [...prevItems, item]);

    // Add item to Firebase database
    const cartRef = ref(db, 'cartItems');
    push(cartRef, item); // Push the new item to Firebase database
  };

  const removeFromCart = (itemId) => {
    // Remove item from local state
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);

    // Remove item from Firebase database
    // Assuming each item has a unique identifier (e.g., itemId)
    const cartItemRef = ref(db, `cartItems/${itemId}`);
    remove(cartItemRef);
  };

  const clearCart = () => {
    // Clear cart items from local state
    setCartItems([]);

    // Clear cart items from Firebase database
    const cartRef = ref(db, 'cartItems');
    remove(cartRef);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

