import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { ArrowRight, Star, Shield, Truck, Headphones, Sparkles, TrendingUp, Award } from 'lucide-react';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: { url: string; alt: string }[];
  rating: number;
  numReviews: number;
  stock: number;
  category: string;
}

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Use the correct API URL from environment variables
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.get(`${apiUrl}/products/featured`);
      
      if (response.data.success) {
        setFeaturedProducts(response.data.data);
      } else {
        // If no featured products endpoint, fetch regular products
        const fallbackResponse = await axios.get(`${apiUrl}/products?limit=8`);
        if (fallbackResponse.data.success) {
          setFeaturedProducts(fallbackResponse.data.data);
        }
      }
    } catch (error: any) {
      console.error('Error fetching featured products:', error);
      
      // More specific error handling
      if (error.code === 'ERR_NETWORK') {
        setError('Unable to connect to server. Please ensure the backend is running and the API URL is correct.');
      } else if (error.response?.status === 404) {
        setError('Featured products endpoint not found. Using sample data.');
        // Set some sample data for demonstration
        setSampleProducts();
      } else {
        setError('Failed to load featured products. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const setSampleProducts = () => {
    const sampleProducts: Product[] = [
      {
        _id: '1',
        name: 'Premium Wireless Headphones',
        description: 'High-quality wireless headphones with noise cancellation',
        price: 199.99,
        originalPrice: 249.99,
        images: [{ url: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg', alt: 'Wireless Headphones' }],
        rating: 4.8,
        numReviews: 124,
        stock: 15,
        category: 'Electronics'
      },
      {
        _id: '2',
        name: 'Smart Fitness Watch',
        description: 'Advanced fitness tracking with heart rate monitor',
        price: 299.99,
        originalPrice: 399.99,
        images: [{ url: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg', alt: 'Smart Watch' }],
        rating: 4.6,
        numReviews: 89,
        stock: 8,
        category: 'Electronics'
      },
      {
        _id: '3',
        name: 'Organic Cotton T-Shirt',
        description: 'Comfortable and sustainable organic cotton tee',
        price: 29.99,
        originalPrice: 39.99,
        images: [{ url: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg', alt: 'Cotton T-Shirt' }],
        rating: 4.4,
        numReviews: 67,
        stock: 25,
        category: 'Clothing'
      },
      {
        _id: '4',
        name: 'Minimalist Desk Lamp',
        description: 'Modern LED desk lamp with adjustable brightness',
        price: 79.99,
        images: [{ url: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg', alt: 'Desk Lamp' }],
        rating: 4.7,
        numReviews: 43,
        stock: 12,
        category: 'Home & Garden'
      }
    ];
    setFeaturedProducts(sampleProducts);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const categories = [
    {
      name: 'Electronics',
      image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      count: '2.3k products',
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      name: 'Clothing',
      image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      count: '1.8k products',
      gradient: 'from-pink-500 to-rose-600'
    },
    {
      name: 'Home & Garden',
      image: 'https://images.pexels.com/photos/1599791/pexels-photo-1599791.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      count: '950 products',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      name: 'Sports & Outdoors',
      image: 'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      count: '750 products',
      gradient: 'from-orange-500 to-red-600'
    }
  ];

  const features = [
    {
      icon: <Truck className="h-8 w-8 text-blue-600" />,
      title: 'Free Shipping',
      description: 'Free shipping on orders over $50',
      color: 'blue'
    },
    {
      icon: <Shield className="h-8 w-8 text-green-600" />,
      title: 'Secure Payment',
      description: '100% secure payment processing',
      color: 'green'
    },
    {
      icon: <Award className="h-8 w-8 text-yellow-600" />,
      title: 'Quality Products',
      description: 'Premium quality guaranteed',
      color: 'yellow'
    },
    {
      icon: <Headphones className="h-8 w-8 text-purple-600" />,
      title: '24/7 Support',
      description: 'Customer support around the clock',
      color: 'purple'
    }
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section with Enhanced Animations */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-700 to-indigo-800 text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white opacity-5 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-blue-300 opacity-10 rounded-full animate-bounce" style={{ animationDuration: '3s' }}></div>
          <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-purple-300 opacity-10 rounded-full animate-ping" style={{ animationDuration: '4s' }}></div>
        </div>

        {/* Animated SVG Wave at bottom */}
        <div className="wave" style={{ bottom: 0 }}>
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path fill="url(#wave-gradient)" fillOpacity="0.5" d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z"></path>
            <defs>
              <linearGradient id="wave-gradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="50%" stopColor="#a21caf" />
                <stop offset="100%" stopColor="#2563eb" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="text-center">
            <div className="animate-fade-in-up">
              <div className="flex justify-center mb-6">
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 animate-bounce">
                  <Sparkles className="h-5 w-5 text-yellow-300" />
                  <span className="text-sm font-medium">New Arrivals</span>
                  <TrendingUp className="h-5 w-5 text-green-300" />
                </div>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent leading-tight">
                <span
                  style={{
                    lineHeight: '1.25', // slightly increased line height
                    paddingBottom: '0.5rem', // extra bottom padding
                    marginBottom: '1.5rem', // more space below
                    overflow: 'visible',
                    display: 'inline-block',
                    zIndex: 1
                  }}
                >
                  Discover Amazing Products
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
                Shop the latest trends with unbeatable prices and premium quality
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto sm:max-w-none">
                <Link
                  to="/products"
                  className="group bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 inline-flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full sm:w-auto"
                >
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/products?category=Electronics"
                  className="group border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 backdrop-blur-sm hover:shadow-lg transform hover:-translate-y-1 w-full sm:w-auto"
                >
                  Explore Electronics
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Staggered Animations */}
      <section className="py-20 px-0 sm:px-4 bg-gradient-to-br from-blue-100 via-purple-100 to-white relative overflow-hidden animate-fade-in-up">
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-r from-blue-200/60 via-purple-200/60 to-indigo-200/60 blur-2xl opacity-70 pointer-events-none animate-float"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-32 bg-gradient-to-l from-indigo-200/40 via-purple-200/40 to-blue-200/40 blur-2xl opacity-60 pointer-events-none animate-float"></div>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 gradient-text animate-fade-in-down drop-shadow-lg tracking-tight">Featured Products</h2>
            <p className="text-lg text-gray-700 animate-fade-in-up">Handpicked favorites just for you</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group text-center p-8 rounded-3xl bg-white/80 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 animate-fade-in-up"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <div className="flex justify-center mb-6">
                  <div className={`p-4 rounded-full bg-gradient-to-br from-${feature.color}-200 to-${feature.color}-400 shadow-lg group-hover:scale-110 transition-transform duration-300 animate-glow`}>
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-gray-900 transition-colors drop-shadow-sm">{feature.title}</h3>
                <p className="text-gray-600 text-base leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section with Enhanced Visuals */}
      <section className="py-20 pb-24 px-0 sm:px-4 bg-gradient-to-br from-white via-blue-100 to-purple-100 relative overflow-hidden animate-fade-in-up">
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-r from-purple-200/60 via-blue-200/60 to-indigo-200/60 blur-2xl opacity-70 pointer-events-none animate-float z-0"></div>
        <div className="absolute top-0 right-0 w-1/2 h-32 bg-gradient-to-l from-blue-200/40 via-purple-200/40 to-indigo-200/40 blur-2xl opacity-60 pointer-events-none animate-float z-0"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pb-20">
          <div className="bg-white/90 rounded-3xl shadow-2xl p-8 sm:p-12 lg:p-16" style={{paddingBottom: '4.5rem'}}>
            <div className="text-center mb-12">
            <h2
              className="text-3xl sm:text-4xl font-extrabold mb-4 gradient-text animate-fade-in-down drop-shadow-lg tracking-tight capitalize"
              style={{
                lineHeight: '1.25', // slightly increased line height
                paddingBottom: '0.5rem', // extra bottom padding
                marginBottom: '1.5rem', // more space below
                overflow: 'visible',
                zIndex: 1
              }}
            >
              Shop By Category
            </h2>
            <p className="text-lg text-gray-700 animate-fade-in-up">Find exactly what you're looking for</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {categories.map((category, index) => (
                <Link
                  key={index}
                  to={`/products?category=${encodeURIComponent(category.name)}`}
                  className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up"
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  <div className="aspect-square relative">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-70 group-hover:opacity-80 transition-opacity duration-300`}></div>
                    <div className="absolute inset-0 flex flex-col justify-end p-6 text-white pb-4">
                      <h3 className="text-xl sm:text-2xl font-bold mb-1 transform group-hover:translate-y-0 transition-transform duration-300 drop-shadow-lg">
                        {category.name}
                      </h3>
                      <p className="text-sm sm:text-base opacity-90 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-100 drop-shadow">
                        {category.count}
                      </p>
                    </div>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                      <ArrowRight className="h-6 w-6 text-white drop-shadow-lg" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 px-0 sm:px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-white relative overflow-hidden animate-fade-in-up mb-16">
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-r from-blue-200/60 via-purple-200/60 to-indigo-200/60 blur-2xl opacity-70 pointer-events-none animate-float"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-32 bg-gradient-to-l from-indigo-200/40 via-purple-200/40 to-blue-200/40 blur-2xl opacity-60 pointer-events-none animate-float"></div>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 gradient-text animate-fade-in-down drop-shadow-lg tracking-tight uppercase">Featured Products</h2>
            <p className="text-xl text-gray-700 animate-fade-in-up font-medium">Handpicked favorites just for you</p>
          </div>
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="relative">
                <LoadingSpinner size="lg" />
                <p className="mt-4 text-gray-600 animate-pulse">Loading amazing products...</p>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md mx-auto">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-red-100 rounded-full">
                    <Shield className="h-6 w-6 text-red-600" />
                  </div>
                </div>
                <p className="text-red-800 mb-4 font-medium">{error}</p>
                <button
                  onClick={fetchFeaturedProducts}
                  className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors duration-300 transform hover:scale-105"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : featuredProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {featuredProducts.slice(0, 8).map((product, index) => (
                  <div 
                    key={product._id}
                    className="bg-white/90 rounded-3xl shadow-2xl hover:shadow-3xl p-8 transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
              <div className="text-center mt-12">
                <Link
                  to="/products"
                  className="group bg-blue-600 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-semibold hover:bg-blue-700 transition-all duration-300 inline-flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg"
                >
                  View All Products
                  <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 max-w-md mx-auto">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-gray-100 rounded-full">
                    <Star className="h-6 w-6 text-gray-400" />
                  </div>
                </div>
                <p className="text-gray-600 mb-4">No featured products available</p>
                <Link
                  to="/products"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
                >
                  Browse All Products
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Newsletter Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/5 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-blue-100 text-base sm:text-lg mb-8 leading-relaxed">
              Subscribe to our newsletter for the latest deals, exclusive offers, and new product launches
            </p>
            
            {isSubscribed ? (
              <div className="bg-green-500 text-white px-6 py-4 rounded-xl inline-flex items-center animate-bounce">
                <Star className="h-5 w-5 mr-2" />
                Thank you for subscribing!
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 px-4 py-3 rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-300/50 transition-all duration-300 placeholder-gray-500"
                  />
                  <button 
                    type="submit"
                    className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;