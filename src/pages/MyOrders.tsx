import React, { useEffect, useState } from 'react';
import { ShoppingBag, ShoppingCart, Star, Gift } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Order {
  _id: string;
  trackingNumber: string;
  createdAt: string;
  totalPrice: number;
  status: string;
  orderItems: Array<{
    product: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
  }>;
}

const MyOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get('/orders');
        setOrders(res.data.data.orders || []);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 relative overflow-hidden">
      {/* Doodles background */}
      <ShoppingBag className="absolute left-4 top-4 w-14 h-14 text-purple-200 opacity-60 animate-float z-0" />
      <ShoppingCart className="absolute right-8 top-16 w-16 h-16 text-indigo-200 opacity-50 animate-float z-0" style={{animationDelay: '1s'}} />
      <Star className="absolute left-16 bottom-8 w-10 h-10 text-yellow-200 opacity-60 animate-float z-0" style={{animationDelay: '2s'}} />
      <Gift className="absolute right-12 bottom-4 w-12 h-12 text-pink-200 opacity-60 animate-float z-0" style={{animationDelay: '1.5s'}} />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">My Orders</h1>
        {orders.length === 0 ? (
          <div className="text-center text-gray-600">You have no orders yet.</div>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <div key={order._id} className="bg-white rounded-xl shadow p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <div>
                    <div className="font-semibold">Order #{order.trackingNumber}</div>
                    <div className="text-gray-500 text-sm">Placed on {new Date(order.createdAt).toLocaleDateString()}</div>
                  </div>
                  <div className="mt-2 md:mt-0 text-blue-600 font-bold text-lg">${order.totalPrice.toFixed(2)}</div>
                </div>
                <div className="mb-2 text-sm text-gray-700">Status: <span className="font-medium">{order.status}</span></div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="text-left text-gray-500">
                        <th className="pr-4">Product</th>
                        <th className="pr-4">Qty</th>
                        <th className="pr-4">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.orderItems.map((item, idx) => (
                        <tr key={idx}>
                          <td className="pr-4 py-1 flex items-center">
                            <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded mr-2" />
                            {item.name}
                          </td>
                          <td className="pr-4 py-1">{item.quantity}</td>
                          <td className="pr-4 py-1">${item.price.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
