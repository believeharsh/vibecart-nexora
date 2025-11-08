import { X, ShoppingCart, Heart, Package, Truck, Shield, Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../contexts/cartContext';
import { useWishlist } from '../contexts/WishlistContext';

const ProductDetailModal = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!isOpen || !product) return null;

  const inWishlist = isInWishlist(product._id);

  const handleAddToCart = async () => {
    setIsAdding(true);
    let success = true;
    
    for (let i = 0; i < quantity; i++) {
      const result = await addToCart(product._id);
      if (!result) success = false;
    }
    
    if (success) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setQuantity(1);
      }, 2000);
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

  const incrementQuantity = () => {
    if (quantity < 10) setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[70]" onClick={onClose} />
      
      <div className="fixed inset-0 z-[71] flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl my-8 animate-scale-in">
          {/* Header */}
          <div className="relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all shadow-lg"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Image Section */}
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {product.category && (
                <div className="absolute top-4 left-4">
                  <span className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    {product.category}
                  </span>
                </div>
              )}
            </div>

            {/* Details Section */}
            <div className="flex flex-col">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>
                
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-4xl font-bold text-purple-600">${product.price}</span>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                    In Stock
                  </span>
                </div>

                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  {product.description}
                </p>

                {/* Product Features */}
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="p-2 bg-purple-50 rounded-lg">
                      <Truck className="w-5 h-5 text-purple-600" />
                    </div>
                    <span className="font-medium">Free shipping on orders over $50</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="p-2 bg-purple-50 rounded-lg">
                      <Shield className="w-5 h-5 text-purple-600" />
                    </div>
                    <span className="font-medium">1 year warranty included</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="p-2 bg-purple-50 rounded-lg">
                      <Package className="w-5 h-5 text-purple-600" />
                    </div>
                    <span className="font-medium">Easy 30-day returns</span>
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Quantity
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center bg-gray-100 rounded-xl">
                      <button
                        onClick={decrementQuantity}
                        className="p-3 hover:bg-gray-200 rounded-l-xl transition-colors"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                      <span className="w-16 text-center font-bold text-lg">{quantity}</span>
                      <button
                        onClick={incrementQuantity}
                        className="p-3 hover:bg-gray-200 rounded-r-xl transition-colors"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                    <span className="text-gray-600">
                      Total: <span className="font-bold text-purple-600">${(product.price * quantity).toFixed(2)}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-200 ${
                    showSuccess
                      ? 'bg-green-500 text-white'
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-xl hover:scale-105'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {showSuccess ? (
                    <>
                      <span className="text-2xl">✓</span>
                      <span>Added to Cart!</span>
                    </>
                  ) : isAdding ? (
                    <span>Adding...</span>
                  ) : (
                    <>
                      <ShoppingCart className="w-6 h-6" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleWishlist}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-200 border-2 ${
                    inWishlist
                      ? 'bg-red-50 border-red-500 text-red-600 hover:bg-red-100'
                      : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  <Heart className={`w-6 h-6 ${inWishlist ? 'fill-current' : ''}`} />
                  <span>{inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Additional Info Section */}
          <div className="border-t border-gray-200 p-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Product Details</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• High quality materials</li>
                  <li>• Carefully crafted design</li>
                  <li>• Sustainable packaging</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Shipping Info</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Ships within 2-3 business days</li>
                  <li>• Free shipping over $50</li>
                  <li>• Track your order online</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Return Policy</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 30-day return window</li>
                  <li>• Free return shipping</li>
                  <li>• Full refund guarantee</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailModal;