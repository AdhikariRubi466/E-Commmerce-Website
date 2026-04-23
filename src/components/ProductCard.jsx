import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Zap } from 'lucide-react';
import StarRating from './StarRating';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatPrice } from '../data/products';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    toggleWishlist(product);
  };

  const wishlisted = isWishlisted(product.id);

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full border border-gray-100 hover:-translate-y-1">
        {/* Image */}
        <div className="relative overflow-hidden bg-gray-50 aspect-square">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {/* Badge */}
          {product.badge && (
            <span className="absolute top-2 left-2 bg-amazon-orange text-white text-xs font-bold px-2 py-1 rounded-md">
              {product.badge}
            </span>
          )}
          {/* Discount badge */}
          {product.discount > 0 && (
            <span className="absolute top-2 right-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
              -{product.discount}%
            </span>
          )}
          {/* Wishlist */}
          <button
            onClick={handleWishlist}
            className={`absolute top-2 right-2 p-1.5 rounded-full transition-all duration-200 shadow-md ${
              wishlisted ? 'bg-red-50 text-red-500' : 'bg-white text-gray-400 hover:text-red-500'
            }`}
          >
            <Heart className={`w-4 h-4 ${wishlisted ? 'fill-red-500' : ''}`} />
          </button>
          {/* Out of stock overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="bg-white text-gray-800 text-sm font-semibold px-3 py-1 rounded-full">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-3 flex flex-col flex-1 gap-2">
          <p className="text-xs text-blue-600 font-medium uppercase tracking-wide">{product.brand}</p>
          <h3 className="text-sm font-medium text-gray-800 line-clamp-2 leading-snug">{product.title}</h3>
          <StarRating rating={product.rating} reviews={product.reviews} />

          {/* Price */}
          <div className="flex items-baseline gap-2 mt-auto">
            <span className="text-lg font-bold text-gray-900">{formatPrice(product.price)}</span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>

          {/* Delivery */}
          <p className="text-xs text-green-600 font-medium">
            {product.inStock ? `✓ Get it by ${product.deliveryDate}` : '✗ Currently unavailable'}
          </p>

          {/* Buttons */}
          <div className="flex gap-2 mt-1">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                added
                  ? 'bg-green-500 text-white'
                  : product.inStock
                  ? 'bg-amazon-yellow hover:bg-yellow-400 text-gray-900'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              {added ? 'Added!' : 'Add to Cart'}
            </button>
            <Link
              to={`/product/${product.id}`}
              onClick={(e) => e.stopPropagation()}
              className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-xs font-semibold bg-amazon-orange hover:bg-orange-500 text-white transition-all duration-200"
            >
              <Zap className="w-3.5 h-3.5" />
              Buy Now
            </Link>
          </div>
        </div>
      </div>
    </Link>
  );
}
