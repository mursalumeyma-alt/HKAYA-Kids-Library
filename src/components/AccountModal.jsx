import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import {
  X,
  User,
  ShieldCheck,
  Package,
  BookOpen,
  LogOut,
  LogIn,
  UserPlus,
  AlertCircle,
  Loader2,
  Clock,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';

export default function AccountModal() {
  const { isAccountOpen, setIsAccountOpen, navigateTo } = useStore();
  const { user, login, register, logout, isAdmin } = useAuth();

  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'profile' | 'library'

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // User orders
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  // Fetch orders when open and user authenticated
  useEffect(() => {
    if (isAccountOpen && user) {
      setOrdersLoading(true);
      api.orders.getMyOrders()
        .then(res => {
          if (res.success) {
            setOrders(res.orders || []);
          }
        })
        .catch(err => {
          console.error('Error fetching orders:', err);
        })
        .finally(() => {
          setOrdersLoading(false);
        });
    }
  }, [isAccountOpen, user]);

  if (!isAccountOpen) return null;

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    setLoading(true);
    const res = await login(email, password);
    setLoading(false);
    if (!res.success) {
      setFormError(res.error || 'Failed to sign in.');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    setLoading(true);
    const res = await register({ name, email, password, phone });
    setLoading(false);
    if (!res.success) {
      setFormError(res.error || 'Failed to create account.');
    }
  };

  const handleQuickAdminFill = () => {
    setEmail('admin@hkayalibrary.co.ke');
    setPassword('HkayaAdmin2026!Secure');
    setAuthMode('login');
  };

  const handleOpenAdminView = () => {
    setIsAccountOpen(false);
    navigateTo('admin');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6">
      <div
        className="fixed inset-0 bg-charcoal/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsAccountOpen(false)}
      />

      <div className="relative w-full max-w-lg bg-cream-50 rounded-3xl shadow-2xl border border-sand-200 overflow-hidden z-10 flex flex-col my-auto max-h-[90vh]">
        {/* Top Header */}
        <div className="px-6 py-5 bg-white border-b border-sand-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-forest-100 text-forest-800 flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-forest-900">
                {user ? user.name : 'Parent Portal & Sign In'}
              </h3>
              <p className="text-[11px] text-charcoal-muted">
                {user ? (isAdmin ? 'Administrator Account' : 'Customer Account') : 'Sign in to track orders and save favorites'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAccountOpen(false)}
            className="p-2 rounded-xl text-charcoal-muted hover:text-charcoal hover:bg-sand-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto">
          {formError && (
            <div className="mb-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* 1. NOT LOGGED IN STATE */}
          {!user ? (
            <div className="space-y-4">
              <div className="flex bg-sand-200/80 p-1 rounded-2xl text-xs font-bold">
                <button
                  type="button"
                  onClick={() => { setAuthMode('login'); setFormError(null); }}
                  className={`flex-1 py-2 rounded-xl transition-all ${
                    authMode === 'login' ? 'bg-white text-forest-900 shadow-xs' : 'text-charcoal-muted hover:text-charcoal'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => { setAuthMode('register'); setFormError(null); }}
                  className={`flex-1 py-2 rounded-xl transition-all ${
                    authMode === 'register' ? 'bg-white text-forest-900 shadow-xs' : 'text-charcoal-muted hover:text-charcoal'
                  }`}
                >
                  Create Account
                </button>
              </div>

              {authMode === 'login' ? (
                <form onSubmit={handleLoginSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-forest-900 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="parent@example.com"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-sand-300 text-xs text-charcoal focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-forest-900 mb-1">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-sand-300 text-xs text-charcoal focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-2xl bg-terracotta-600 hover:bg-terracotta-700 text-white font-bold text-xs shadow-soft transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}
                    <span>Sign In</span>
                  </button>

                  <div className="pt-3 border-t border-sand-200/80 text-center">
                    <button
                      type="button"
                      onClick={handleQuickAdminFill}
                      className="text-[11px] text-terracotta-700 hover:underline font-semibold"
                    >
                      Fill Administrator Credentials
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-forest-900 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Amina Hassan"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-sand-300 text-xs text-charcoal focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-forest-900 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="amina@example.com"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-sand-300 text-xs text-charcoal focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-forest-900 mb-1">Kenyan Mobile Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0712 345 678"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-sand-300 text-xs text-charcoal focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-forest-900 mb-1">Password (min 8 chars)</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      minLength={8}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-sand-300 text-xs text-charcoal focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-2xl bg-forest-800 hover:bg-forest-900 text-white font-bold text-xs shadow-soft transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
                    <span>Create Account</span>
                  </button>
                </form>
              )}
            </div>
          ) : (
            /* 2. LOGGED IN STATE */
            <div>
              {/* Admin Banner if Admin */}
              {isAdmin && (
                <div className="mb-4 p-3.5 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-amber-900 font-bold">
                    <ShieldAlert className="w-4 h-4 text-amber-700" />
                    <span>Administrator Access</span>
                  </div>
                  <button
                    onClick={handleOpenAdminView}
                    className="px-3 py-1.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-white text-xs font-bold flex items-center gap-1 shadow-xs"
                  >
                    <span>Admin Dashboard</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              )}

              {/* Navigation Tabs */}
              <div className="flex gap-2 border-b border-sand-200 pb-2 mb-4 text-xs font-bold">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`pb-2 px-1 border-b-2 ${
                    activeTab === 'orders' ? 'border-terracotta-600 text-terracotta-700' : 'border-transparent text-charcoal-muted'
                  }`}
                >
                  My Orders ({orders.length})
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`pb-2 px-1 border-b-2 ${
                    activeTab === 'profile' ? 'border-terracotta-600 text-terracotta-700' : 'border-transparent text-charcoal-muted'
                  }`}
                >
                  Profile & Contacts
                </button>
              </div>

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div>
                  {ordersLoading ? (
                    <div className="py-8 text-center text-xs text-charcoal-muted flex flex-col items-center gap-2">
                      <Loader2 className="w-6 h-6 animate-spin text-terracotta-600" />
                      <span>Loading your order history from server...</span>
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="py-8 text-center text-xs text-charcoal-muted">
                      <Package className="w-10 h-10 text-sand-300 mx-auto mb-2" />
                      <p className="font-semibold text-forest-900">No Orders Yet</p>
                      <p className="mt-1">When you place an order, your official order ID and status will appear here.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {orders.map((ord) => (
                        <div key={ord.id} className="p-4 rounded-2xl bg-white border border-sand-200 shadow-xs text-xs space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-mono font-bold text-forest-900">{ord.id}</span>
                            <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] uppercase ${
                              ord.payment_status === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                            }`}>
                              {ord.payment_status}
                            </span>
                          </div>

                          <div className="text-charcoal-muted flex justify-between">
                            <span>Status: <strong className="capitalize text-charcoal">{ord.status}</strong></span>
                            <span>{new Date(ord.created_at).toLocaleDateString()}</span>
                          </div>

                          <div className="pt-2 border-t border-sand-200 flex justify-between font-bold text-forest-900">
                            <span>Total (KSh {ord.total.toLocaleString()})</span>
                            <span className="text-charcoal-muted font-normal">{ord.items.length} items</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="space-y-3 text-xs bg-white p-4 rounded-2xl border border-sand-200">
                  <div className="flex justify-between border-b border-sand-200 pb-2">
                    <span className="text-charcoal-muted">Name:</span>
                    <span className="font-bold text-forest-900">{user.name}</span>
                  </div>
                  <div className="flex justify-between border-b border-sand-200 pb-2">
                    <span className="text-charcoal-muted">Email:</span>
                    <span className="font-bold text-forest-900">{user.email}</span>
                  </div>
                  <div className="flex justify-between border-b border-sand-200 pb-2">
                    <span className="text-charcoal-muted">Phone:</span>
                    <span className="font-bold text-forest-900">{user.phone || 'Not provided'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal-muted">Account Role:</span>
                    <span className="font-bold text-terracotta-700 capitalize">{user.role}</span>
                  </div>
                </div>
              )}

              {/* Sign Out Button */}
              <div className="pt-5 border-t border-sand-200 mt-5">
                <button
                  onClick={logout}
                  className="w-full py-2.5 rounded-xl border border-sand-300 hover:bg-sand-100 text-charcoal text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <LogOut className="w-4 h-4 text-charcoal-muted" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
