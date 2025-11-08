import express from 'express';
import Cart from '../models/cart.modal.js';
import { validateCheckout } from '../middlewares/validation.js';

const router = express.Router();

router.post('/', validateCheckout, async (req, res) => {
  try {
    const { name, email, cartItems } = req.body;

    const total = cartItems.reduce((sum, item) => {
      return sum + (item.productId.price * item.quantity);
    }, 0);

    const receipt = {
      orderId: `ORD-${Date.now()}`,
      customerName: name,
      customerEmail: email,
      items: cartItems.map(item => ({
        name: item.productId.name,
        quantity: item.quantity,
        price: item.productId.price,
        subtotal: (item.productId.price * item.quantity).toFixed(2)
      })),
      total: total.toFixed(2),
      timestamp: new Date().toISOString(),
      status: 'Confirmed',
      message: `Thank you ${name}! Your order has been confirmed.`
    };

    // Clear cart after checkout
    await Cart.findOneAndUpdate(
      { userId: 'guest' },
      { items: [] }
    );

    res.json({ 
      success: true,
      message: 'Order placed successfully', 
      receipt 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
