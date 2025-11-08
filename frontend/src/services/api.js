const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = {
  // Products
  getProducts: async () => {
    const res = await fetch(`${API_URL}/products`);
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  },

  // Cart
  getCart: async () => {
    const res = await fetch(`${API_URL}/cart`);
    if (!res.ok) throw new Error('Failed to fetch cart');
    return res.json();
  },

  addToCart: async (productId, quantity = 1) => {
    const res = await fetch(`${API_URL}/cart`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, quantity })
    });
    if (!res.ok) throw new Error('Failed to add to cart');
    return res.json();
  },

  removeFromCart: async (productId) => {
    const res = await fetch(`${API_URL}/cart/${productId}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('Failed to remove from cart');
    return res.json();
  },

  updateQuantity: async (productId, quantity) => {
    const res = await fetch(`${API_URL}/cart/${productId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity })
    });
    if (!res.ok) throw new Error('Failed to update quantity');
    return res.json();
  },

  // Checkout
  checkout: async (name, email, cartItems) => {
    const res = await fetch(`${API_URL}/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, cartItems })
    });
    if (!res.ok) throw new Error('Checkout failed');
    return res.json();
  }
};