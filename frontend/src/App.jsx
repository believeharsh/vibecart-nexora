import { useState } from 'react';
import { CartProvider } from './contexts/cartContext';
import Navbar from './components/Navbar';
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';

import Wishlist from './components/Wishlist';
import { WishlistProvider } from './contexts/WishlistContext';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  return (
    <WishlistProvider>
      <CartProvider>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
          <Navbar
            onCartClick={() => setIsCartOpen(true)}
            onWishlistClick={() => setIsWishlistOpen(true)}
          />
          <ProductGrid />
          <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
          <Wishlist isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />
        </div>
      </CartProvider>
    </WishlistProvider>
  );
}

export default App;