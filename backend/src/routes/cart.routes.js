import express from 'express';
import Cart from '../models/cart.modal.js';
import Product from '../models/product.modal.js';
import { validateCartItem } from '../middlewares/validation.js'

const router = express.Router();

// Get cart
router.get('/', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: 'guest' }).populate('items.productId');
    
    if (!cart || cart.items.length === 0) {
      return res.json({ items: [], total: 0 });
    }

    // Filter out invalid items (in case product was deleted)
    cart.items = cart.items.filter(item => item.productId);

    const total = cart.items.reduce((sum, item) => {
      return sum + (item.productId.price * item.quantity);
    }, 0);

    res.json({ 
      items: cart.items, 
      total: parseFloat(total.toFixed(2)),
      itemCount: cart.items.reduce((sum, item) => sum + item.quantity, 0)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add to cart
router.post('/', validateCartItem, async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    let cart = await Cart.findOne({ userId: 'guest' });

    if (!cart) {
      cart = new Cart({ userId: 'guest', items: [] });
    }

    const existingItem = cart.items.find(item => item.productId.toString() === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    await cart.populate('items.productId');

    const total = cart.items.reduce((sum, item) => {
      return sum + (item.productId.price * item.quantity);
    }, 0);

    res.json({ 
      message: 'Item added to cart', 
      cart,
      total: parseFloat(total.toFixed(2))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remove from cart
router.delete('/:id', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: 'guest' });
    
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const initialLength = cart.items.length;
    cart.items = cart.items.filter(item => item.productId.toString() !== req.params.id);
    
    if (cart.items.length === initialLength) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }

    await cart.save();
    await cart.populate('items.productId');

    res.json({ message: 'Item removed from cart', cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update quantity
router.patch('/:id', async (req, res) => {
  try {
    const { quantity } = req.body;
    
    if (!quantity || quantity < 1 || quantity > 99) {
      return res.status(400).json({ error: 'Quantity must be between 1 and 99' });
    }

    const cart = await Cart.findOne({ userId: 'guest' });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const item = cart.items.find(i => i.productId.toString() === req.params.id);
    
    if (!item) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }

    item.quantity = quantity;
    await cart.save();
    await cart.populate('items.productId');

    res.json({ message: 'Quantity updated', cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;