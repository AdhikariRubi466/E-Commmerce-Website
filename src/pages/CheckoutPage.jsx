import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CreditCard, Truck, CheckCircle, MapPin, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';

const steps = ['Address', 'Payment', 'Confirm'];

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [placed, setPlaced] = useState(false);

  const [address, setAddress] = useState({ name: '', phone: '', line1: '', city: '', state: '', pin: '' });
  const [payment, setPayment] = useState({ method: 'card', cardNo: '', expiry: '', cvv: '', upi: '' });

  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + tax;

  const handlePlaceOrder = () => {
    setPlaced(true);
    clearCart();
    setTimeout(() => navigate('/orders'), 3000);
  };

  if (placed) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
        <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Placed! 🎉</h2>
          <p className="text-gray-500 mb-1">Your order has been confirmed.</p>
          <p className="text-gray-400 text-sm mb-6">Redirecting to your orders...</p>
          <Link to="/" className="btn-orange px-8 py-2.5">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>

        {/* Step indicators */}
        <div className="flex items-center justify-center mb-8">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center">
              <div className={`flex items-center gap-2 ${i <= step ? 'text-amazon-orange' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${i < step ? 'bg-amazon-orange text-white' : i === step ? 'border-2 border-amazon-orange text-amazon-orange' : 'border-2 border-gray-300 text-gray-400'}`}>
                  {i < step ? '✓' : i + 1}
                </div>
                <span className="font-medium text-sm hidden sm:block">{s}</span>
              </div>
              {i < steps.length - 1 && <div className={`w-16 sm:w-24 h-0.5 mx-2 ${i < step ? 'bg-amazon-orange' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            {/* Step 0: Address */}
            {step === 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><MapPin className="w-5 h-5 text-amazon-orange" /> Delivery Address</h2>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Full Name', key: 'name', col: 1 },
                    { label: 'Phone Number', key: 'phone', col: 1 },
                    { label: 'Address Line 1', key: 'line1', col: 2 },
                    { label: 'City', key: 'city', col: 1 },
                    { label: 'State', key: 'state', col: 1 },
                    { label: 'PIN Code', key: 'pin', col: 1 },
                  ].map(({ label, key, col }) => (
                    <div key={key} className={col === 2 ? 'col-span-2' : ''}>
                      <label className="text-sm font-medium text-gray-700 block mb-1">{label}</label>
                      <input
                        type="text"
                        value={address[key]}
                        onChange={(e) => setAddress({ ...address, [key]: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amazon-orange transition"
                        placeholder={label}
                      />
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="mt-6 btn-orange px-8 py-3 text-sm font-bold rounded-xl"
                >
                  Continue to Payment →
                </button>
              </div>
            )}

            {/* Step 1: Payment */}
            {step === 1 && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><CreditCard className="w-5 h-5 text-amazon-orange" /> Payment Method</h2>
                <div className="flex flex-col gap-3 mb-5">
                  {[
                    { value: 'card', label: '💳 Credit / Debit Card' },
                    { value: 'upi', label: '📱 UPI' },
                    { value: 'cod', label: '💵 Cash on Delivery' },
                    { value: 'netbanking', label: '🏦 Net Banking' },
                  ].map(({ value, label }) => (
                    <label key={value} className={`flex items-center gap-3 border-2 rounded-xl px-4 py-3 cursor-pointer transition-all ${payment.method === value ? 'border-amazon-orange bg-orange-50' : 'border-gray-200 hover:border-gray-300'}`}>
                      <input type="radio" name="payment" value={value} checked={payment.method === value} onChange={() => setPayment({ ...payment, method: value })} className="accent-amazon-orange" />
                      <span className="text-sm font-medium">{label}</span>
                    </label>
                  ))}
                </div>

                {payment.method === 'card' && (
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="col-span-2">
                      <label className="text-sm font-medium text-gray-700 block mb-1">Card Number</label>
                      <input type="text" maxLength={19} value={payment.cardNo} onChange={(e) => setPayment({ ...payment, cardNo: e.target.value })} placeholder="1234 5678 9012 3456" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amazon-orange" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">Expiry</label>
                      <input type="text" maxLength={5} value={payment.expiry} onChange={(e) => setPayment({ ...payment, expiry: e.target.value })} placeholder="MM/YY" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amazon-orange" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">CVV</label>
                      <input type="password" maxLength={4} value={payment.cvv} onChange={(e) => setPayment({ ...payment, cvv: e.target.value })} placeholder="•••" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amazon-orange" />
                    </div>
                  </div>
                )}

                {payment.method === 'upi' && (
                  <div className="mb-4">
                    <label className="text-sm font-medium text-gray-700 block mb-1">UPI ID</label>
                    <input type="text" value={payment.upi} onChange={(e) => setPayment({ ...payment, upi: e.target.value })} placeholder="yourname@upi" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amazon-orange" />
                  </div>
                )}

                <div className="flex gap-3">
                  <button onClick={() => setStep(0)} className="border-2 border-gray-300 text-gray-700 font-semibold px-6 py-2.5 rounded-xl hover:border-gray-400 transition text-sm">← Back</button>
                  <button onClick={() => setStep(2)} className="btn-orange px-8 py-2.5 rounded-xl text-sm font-bold">Review Order →</button>
                </div>
              </div>
            )}

            {/* Step 2: Review */}
            {step === 2 && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Truck className="w-5 h-5 text-amazon-orange" /> Review & Place Order</h2>
                <div className="flex flex-col gap-3 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3 items-center">
                      <img src={item.image} alt={item.title} className="w-12 h-12 object-contain border rounded-lg" />
                      <div className="flex-1">
                        <p className="text-sm font-medium line-clamp-1">{item.title}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-bold">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-gray-50 rounded-lg p-3 mb-5 text-sm">
                  <p className="font-semibold text-gray-700 mb-1">Delivery to:</p>
                  <p className="text-gray-600">{address.name || 'Your Name'}, {address.line1 || 'Your Address'}, {address.city || 'City'} - {address.pin || 'PIN'}</p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="border-2 border-gray-300 text-gray-700 font-semibold px-6 py-2.5 rounded-xl hover:border-gray-400 transition text-sm">← Back</button>
                  <button
                    onClick={handlePlaceOrder}
                    className="flex-1 flex items-center justify-center gap-2 bg-amazon-orange hover:bg-orange-500 text-white font-bold py-3 rounded-xl transition text-base shadow-md"
                  >
                    <Lock className="w-4 h-4" /> Place Order ({formatPrice(total)})
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="bg-white rounded-xl shadow-sm p-4 h-fit sticky top-24">
            <h3 className="font-bold text-gray-800 mb-3">Order Summary</h3>
            <div className="flex flex-col gap-2 text-sm text-gray-600">
              <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
              <div className="flex justify-between"><span>Tax (18%)</span><span>{formatPrice(tax)}</span></div>
              <div className="flex justify-between text-green-600"><span>Delivery</span><span>FREE</span></div>
              <hr className="my-1" />
              <div className="flex justify-between font-bold text-gray-900 text-base">
                <span>Total</span><span className="text-amazon-orange">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
