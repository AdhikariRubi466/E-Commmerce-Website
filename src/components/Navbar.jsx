import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search, ShoppingCart, MapPin, ChevronDown, Menu,
  User, Package, Heart, LogOut, X
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { categories } from '../data/products';

export default function Navbar() {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showCatDropdown, setShowCatDropdown] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);

  const accountRef = useRef(null);
  const catRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (accountRef.current && !accountRef.current.contains(e.target)) setShowAccountMenu(false);
      if (catRef.current && !catRef.current.contains(e.target)) setShowCatDropdown(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <header className="sticky top-0 z-50 shadow-lg">
      {/* Main navbar */}
      <div className="bg-amazon flex items-center gap-2 px-3 py-2.5">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0 flex items-center gap-0.5 border-2 border-transparent hover:border-white rounded px-1 py-0.5 transition-colors">
          <span className="text-white font-extrabold text-2xl tracking-tight">amazon</span>
          <span className="text-amazon-orange font-extrabold text-2xl">.in</span>
        </Link>

        {/* Deliver to */}
        <Link to="/" className="hidden lg:flex flex-shrink-0 items-center gap-1 border-2 border-transparent hover:border-white rounded px-1 py-0.5 transition-colors">
          <MapPin className="w-4 h-4 text-white mt-1" />
          <div>
            <p className="text-gray-400 text-xs">Deliver to</p>
            <p className="text-white text-sm font-semibold leading-tight">India</p>
          </div>
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 items-stretch rounded-lg overflow-hidden h-10">
          {/* Category dropdown */}
          <div ref={catRef} className="relative">
            <button
              type="button"
              onClick={() => setShowCatDropdown(!showCatDropdown)}
              className="h-full bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm px-3 flex items-center gap-1 transition-colors font-medium whitespace-nowrap"
            >
              {selectedCategory === 'All' ? 'All' : selectedCategory.slice(0, 8)}
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
            {showCatDropdown && (
              <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-lg shadow-xl border z-50 py-1 max-h-72 overflow-y-auto">
                {['All', ...categories].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => { setSelectedCategory(cat); setShowCatDropdown(false); }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${selectedCategory === cat ? 'font-semibold text-amazon-orange' : 'text-gray-700'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${selectedCategory === 'All' ? 'Amazon.in' : selectedCategory}`}
            className="flex-1 px-4 text-gray-900 text-sm outline-none"
          />
          <button
            type="submit"
            className="bg-amazon-orange hover:bg-orange-500 transition-colors px-4 flex items-center justify-center"
          >
            <Search className="w-5 h-5 text-gray-900" />
          </button>
        </form>

        {/* Mobile search toggle */}
        <button
          onClick={() => setMobileSearch(!mobileSearch)}
          className="md:hidden text-white p-2 border-2 border-transparent hover:border-white rounded transition-colors"
        >
          {mobileSearch ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
        </button>

        {/* Right nav items */}
        <div className="flex items-center gap-1 ml-auto md:ml-0">
          {/* Account */}
          <div ref={accountRef} className="relative">
            <button
              onClick={() => setShowAccountMenu(!showAccountMenu)}
              className="border-2 border-transparent hover:border-white rounded px-2 py-1 transition-colors text-left"
            >
              <p className="text-gray-400 text-xs hidden sm:block">
                {user ? `Hello, ${user.name.split(' ')[0]}` : 'Hello, Sign in'}
              </p>
              <div className="flex items-center gap-0.5">
                <p className="text-white text-sm font-semibold hidden sm:block">Account & Lists</p>
                <User className="w-5 h-5 text-white sm:hidden" />
                <ChevronDown className="w-3.5 h-3.5 text-white hidden sm:block" />
              </div>
            </button>
            {showAccountMenu && (
              <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border z-50 py-2">
                {!user ? (
                  <div className="px-4 py-3 border-b">
                    <Link to="/login" onClick={() => setShowAccountMenu(false)} className="block w-full btn-orange text-center mb-2">Sign In</Link>
                    <p className="text-xs text-center text-gray-500">New customer? <Link to="/signup" className="text-amazon-orange hover:underline" onClick={() => setShowAccountMenu(false)}>Start here</Link></p>
                  </div>
                ) : (
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                )}
                <div className="py-1">
                  <Link to="/orders" onClick={() => setShowAccountMenu(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                    <Package className="w-4 h-4" /> Your Orders
                  </Link>
                  <Link to="/wishlist" onClick={() => setShowAccountMenu(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                    <Heart className="w-4 h-4" /> Wishlist
                  </Link>
                  {user && (
                    <button onClick={() => { logout(); setShowAccountMenu(false); }} className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left">
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Orders */}
          <Link to="/orders" className="hidden lg:block border-2 border-transparent hover:border-white rounded px-2 py-1 transition-colors">
            <p className="text-gray-400 text-xs">Returns</p>
            <p className="text-white text-sm font-semibold">& Orders</p>
          </Link>

          {/* Cart */}
          <Link to="/cart" className="flex items-center gap-1.5 border-2 border-transparent hover:border-white rounded px-2 py-1 transition-colors">
            <div className="relative">
              <ShoppingCart className="w-7 h-7 text-white" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-1.5 bg-amazon-orange text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </div>
            <span className="text-white text-sm font-semibold hidden sm:block">Cart</span>
          </Link>
        </div>
      </div>

      {/* Mobile search bar */}
      {mobileSearch && (
        <div className="md:hidden bg-amazon-light px-3 pb-3">
          <form onSubmit={handleSearch} className="flex rounded-lg overflow-hidden h-10">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Amazon.in..."
              className="flex-1 px-4 text-gray-900 text-sm outline-none"
              autoFocus
            />
            <button type="submit" className="bg-amazon-orange px-4 flex items-center">
              <Search className="w-5 h-5 text-gray-900" />
            </button>
          </form>
        </div>
      )}

      {/* Secondary menu bar */}
      <div className="bg-amazon-light text-white overflow-x-auto">
        <div className="flex items-center gap-1 px-3 py-1.5 min-w-max">
          <Link to="/" className="flex items-center gap-1.5 nav-link border-2 border-transparent hover:border-white rounded px-2 py-1 transition-all text-sm font-medium whitespace-nowrap">
            <Menu className="w-4 h-4" /> All
          </Link>
          {["Today's Deals", 'Customer Service', 'Electronics', 'Fashion', 'Home & Kitchen', 'Mobiles', 'Books', 'Sports', 'Beauty'].map((item) => (
            <Link
              key={item}
              to={`/search?q=${encodeURIComponent(item)}`}
              className="nav-link border-2 border-transparent hover:border-white rounded px-2 py-1 transition-all text-sm whitespace-nowrap"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
