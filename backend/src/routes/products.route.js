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
      { name: 'Bluetooth Speaker', price: 59.99, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400', description: 'Portable audio', category: 'Electronics' },
      { name: 'Wireless Earbuds', price: 89.99, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400', description: 'True wireless freedom', category: 'Electronics' },
      { name: 'Gaming Mouse', price: 49.99, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400', description: 'RGB backlit gaming', category: 'Electronics' },
      { name: 'Mechanical Keyboard', price: 129.99, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400', description: 'Clicky switches', category: 'Electronics' },
      { name: 'USB-C Hub', price: 39.99, image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400', description: '7-in-1 connectivity', category: 'Electronics' },
      { name: 'Webcam HD', price: 69.99, image: 'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=400', description: '1080p streaming', category: 'Electronics' },
      { name: 'Phone Stand', price: 19.99, image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400', description: 'Adjustable aluminum', category: 'Electronics' },
      { name: 'Power Bank', price: 44.99, image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400', description: '20000mAh capacity', category: 'Electronics' },

      // Fashion
      { name: 'Running Shoes', price: 119.99, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', description: 'Comfortable fit', category: 'Fashion' },
      { name: 'Sunglasses', price: 149.99, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400', description: 'UV protection', category: 'Fashion' },
      { name: 'Leather Wallet', price: 45.99, image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400', description: 'Genuine leather', category: 'Fashion' },
      { name: 'Canvas Sneakers', price: 64.99, image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400', description: 'Classic style', category: 'Fashion' },
      { name: 'Denim Jacket', price: 89.99, image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400', description: 'Vintage wash', category: 'Fashion' },
      { name: 'Baseball Cap', price: 24.99, image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400', description: 'Adjustable strap', category: 'Fashion' },
      { name: 'Crossbody Bag', price: 54.99, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400', description: 'Compact design', category: 'Fashion' },
      { name: 'Analog Watch', price: 179.99, image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400', description: 'Stainless steel', category: 'Fashion' },

      // Home & Living
      { name: 'Desk Lamp', price: 39.99, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400', description: 'Adjustable brightness', category: 'Home' },
      { name: 'Throw Pillow', price: 29.99, image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400', description: 'Soft velvet cover', category: 'Home' },
      { name: 'Wall Clock', price: 34.99, image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=400', description: 'Modern minimalist', category: 'Home' },
      { name: 'Scented Candles', price: 22.99, image: 'https://images.unsplash.com/photo-1602874801006-320e5d4c9d9f?w=400', description: '3-pack assorted', category: 'Home' },
      { name: 'Picture Frame Set', price: 27.99, image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400', description: '5-piece gallery', category: 'Home' },
      { name: 'Plant Pot', price: 18.99, image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400', description: 'Ceramic white', category: 'Home' },

      // Fitness
      { name: 'Yoga Mat', price: 29.99, image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400', description: 'Non-slip surface', category: 'Fitness' },
      { name: 'Water Bottle', price: 24.99, image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400', description: 'Insulated steel', category: 'Fitness' },
      { name: 'Resistance Bands', price: 19.99, image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400', description: 'Set of 5 bands', category: 'Fitness' },
      { name: 'Foam Roller', price: 34.99, image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400', description: 'Muscle recovery', category: 'Fitness' },
      { name: 'Jump Rope', price: 14.99, image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400', description: 'Adjustable length', category: 'Fitness' },
      { name: 'Gym Towel', price: 16.99, image: 'https://images.unsplash.com/photo-1556906918-e4e52b2b3e75?w=400', description: 'Quick-dry microfiber', category: 'Fitness' },

      // Accessories
      { name: 'Laptop Backpack', price: 49.99, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', description: 'Durable and spacious', category: 'Accessories' },
      { name: 'Travel Organizer', price: 21.99, image: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=400', description: 'Multiple compartments', category: 'Accessories' },
      { name: 'Phone Case', price: 15.99, image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400', description: 'Shockproof design', category: 'Accessories' },
      { name: 'Laptop Sleeve', price: 25.99, image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400', description: 'Padded protection', category: 'Accessories' },

      // Appliances
      { name: 'Coffee Maker', price: 89.99, image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400', description: 'Brew perfect coffee', category: 'Appliances' }
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