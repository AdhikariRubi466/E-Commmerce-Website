import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';
import StarRating from '../components/StarRating';

export default function WishlistPage() {
  const { items, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
        <Heart className="w-20 h-20 text-gray-200" />
        <h2 className="text-2xl font-bold text-gray-700">Your wishlist is empty</h2>
        <p className="text-gray-500">Save items you love by clicking the heart icon.</p>
        <Link to="/" className="btn-orange px-8 py-3 text-base">Discover Products</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Heart className="w-6 h-6 text-red-500 fill-red-500" /> My Wishlist
          <span className="text-gray-400 font-normal text-lg">({items.length})</span>
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 group hover:shadow-lg transition-shadow">
              <div className="relative aspect-square bg-gray-50">
                <Link to={`/product/${item.id}`}>
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                </Link>
                <button
                  onClick={() => toggleWishlist(item)}
                  className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow text-red-500 hover:text-red-700 transition-colors"
                  title="Remove from wishlist"
                >
                  <Heart className="w-4 h-4 fill-red-500" />
                </button>
              </div>
              <div className="p-3 flex flex-col gap-2">
                <Link to={`/product/${item.id}`} className="text-sm font-medium text-gray-800 line-clamp-2 hover:text-amazon-orange">{item.title}</Link>
                <StarRating rating={item.rating} reviews={item.reviews} />
                <div className="flex items-baseline gap-1.5">
                  <span className="font-bold text-gray-900">{formatPrice(item.price)}</span>
                  {item.originalPrice > item.price && (
                    <span className="text-xs text-gray-400 line-through">{formatPrice(item.originalPrice)}</span>
                  )}
                </div>
                <button
                  onClick={() => { addToCart(item); toggleWishlist(item); }}
                  disabled={!item.inStock}
                  className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-semibold bg-amazon-yellow hover:bg-yellow-400 text-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="w-4 h-4" />
                  {item.inStock ? 'Move to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
