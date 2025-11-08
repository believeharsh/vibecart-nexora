export const validateCartItem = (req, res, next) => {
  const { productId, quantity } = req.body;
  
  if (!productId) {
    return res.status(400).json({ error: 'Product ID is required' });
  }
  
  if (quantity && (quantity < 1 || quantity > 99)) {
    return res.status(400).json({ error: 'Quantity must be between 1 and 99' });
  }
  
  next();
};

export const validateCheckout = (req, res, next) => {
  const { name, email, cartItems } = req.body;
  
  if (!name || name.trim().length < 2) {
    return res.status(400).json({ error: 'Valid name is required' });
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ error: 'Valid email is required' });
  }
  
  if (!cartItems || cartItems.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' });
  }
  
  next();
};