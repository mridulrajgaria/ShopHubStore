import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Checkout: React.FC = () => {
  const { state: cartState, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '', lastName: '', street: '', city: '', state: '', zipCode: '', country: '', phone: '',
    paymentMethod: 'Credit Card',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subtotal = cartState.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal + tax + shipping;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const orderItems = cartState.items.map(item => ({
        product: item.product._id,
        name: item.product.name,
        image: item.product.images[0]?.url || '',
        price: item.price,
        quantity: item.quantity,
      }));
      const shippingAddress = {
        firstName: form.firstName,
        lastName: form.lastName,
        street: form.street,
        city: form.city,
        state: form.state,
        zipCode: form.zipCode,
        country: form.country,
        phone: form.phone,
      };
      const res = await axios.post('/orders', {
        orderItems,
        shippingAddress,
        paymentMethod: form.paymentMethod,
        itemsPrice: subtotal,
        taxPrice: tax,
        shippingPrice: shipping,
        totalPrice: total,
      });
      if (res.data.success) {
        await clearCart();
        navigate('/order-confirmation', { state: { order: res.data.data } });
      } else {
        setError(res.data.message || 'Order failed');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Order failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-8 max-w-md w-full space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input name="firstName" value={form.firstName} onChange={handleChange} required placeholder="First Name" className="border p-2 rounded" />
          <input name="lastName" value={form.lastName} onChange={handleChange} required placeholder="Last Name" className="border p-2 rounded" />
        </div>
        <input name="street" value={form.street} onChange={handleChange} required placeholder="Street Address" className="border p-2 rounded w-full" />
        <div className="grid grid-cols-2 gap-4">
          <input name="city" value={form.city} onChange={handleChange} required placeholder="City" className="border p-2 rounded" />
          <input name="state" value={form.state} onChange={handleChange} required placeholder="State" className="border p-2 rounded" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input name="zipCode" value={form.zipCode} onChange={handleChange} required placeholder="Zip Code" className="border p-2 rounded" />
          <input name="country" value={form.country} onChange={handleChange} required placeholder="Country" className="border p-2 rounded" />
        </div>
        <input name="phone" value={form.phone} onChange={handleChange} required placeholder="Phone Number" className="border p-2 rounded w-full" />
        <div>
          <label className="block mb-1 font-medium">Payment Method</label>
          <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange} className="border p-2 rounded w-full">
            <option value="Credit Card">Credit Card</option>
            <option value="PayPal">PayPal</option>
            <option value="Cash on Delivery">Cash on Delivery</option>
          </select>
        </div>
        <div className="bg-gray-50 rounded p-4 mt-4">
          <div className="flex justify-between mb-2"><span>Subtotal:</span><span>${subtotal.toFixed(2)}</span></div>
          <div className="flex justify-between mb-2"><span>Tax (8%):</span><span>${tax.toFixed(2)}</span></div>
          <div className="flex justify-between mb-2"><span>Shipping:</span><span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span></div>
          <div className="flex justify-between font-bold text-lg"><span>Total:</span><span>${total.toFixed(2)}</span></div>
        </div>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium mt-4">
          {loading ? 'Placing Order...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
