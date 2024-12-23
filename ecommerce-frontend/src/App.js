import React, { useState, useEffect } from 'react';
import AppRoutes from './routes/AppRoutes';

const App = () => {
  const [totalCartQuantity, setTotalCartQuantity] = useState(0);

  const [cart, setCart] = useState(() => {
    try {
      const storedCart = JSON.parse(localStorage.getItem('cart'));
      return Array.isArray(storedCart) ? storedCart : [];
    } catch (error) {
      console.error('Failed to parse cart from localStorage:', error);
      return [];
    }
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      localStorage.removeItem('cart'); // Clear cart from localStorage if empty
    }
    // console.log(`saving cart from the local store: ${localStorage.getItem('cart')}`);
  }, [cart]);

  // Add product to the cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Remove product from the cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const productToRemove = prevCart.find((item) => item.id === productId);
      const newCart = prevCart.filter((item) => item.id !== productId);

      // Update the total quantity
      setTotalCartQuantity((prevTotal) =>
        productToRemove ? prevTotal - productToRemove.quantity : prevTotal
      );

      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  }

  // Update total cart quantity whenever the cart changes
  useEffect(() => {
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    setTotalCartQuantity(totalQuantity);
  }, [cart]);

  return (
    <AppRoutes
      cart={cart}
      totalCartQuantity={totalCartQuantity}
      addToCart={addToCart}
      removeFromCart={removeFromCart}
      clearCart={clearCart}
    />
  );
};

export default App;