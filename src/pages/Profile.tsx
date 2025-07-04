import React, { useContext, useEffect, useState } from 'react';
import { User as UserIcon, ShoppingBag, ShoppingCart, Star, Gift } from 'lucide-react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const { state, updateProfile } = useContext(AuthContext)!;
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.user) {
      navigate('/login');
      return;
    }
    setForm({
      firstName: state.user.firstName || '',
      lastName: state.user.lastName || '',
      email: state.user.email || '',
      password: '',
      confirmPassword: '',
    });
    setEditing(false);
    // eslint-disable-next-line
  }, [state.user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    if (form.password && form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await updateProfile({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        ...(form.password ? { password: form.password } : {}),
      });
      setMessage('Profile updated successfully!');
      setForm(f => ({ ...f, password: '', confirmPassword: '' }));
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (!state.user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-200 flex items-center justify-center relative overflow-hidden animate-fade-in-up">
      {/* Super background doodles */}
      <ShoppingBag className="absolute left-10 top-10 w-32 h-32 text-purple-200 opacity-40 animate-float z-0" />
      <ShoppingCart className="absolute right-20 top-32 w-40 h-40 text-indigo-200 opacity-30 animate-float z-0" style={{animationDelay: '1s'}} />
      <Star className="absolute left-1/4 bottom-20 w-24 h-24 text-yellow-200 opacity-30 animate-float z-0" style={{animationDelay: '2s'}} />
      <Gift className="absolute right-1/4 bottom-10 w-28 h-28 text-pink-200 opacity-30 animate-float z-0" style={{animationDelay: '1.5s'}} />
      {/* Extra SVG doodles */}
      <svg className="absolute left-1/2 top-1/3 w-80 h-80 opacity-10 -translate-x-1/2 -translate-y-1/2 z-0 animate-spin-slow" viewBox="0 0 200 200" fill="none"><circle cx="100" cy="100" r="95" stroke="#818cf8" strokeWidth="8"/><path d="M40 160 Q100 40 160 160" stroke="#a5b4fc" strokeWidth="6" fill="none"/></svg>
      <svg className="absolute right-10 bottom-1/2 w-32 h-32 opacity-10 z-0 animate-spin-slow" viewBox="0 0 100 100" fill="none"><rect x="10" y="10" width="80" height="80" rx="20" stroke="#f472b6" strokeWidth="5"/><circle cx="50" cy="50" r="30" stroke="#fbbf24" strokeWidth="4" fill="none"/></svg>

      {/* Profile card with foreground doodles */}
      <div className="relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 rounded-2xl shadow-xl p-4 sm:p-8 md:p-10 mt-8 z-10 overflow-hidden transition-all duration-300">
        {/* Foreground animated shopping doodles */}
        <ShoppingBag className="absolute left-2 top-2 w-12 h-12 text-purple-200 opacity-60 animate-float z-0" />
        <ShoppingCart className="absolute right-4 top-10 w-14 h-14 text-indigo-200 opacity-50 animate-float z-0" style={{animationDelay: '1s'}} />
        <Star className="absolute left-8 bottom-8 w-10 h-10 text-yellow-200 opacity-60 animate-float z-0" style={{animationDelay: '2s'}} />
        <Gift className="absolute right-8 bottom-4 w-12 h-12 text-pink-200 opacity-60 animate-float z-0" style={{animationDelay: '1.5s'}} />
        {/* Extra SVG doodle for more visual interest */}
        <svg className="absolute left-1/2 top-1/2 w-40 h-40 opacity-10 -translate-x-1/2 -translate-y-1/2 z-0 animate-spin-slow" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="48" stroke="#818cf8" strokeWidth="4"/><path d="M20 80 Q50 20 80 80" stroke="#a5b4fc" strokeWidth="3" fill="none"/></svg>

        {/* User avatar */}
        <div className="flex flex-col items-center z-10 relative">
          <div className="rounded-full bg-gradient-to-tr from-blue-400 via-purple-400 to-indigo-500 p-1 mb-4 shadow-lg animate-float" style={{marginTop: '-2.5rem'}}>
            <div className="bg-white rounded-full p-4 flex items-center justify-center w-24 h-24">
              <UserIcon className="w-16 h-16 text-blue-500" />
            </div>
          </div>
          <h2 className="text-3xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 animate-gradient-x text-center">My Profile</h2>
        </div>
        <div className="z-10 relative">
          {!editing ? (
            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="w-full">
                    <label className="block text-gray-700 font-semibold mb-1">First Name</label>
                    <div className="bg-white border px-4 py-3 rounded-lg shadow-sm">{state.user.firstName}</div>
                  </div>
                  <div className="w-full">
                    <label className="block text-gray-700 font-semibold mb-1">Last Name</label>
                    <div className="bg-white border px-4 py-3 rounded-lg shadow-sm">{state.user.lastName}</div>
                  </div>
                </div>
                <div className="w-full mt-2">
                  <label className="block text-gray-700 font-semibold mb-1">Email</label>
                  <div className="bg-white border px-4 py-3 rounded-lg shadow-sm">{state.user.email}</div>
                </div>
              </div>
              <button
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition-all btn-glow"
                onClick={() => setEditing(true)}
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="border px-4 py-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-300 w-full"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="border px-4 py-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-300 w-full"
                  required
                />
              </div>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="border px-4 py-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-300 w-full"
                required
              />
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="New Password (leave blank to keep current)"
                  className="border px-4 py-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-300 w-full"
                />
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className="border px-4 py-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-300 w-full"
                />
              </div>
              {error && <div className="text-red-500 text-center">{error}</div>}
              {message && <div className="text-green-600 text-center">{message}</div>}
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition-all btn-glow"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  className="w-full bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-gray-400 transition-all"
                  onClick={() => { setEditing(false); setError(null); setMessage(null); setForm({
                    firstName: state.user?.firstName || '',
                    lastName: state.user?.lastName || '',
                    email: state.user?.email || '',
                    password: '',
                    confirmPassword: '',
                  }); }}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
        {/* Extra animation for SVG doodle */}
        <style>{`
          @keyframes spin-slow { 0% { transform: rotate(0deg);} 100% { transform: rotate(360deg);} }
          .animate-spin-slow { animation: spin-slow 18s linear infinite; }
        `}</style>
      </div>
    </div>
  );
};

export default Profile;
