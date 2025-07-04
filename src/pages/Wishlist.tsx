import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../contexts/WishlistContext';
import { Heart, ShoppingBag, ShoppingCart, Star, Gift } from 'lucide-react';

const Wishlist: React.FC = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 relative overflow-hidden">
        {/* Doodles background */}
        <ShoppingBag className="absolute left-4 top-4 w-14 h-14 text-purple-200 opacity-60 animate-float z-0" />
        <ShoppingCart className="absolute right-8 top-16 w-16 h-16 text-indigo-200 opacity-50 animate-float z-0" style={{animationDelay: '1s'}} />
        <Star className="absolute left-16 bottom-8 w-10 h-10 text-yellow-200 opacity-60 animate-float z-0" style={{animationDelay: '2s'}} />
        <Gift className="absolute right-12 bottom-4 w-12 h-12 text-pink-200 opacity-60 animate-float z-0" style={{animationDelay: '1.5s'}} />
        <Heart className="h-16 w-16 text-gray-300 mb-4 z-10" />
        <h2 className="text-2xl font-bold mb-2 z-10">Your wishlist is empty</h2>
        <p className="text-gray-600 mb-6 z-10">Browse products and add your favorites to your wishlist.</p>
        <Link to="/products" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors z-10">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 relative overflow-hidden">
      {/* Doodles background */}
      <ShoppingBag className="absolute left-4 top-4 w-14 h-14 text-purple-200 opacity-60 animate-float z-0" />
      <ShoppingCart className="absolute right-8 top-16 w-16 h-16 text-indigo-200 opacity-50 animate-float z-0" style={{animationDelay: '1s'}} />
      <Star className="absolute left-16 bottom-8 w-10 h-10 text-yellow-200 opacity-60 animate-float z-0" style={{animationDelay: '2s'}} />
      <Gift className="absolute right-12 bottom-4 w-12 h-12 text-pink-200 opacity-60 animate-float z-0" style={{animationDelay: '1.5s'}} />
      <div className="max-w-4xl mx-auto z-10 relative">
        <h1 className="text-3xl font-bold mb-8 text-center">My Wishlist</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {wishlist.map((item) => (
            <Link
              key={item._id}
              to={`/products/${item._id}`}
              className="bg-white rounded-xl shadow p-6 flex flex-col group hover:shadow-lg hover:scale-[1.025] transition-transform duration-200 relative"
              style={{ textDecoration: 'none' }}
            >
              <img src={item.images[0]?.url} alt={item.images[0]?.alt || item.name} className="w-full h-48 object-cover rounded-lg mb-4 group-hover:opacity-90 transition-opacity" />
              <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-700 transition-colors">{item.name}</h2>
              <p className="text-gray-600 mb-2">{item.category}</p>
              <p className="text-lg font-bold mb-4">${item.price.toFixed(2)}</p>
              <button
                onClick={e => {
                  e.preventDefault();
                  removeFromWishlist(item._id);
                }}
                className="mt-auto bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors z-10"
              >
                Remove
              </button>
              {/* Overlay to make the whole card clickable but allow button interaction */}
              <span className="absolute inset-0" aria-hidden="true"></span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
