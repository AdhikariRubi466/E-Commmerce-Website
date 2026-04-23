import { Link } from 'react-router-dom';
import HeroCarousel from '../components/HeroCarousel';
import ProductCard from '../components/ProductCard';
import { products, formatPrice } from '../data/products';
import { Flame, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';

const deals = [
  { title: "Today's Deals", icon: Flame, color: 'text-red-500', bg: 'bg-red-50', products: products.filter(p => p.discount >= 30).slice(0, 4) },
  { title: 'Best Sellers', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50', products: products.filter(p => p.reviews > 10000).slice(0, 4) },
  { title: 'New Arrivals', icon: Sparkles, color: 'text-purple-600', bg: 'bg-purple-50', products: products.filter(p => p.badge === 'New Arrival' || p.badge === 'New').slice(0, 4) || products.slice(7, 11) },
];

const categories = [
  { name: 'Electronics', img: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&q=80', link: '/search?q=Electronics' },
  { name: 'Fashion', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80', link: '/search?q=Fashion' },
  { name: 'Home & Kitchen', img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&q=80', link: '/search?q=Home' },
  { name: 'Mobiles', img: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300&q=80', link: '/search?q=Mobiles' },
  { name: 'Sports', img: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=300&q=80', link: '/search?q=Sports' },
  { name: 'Books', img: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&q=80', link: '/search?q=Books' },
  { name: 'Beauty', img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&q=80', link: '/search?q=Beauty' },
  { name: 'Toys', img: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=300&q=80', link: '/search?q=Toys' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 pt-4">
        <HeroCarousel />
      </div>

      {/* Category Quick Links */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Shop by Category</h2>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
          {categories.map((cat) => (
            <Link key={cat.name} to={cat.link} className="group flex flex-col items-center gap-2">
              <div className="w-full aspect-square rounded-full overflow-hidden border-2 border-transparent group-hover:border-amazon-orange transition-all shadow-md">
                <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" loading="lazy" />
              </div>
              <span className="text-xs font-medium text-center text-gray-700 group-hover:text-amazon-orange transition-colors">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Deal Sections */}
      {deals.map((section) => {
        const Icon = section.icon;
        return (
          <div key={section.title} className="max-w-7xl mx-auto px-4 mt-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className={`${section.bg} p-2 rounded-lg`}>
                  <Icon className={`w-5 h-5 ${section.color}`} />
                </div>
                <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
              </div>
              <Link to="/search?q=deals" className="flex items-center gap-1 text-sm text-amazon-orange hover:text-orange-600 font-medium transition-colors">
                See all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {section.products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        );
      })}

      {/* Banner Strip */}
      <div className="max-w-7xl mx-auto px-4 mt-10">
        <div className="bg-gradient-to-r from-amazon to-amazon-light rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-amazon-yellow text-sm font-semibold uppercase tracking-widest mb-1">Prime Members</p>
            <h3 className="text-white text-2xl md:text-3xl font-extrabold mb-2">Exclusive Deals & Free Delivery</h3>
            <p className="text-gray-300 text-sm">Unlimited free delivery, access to Prime Video, Music, and much more.</p>
          </div>
          <Link
            to="/login"
            className="flex-shrink-0 bg-amazon-orange hover:bg-orange-500 text-white font-bold px-8 py-3 rounded-lg transition-all shadow-lg hover:shadow-xl"
          >
            Join Prime Free →
          </Link>
        </div>
      </div>

      {/* All Products Grid */}
      <div className="max-w-7xl mx-auto px-4 mt-10 mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Featured Products</h2>
          <Link to="/search?q=all" className="flex items-center gap-1 text-sm text-amazon-orange hover:text-orange-600 font-medium">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
