import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { SearchX } from 'lucide-react';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const results = products.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase()) ||
    p.brand.toLowerCase().includes(query.toLowerCase()) ||
    query.toLowerCase() === 'all' ||
    query.toLowerCase() === 'deals'
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              {results.length > 0 ? (
                <>Results for <span className="text-amazon-orange">"{query}"</span></>
              ) : (
                <>No results for "{query}"</>
              )}
            </h1>
            <p className="text-sm text-gray-500 mt-1">{results.length} products found</p>
          </div>
          <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amazon-orange">
            <option>Sort: Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Avg. Customer Review</option>
            <option>Newest Arrivals</option>
          </select>
        </div>

        {results.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {results.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <SearchX className="w-20 h-20 text-gray-200" />
            <h2 className="text-xl font-bold text-gray-600">No results found</h2>
            <p className="text-gray-400 text-sm">Try different keywords or browse all products.</p>
          </div>
        )}
      </div>
    </div>
  );
}
