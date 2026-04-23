import { Link } from 'react-router-dom';
import { Package, ChevronRight, Truck, CheckCircle } from 'lucide-react';
import { products, formatPrice } from '../data/products';

const mockOrders = [
  {
    id: 'INR-405-8923764',
    date: 'April 18, 2026',
    status: 'Delivered',
    items: [products[0], products[2]],
    total: products[0].price + products[2].price,
  },
  {
    id: 'INR-402-5671234',
    date: 'April 10, 2026',
    status: 'Shipped',
    items: [products[4]],
    total: products[4].price,
  },
  {
    id: 'INR-399-1234567',
    date: 'March 25, 2026',
    status: 'Delivered',
    items: [products[7], products[10]],
    total: products[7].price + products[10].price,
  },
];

const statusConfig = {
  Delivered: { color: 'text-green-600 bg-green-100', icon: CheckCircle },
  Shipped: { color: 'text-blue-600 bg-blue-100', icon: Truck },
  Pending: { color: 'text-yellow-600 bg-yellow-100', icon: Package },
};

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Package className="w-6 h-6 text-amazon-orange" /> Your Orders
        </h1>

        {mockOrders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Package className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-700 mb-2">No orders yet</h2>
            <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
            <Link to="/" className="btn-orange px-8 py-3">Start Shopping</Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {mockOrders.map((order) => {
              const { color, icon: StatusIcon } = statusConfig[order.status] || statusConfig.Pending;
              return (
                <div key={order.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  {/* Order header */}
                  <div className="bg-gray-50 border-b px-5 py-3 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex gap-6 text-xs text-gray-500">
                      <div>
                        <p className="font-semibold text-gray-700 text-xs uppercase tracking-wide">Order Placed</p>
                        <p className="font-medium text-gray-900 text-sm">{order.date}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-700 text-xs uppercase tracking-wide">Total</p>
                        <p className="font-medium text-gray-900 text-sm">{formatPrice(order.total)}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-700 text-xs uppercase tracking-wide">Order ID</p>
                        <p className="font-medium text-gray-900 text-sm">{order.id}</p>
                      </div>
                    </div>
                    <span className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full ${color}`}>
                      <StatusIcon className="w-3.5 h-3.5" />
                      {order.status}
                    </span>
                  </div>

                  {/* Order items */}
                  <div className="p-5 flex flex-col gap-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex gap-4 items-center">
                        <Link to={`/product/${item.id}`}>
                          <img src={item.image} alt={item.title} className="w-16 h-16 object-contain border rounded-lg hover:opacity-80 transition-opacity" />
                        </Link>
                        <div className="flex-1 min-w-0">
                          <Link to={`/product/${item.id}`} className="text-sm font-medium text-gray-800 hover:text-amazon-orange line-clamp-2">
                            {item.title}
                          </Link>
                          <p className="text-xs text-blue-600 mt-0.5">{item.brand}</p>
                          <p className="text-sm font-bold text-gray-900 mt-1">{formatPrice(item.price)}</p>
                        </div>
                        <div className="flex flex-col gap-2 flex-shrink-0">
                          <Link to={`/product/${item.id}`} className="text-xs btn-orange px-3 py-1.5">Buy Again</Link>
                          <Link to={`/product/${item.id}`} className="text-xs border border-gray-300 text-gray-700 hover:border-gray-500 text-center px-3 py-1.5 rounded-lg transition">View Item</Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
