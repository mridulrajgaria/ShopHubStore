import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, ShoppingCart, Star, Gift } from 'lucide-react';

const OrderConfirmation: React.FC = () => {
  const location = useLocation();
  const order = location.state?.order;


  // Popup state for done symbol
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => setShowPopup(false), 1800);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 animate-fade-in-up">
        <h1 className="text-2xl font-bold mb-4 gradient-text">No order found</h1>
        <Link to="/products" className="text-blue-600 hover:underline">Go to Products</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 animate-fade-in-up relative overflow-hidden">
      {/* Doodles background */}
      <ShoppingBag className="absolute left-4 top-4 w-14 h-14 text-purple-200 opacity-60 animate-float z-0" />
      <ShoppingCart className="absolute right-8 top-16 w-16 h-16 text-indigo-200 opacity-50 animate-float z-0" style={{animationDelay: '1s'}} />
      <Star className="absolute left-16 bottom-8 w-10 h-10 text-yellow-200 opacity-60 animate-float z-0" style={{animationDelay: '2s'}} />
      <Gift className="absolute right-12 bottom-4 w-12 h-12 text-pink-200 opacity-60 animate-float z-0" style={{animationDelay: '1.5s'}} />
      {/* Popup checkmark overlay */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 animate-fade-in-up">
          <div className="bg-white rounded-full shadow-2xl p-8 flex flex-col items-center animate-scale-in">
            <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="45" cy="45" r="42" stroke="#6366f1" strokeWidth="6" fill="#fff" className="drop-shadow-lg" />
              <path d="M30 48L42 60L63 35" stroke="#22c55e" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="mt-4 text-lg font-bold text-green-600 animate-fade-in-down">Order Placed!</span>
          </div>
        </div>
      )}

      {/* Animated checkmark */}
      <div className="mb-6 animate-float">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="40" r="38" stroke="#6366f1" strokeWidth="4" fill="#fff" className="drop-shadow-lg" />
          <path d="M25 42L37 54L56 31" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <h1 className="text-3xl md:text-4xl font-extrabold mb-4 gradient-text animate-fade-in-down text-center drop-shadow-lg">Thank you for your order!</h1>
      <div className="bg-white/80 glass rounded-xl shadow-xl px-8 py-6 mb-6 flex flex-col items-center animate-scale-in">
        <p className="text-lg text-gray-700 mb-2">Order Number:</p>
        <span className="font-mono text-xl text-indigo-600 bg-indigo-50 px-4 py-1 rounded-lg tracking-wider mb-4 shadow-sm">{order.trackingNumber}</span>
        <p className="text-gray-600 mb-2 text-center">A confirmation email will be sent to you soon.</p>
        <p className="text-gray-500 text-sm mb-2">Estimated Delivery: <span className="font-semibold text-green-600">3-5 business days</span></p>
      </div>
      <Link to="/products" className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 text-white px-8 py-3 rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-600 font-semibold transition-all btn-glow animate-fade-in-up">Continue Shopping</Link>

      {/* Decorative animated waves at the bottom */}
      <div className="absolute bottom-0 left-0 w-full z-0 pointer-events-none">
        <svg className="w-full h-20" viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="#a5b4fc" fillOpacity=".3" d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z">
            <animate attributeName="d" dur="6s" repeatCount="indefinite" values="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z;M0,30 C360,60 1080,20 1440,30 L1440,80 L0,80 Z;M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
          </path>
        </svg>
      </div>
    </div>
  );
};

export default OrderConfirmation;
