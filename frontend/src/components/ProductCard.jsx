import { ShoppingBag, Plus, Heart } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../contexts/cartContext';
import { useWishlist } from '../contexts/WishlistContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const inWishlist = isInWishlist(product._id);

  const handleAddToCart = async () => {
    setIsAdding(true);
    const success = await addToCart(product._id);
    if (success) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }
    setIsAdding(false);
  };

  const handleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="relative overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={handleWishlist}
            className={`p-2 rounded-full backdrop-blur-sm transition-all ${
              inWishlist
                ? 'bg-red-500 text-white'
                : 'bg-white/90 text-gray-700 hover:bg-white'
            }`}
          >
            <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
          </button>
          <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-purple-600">
            ${product.price}
          </span>
        </div>
        
        {product.category && (
          <div className="absolute bottom-3 left-3">
            <span className="bg-purple-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold">
              {product.category}
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="mb-3">
          <h3 className="text-lg font-bold text-gray-900 mb-1">{product.name}</h3>
          <p className="text-sm text-gray-500">{product.description}</p>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`w-full py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-200 ${
            showSuccess
              ? 'bg-green-500 text-white'
              : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:scale-105'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {showSuccess ? (
            <>
              <span>✓</span>
              <span>Added!</span>
            </>
          ) : isAdding ? (
            <span>Adding...</span>
          ) : (
            <>
              <Plus className="w-5 h-5" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;