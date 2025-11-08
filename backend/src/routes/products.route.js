import express from 'express';
import Product from '../models/product.modal.js';

const router = express.Router();

// Seed products (run once)
router.post('/seed', async (req, res) => {
  try {
    await Product.deleteMany({});
    
    const products = [
      { name: 'Wireless Headphones', price: 79.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', description: 'Premium sound quality', category: 'Electronics' },
      { name: 'Smart Watch', price: 199.99, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', description: 'Track your fitness', category: 'Electronics' },
      { name: 'Laptop Backpack', price: 49.99, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', description: 'Durable and spacious', category: 'Accessories' },
      { name: 'Coffee Maker', price: 89.99, image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400', description: 'Brew perfect coffee', category: 'Appliances' },
      { name: 'Yoga Mat', price: 29.99, image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400', description: 'Non-slip surface', category: 'Fitness' },
      { name: 'Desk Lamp', price: 39.99, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400', description: 'Adjustable brightness', category: 'Home' },
      { name: 'Running Shoes', price: 119.99, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', description: 'Comfortable fit', category: 'Fashion' },
      { name: 'Water Bottle', price: 24.99, image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400', description: 'Insulated steel', category: 'Fitness' },
      { name: 'Sunglasses', price: 149.99, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400', description: 'UV protection', category: 'Fashion' },
      { name: 'Bluetooth Speaker', price: 59.99, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400', description: 'Portable audio', category: 'Electronics' }
    ];

    const created = await Product.insertMany(products);
    res.json({ message: 'Products seeded', count: created.length, products: created });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;