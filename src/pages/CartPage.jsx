import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, Tag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';

const COUPON_CODES = { 'SAVE10': 10, 'AMAZON20': 20, 'NEWUSER5': 5 };

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, subtotal, totalItems } = useCart();
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  const discount = appliedCoupon ? Math.round(subtotal * (COUPON_CODES[appliedCoupon] / 100)) : 0;
  const delivery = subtotal > 499 ? 0 : 40;
  const tax = Math.round((subtotal - discount) * 0.18);
  const total = subtotal - discount + delivery + tax;

  const handleCoupon = () => {
    const code = coupon.toUpperCase().trim();
    if (COUPON_CODES[code]) {
      setAppliedCoupon(code);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code. Try SAVE10, AMAZON20, or NEWUSER5');
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
        <ShoppingBag className="w-20 h-20 text-gray-200" />
        <h2 className="text-2xl font-bold text-gray-700">Your cart is empty</h2>
        <p className="text-gray-500">Add items to your cart to continue shopping.</p>
        <Link to="/" className="btn-orange px-8 py-3 text-base">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Shopping Cart <span className="text-gray-500 text-lg font-normal">({totalItems} items)</span>
        </h1>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm p-4 flex gap-4">
                <Link to={`/product/${item.id}`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 object-contain rounded-lg border border-gray-100 hover:opacity-80 transition-opacity"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item.id}`} className="text-sm font-medium text-gray-800 hover:text-amazon-orange line-clamp-2 leading-snug">
                    {item.title}
                  </Link>
                  <p className="text-xs text-blue-600 mt-0.5">{item.brand}</p>
                  <p className="text-green-600 text-xs mt-1">In Stock</p>

                  <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
                    {/* Quantity */}
                    <div className="flex items-center gap-0 border border-gray-300 rounded-lg overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-gray-100 transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-4 py-1.5 text-sm font-semibold border-x border-gray-300 min-w-[3rem] text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-gray-100 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="flex items-center gap-1 text-red-500 hover:text-red-700 text-xs font-medium transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="text-right flex-shrink-0">
                  <p className="font-bold text-gray-900">{formatPrice(item.price * item.quantity)}</p>
                  {item.quantity > 1 && (
                    <p className="text-xs text-gray-500">{formatPrice(item.price)} each</p>
                  )}
                  {item.originalPrice > item.price && (
                    <p className="text-xs text-gray-400 line-through">{formatPrice(item.originalPrice)}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="flex flex-col gap-4">
            {/* Coupon */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Tag className="w-4 h-4 text-amazon-orange" /> Promo Code
              </h3>
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                  <span className="text-green-700 text-sm font-semibold">✓ {appliedCoupon} applied! {COUPON_CODES[appliedCoupon]}% off</span>
                  <button onClick={() => { setAppliedCoupon(null); setCoupon(''); }} className="text-gray-400 hover:text-red-500 text-xs">✕</button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amazon-orange"
                  />
                  <button onClick={handleCoupon} className="btn-orange px-4">Apply</button>
                </div>
              )}
              {couponError && <p className="text-red-500 text-xs mt-2">{couponError}</p>}
            </div>

            {/* Summary */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h3 className="font-semibold text-gray-800 mb-4 text-lg">Order Summary</h3>
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Coupon Discount</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span className={delivery === 0 ? 'text-green-600 font-medium' : ''}>
                    {delivery === 0 ? 'FREE' : formatPrice(delivery)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (18% GST)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Order Total</span>
                  <span className="text-amazon-orange">{formatPrice(total)}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full mt-4 flex items-center justify-center gap-2 bg-amazon-orange hover:bg-orange-500 text-white font-bold py-3 rounded-xl transition-all text-base shadow-md hover:shadow-lg"
              >
                Proceed to Checkout <ArrowRight className="w-5 h-5" />
              </button>

              <div className="mt-3 text-xs text-gray-500 text-center flex items-center justify-center gap-1">
                🔒 Secure Checkout
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
