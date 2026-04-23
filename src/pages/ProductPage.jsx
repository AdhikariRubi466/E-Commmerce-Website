import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ShoppingCart, Zap, Heart, Star, Truck, Shield,
  RotateCcw, ChevronRight, CheckCircle, ZoomIn
} from 'lucide-react';
import { products, formatPrice } from '../data/products';
import StarRating from '../components/StarRating';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === parseInt(id));
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const [selectedImg, setSelectedImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <Link to="/" className="btn-orange">Back to Home</Link>
      </div>
    );
  }

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const images = product.images || [product.image];
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product);
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center gap-1 text-xs text-gray-500">
          <Link to="/" className="hover:text-amazon-orange">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to={`/search?q=${product.category}`} className="hover:text-amazon-orange">{product.category}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-800 line-clamp-1">{product.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm p-6 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Image Gallery */}
          <div className="flex gap-3">
            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex flex-col gap-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImg(i)}
                    className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${selectedImg === i ? 'border-amazon-orange' : 'border-gray-200 hover:border-gray-400'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
            {/* Main image */}
            <div
              className="flex-1 relative rounded-xl overflow-hidden bg-gray-50 cursor-zoom-in aspect-square"
              onClick={() => setZoomed(!zoomed)}
            >
              <img
                src={images[selectedImg]}
                alt={product.title}
                className={`w-full h-full object-contain transition-transform duration-300 ${zoomed ? 'scale-150' : 'scale-100'}`}
              />
              <button className="absolute top-3 right-3 bg-white/80 p-1.5 rounded-full shadow">
                <ZoomIn className="w-4 h-4 text-gray-600" />
              </button>
              {product.badge && (
                <span className="absolute top-3 left-3 bg-amazon-orange text-white text-xs font-bold px-2 py-1 rounded-md">
                  {product.badge}
                </span>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-3">
            <p className="text-blue-600 font-medium text-sm">{product.brand}</p>
            <h1 className="text-xl font-bold text-gray-900 leading-snug">{product.title}</h1>
            <StarRating rating={product.rating} reviews={product.reviews} size="lg" />

            <hr />

            {/* Price */}
            <div>
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-3xl font-bold text-gray-900">{formatPrice(product.price)}</span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-gray-400 line-through text-lg">{formatPrice(product.originalPrice)}</span>
                    <span className="bg-red-100 text-red-600 text-sm font-bold px-2 py-0.5 rounded">
                      {product.discount}% off
                    </span>
                  </>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">Inclusive of all taxes. Free delivery on orders above ₹499.</p>
            </div>

            {/* Stock */}
            <div className={`flex items-center gap-2 text-sm font-semibold ${product.inStock ? 'text-green-600' : 'text-red-500'}`}>
              {product.inStock ? <CheckCircle className="w-4 h-4" /> : null}
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </div>

            {/* Delivery */}
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Truck className="w-4 h-4 text-gray-400" />
              <span>Free delivery by <strong>{product.deliveryDate}</strong></span>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-sm font-bold text-gray-800 mb-2">Key Features:</h3>
              <ul className="grid grid-cols-1 gap-1">
                {product.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-amazon-orange flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Buy Box */}
          <div className="lg:col-span-1">
            <div className="border-2 border-gray-200 rounded-xl p-5 sticky top-24 flex flex-col gap-4">
              <div>
                <span className="text-2xl font-bold">{formatPrice(product.price)}</span>
                {product.originalPrice > product.price && (
                  <span className="ml-2 text-sm text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                )}
              </div>

              <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                <Truck className="w-4 h-4" />
                FREE Delivery by {product.deliveryDate}
              </div>

              {/* Qty */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600 font-medium">Qty:</span>
                <select
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                  className="border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-amazon-orange"
                >
                  {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all duration-200 ${
                  added
                    ? 'bg-green-500 text-white'
                    : product.inStock
                    ? 'bg-amazon-yellow hover:bg-yellow-400 text-gray-900'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                {added ? '✓ Added to Cart!' : 'Add to Cart'}
              </button>

              <button
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm bg-amazon-orange hover:bg-orange-500 text-white transition-all duration-200 disabled:opacity-50"
              >
                <Zap className="w-5 h-5" />
                Buy Now
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-medium text-sm border-2 transition-all ${
                  wishlisted ? 'border-red-400 text-red-500 bg-red-50' : 'border-gray-300 text-gray-600 hover:border-gray-400'
                }`}
              >
                <Heart className={`w-4 h-4 ${wishlisted ? 'fill-red-500' : ''}`} />
                {wishlisted ? 'Wishlisted' : 'Add to Wishlist'}
              </button>

              <div className="flex flex-col gap-2 pt-2 border-t">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Shield className="w-3.5 h-3.5 text-green-500" /> Secure transaction
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <RotateCcw className="w-3.5 h-3.5 text-blue-500" /> 30-day return policy
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
          <h2 className="text-lg font-bold mb-3 text-gray-900">About this product</h2>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
