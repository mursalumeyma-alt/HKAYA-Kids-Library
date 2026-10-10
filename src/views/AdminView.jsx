import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';
import { api } from '../services/api';
import {
  ShieldAlert,
  ShieldCheck,
  Package,
  Layers,
  CreditCard,
  Server,
  RefreshCw,
  Search,
  CheckCircle,
  Truck,
  AlertCircle,
  Edit,
  Save,
  ArrowLeft,
  Loader2
} from 'lucide-react';

export default function AdminView() {
  const { user, isAdmin } = useAuth();
  const { navigateTo } = useStore();

  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'inventory' | 'payments' | 'system'
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // Data states
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [payments, setPayments] = useState([]);
  const [systemHealth, setSystemHealth] = useState(null);

  // Inventory editing
  const [editingStockId, setEditingStockId] = useState(null);
  const [stockInput, setStockInput] = useState('');

  // Fetch data on tab change or mount
  const refreshData = async () => {
    if (!isAdmin) return;
    setLoading(true);
    setErrorMsg(null);
    try {
      if (activeTab === 'orders') {
        const res = await api.orders.getAllAdmin();
        if (res.success) setOrders(res.orders || []);
      } else if (activeTab === 'inventory') {
        const res = await api.products.getAll({ activeOnly: '0' });
        if (res.success) setProducts(res.products || []);
      } else if (activeTab === 'payments') {
        const res = await api.payments.getAllAdmin();
        if (res.success) setPayments(res.payments || []);
      } else if (activeTab === 'system') {
        const res = await api.health();
        setSystemHealth(res);
      }
    } catch (err) {
      console.error('Admin data fetch error:', err);
      setErrorMsg(err.message || 'Failed to fetch admin data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, [isAdmin, activeTab]);

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await api.orders.updateStatus(orderId, newStatus);
      if (res.success) {
        setSuccessMsg(`Order ${orderId} updated to ${newStatus}.`);
        refreshData();
        setTimeout(() => setSuccessMsg(null), 3000);
      }
    } catch (err) {
      setErrorMsg(err.message || 'Failed to update order status.');
    }
  };

  const handleSaveStock = async (productId) => {
    try {
      const qty = parseInt(stockInput, 10);
      if (isNaN(qty) || qty < 0) {
        setErrorMsg('Please enter a valid stock quantity.');
        return;
      }
      const res = await api.products.updateStock(productId, qty);
      if (res.success) {
        setSuccessMsg(`Stock for product updated to ${qty}.`);
        setEditingStockId(null);
        refreshData();
        setTimeout(() => setSuccessMsg(null), 3000);
      }
    } catch (err) {
      setErrorMsg(err.message || 'Failed to update stock.');
    }
  };

  const handleToggleMerchandising = async (productId, field, currentValue) => {
    try {
      const res = await api.products.update(productId, { [field]: !currentValue });
      if (res.success) {
        setSuccessMsg(`Updated merchandising setting (${field}) for product.`);
        refreshData();
        setTimeout(() => setSuccessMsg(null), 2500);
      }
    } catch (err) {
      setErrorMsg(err.message || 'Failed to update product merchandising.');
    }
  };

  if (!isAdmin) {
    return (
      <div className="max-w-xl mx-auto my-16 p-8 bg-white rounded-3xl border border-sand-200 shadow-soft text-center space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-rose-100 text-rose-700 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-forest-900">Access Denied</h2>
        <p className="text-xs text-charcoal-muted max-w-sm mx-auto leading-relaxed">
          The administrative control panel requires verified server-side administrator credentials.
        </p>
        <button
          onClick={() => navigateTo('home')}
          className="mt-4 px-6 py-2.5 rounded-2xl bg-forest-800 text-white font-bold text-xs"
        >
          Return to Homepage
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-sand-200">
        <div>
          <button
            onClick={() => navigateTo('home')}
            className="text-xs font-bold text-terracotta-700 hover:underline flex items-center gap-1 mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Storefront
          </button>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-forest-900 flex items-center gap-2.5">
            <ShieldCheck className="w-7 h-7 text-terracotta-600" />
            <span>HKAYA Operations & Admin</span>
          </h1>
          <p className="text-xs text-charcoal-muted mt-1">
            Server-side order processing, live stock management, and Safaricom payment audit logs.
          </p>
        </div>

        <button
          onClick={refreshData}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-sand-200 hover:bg-sand-100 text-xs font-bold text-charcoal shadow-xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* Alerts */}
      {errorMsg && (
        <div className="my-4 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="my-4 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 sm:gap-4 border-b border-sand-200 my-6 overflow-x-auto text-xs font-bold">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 px-2 border-b-2 flex items-center gap-2 ${
            activeTab === 'orders' ? 'border-terracotta-600 text-terracotta-700 font-extrabold' : 'border-transparent text-charcoal-muted'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Orders Management ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('inventory')}
          className={`pb-3 px-2 border-b-2 flex items-center gap-2 ${
            activeTab === 'inventory' ? 'border-terracotta-600 text-terracotta-700 font-extrabold' : 'border-transparent text-charcoal-muted'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Products & Stock ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('payments')}
          className={`pb-3 px-2 border-b-2 flex items-center gap-2 ${
            activeTab === 'payments' ? 'border-terracotta-600 text-terracotta-700 font-extrabold' : 'border-transparent text-charcoal-muted'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>M-Pesa & Payment Logs</span>
        </button>

        <button
          onClick={() => setActiveTab('system')}
          className={`pb-3 px-2 border-b-2 flex items-center gap-2 ${
            activeTab === 'system' ? 'border-terracotta-600 text-terracotta-700 font-extrabold' : 'border-transparent text-charcoal-muted'
          }`}
        >
          <Server className="w-4 h-4" />
          <span>System & API Health</span>
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="p-16 text-center text-xs text-charcoal-muted flex flex-col items-center gap-2">
          <Loader2 className="w-8 h-8 animate-spin text-terracotta-600" />
          <span>Connecting to secure backend server...</span>
        </div>
      ) : (
        <>
          {/* TAB 1: ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-3xl border border-sand-200">
                  <Package className="w-12 h-12 text-sand-300 mx-auto mb-3" />
                  <p className="font-bold text-forest-900 text-sm">No orders registered yet</p>
                  <p className="text-xs text-charcoal-muted mt-1">Orders placed via the storefront checkout will appear here.</p>
                </div>
              ) : (
                <div className="bg-white rounded-3xl border border-sand-200 overflow-hidden shadow-soft">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-sand-100 text-forest-900 font-bold border-b border-sand-200">
                        <tr>
                          <th className="py-3.5 px-4">Order ID</th>
                          <th className="py-3.5 px-4">Customer</th>
                          <th className="py-3.5 px-4">Location</th>
                          <th className="py-3.5 px-4">Payment</th>
                          <th className="py-3.5 px-4">Total</th>
                          <th className="py-3.5 px-4">Fulfillment Status</th>
                          <th className="py-3.5 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-sand-200">
                        {orders.map((ord) => (
                          <tr key={ord.id} className="hover:bg-sand-50/50">
                            <td className="py-3.5 px-4 font-mono font-bold text-forest-900">{ord.id}</td>
                            <td className="py-3.5 px-4">
                              <span className="font-bold block text-charcoal">{ord.customer_name}</span>
                              <span className="text-charcoal-muted text-[11px]">{ord.customer_phone}</span>
                            </td>
                            <td className="py-3.5 px-4">
                              <span>{ord.county}</span>
                              <span className="block text-[11px] text-charcoal-muted truncate max-w-xs">{ord.delivery_address}</span>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                                ord.payment_status === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                              }`}>
                                {ord.payment_status} ({ord.payment_method})
                              </span>
                            </td>
                            <td className="py-3.5 px-4 font-bold text-forest-900">
                              KSh {ord.total.toLocaleString()}
                            </td>
                            <td className="py-3.5 px-4">
                              <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold capitalize ${
                                ord.status === 'delivered' ? 'bg-forest-100 text-forest-800' :
                                ord.status === 'shipped' ? 'bg-sky-100 text-sky-800' :
                                ord.status === 'processing' ? 'bg-amber-100 text-amber-800' : 'bg-sand-200 text-charcoal'
                              }`}>
                                {ord.status}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <select
                                value={ord.status}
                                onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value)}
                                className="px-2.5 py-1 rounded-xl bg-sand-100 border border-sand-300 text-[11px] font-semibold text-charcoal focus:outline-none"
                              >
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: INVENTORY */}
          {activeTab === 'inventory' && (
            <div className="bg-white rounded-3xl border border-sand-200 overflow-hidden shadow-soft">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-sand-100 text-forest-900 font-bold border-b border-sand-200">
                    <tr>
                      <th className="py-3.5 px-4">Product Name</th>
                      <th className="py-3.5 px-4">Category</th>
                      <th className="py-3.5 px-4">Price</th>
                      <th className="py-3.5 px-4">In Stock</th>
                      <th className="py-3.5 px-4">Merchandising</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Adjust Stock</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sand-200">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-sand-50/50">
                        <td className="py-3.5 px-4 font-bold text-forest-900">
                          <span>{p.name}</span>
                          {p.ageRange && (
                            <span className="block text-[10px] text-charcoal-muted font-normal">{p.ageRange}</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 capitalize text-charcoal-muted">{p.category}</td>
                        <td className="py-3.5 px-4 font-bold">
                          <span>KSh {p.price.toLocaleString()}</span>
                          {p.compareAtPrice && (
                            <span className="block text-[10px] text-charcoal-muted line-through">
                              KSh {p.compareAtPrice.toLocaleString()}
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`font-bold ${p.stock <= 5 ? 'text-rose-600' : 'text-forest-900'}`}>
                            {p.stock} units
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleToggleMerchandising(p.id, 'newArrival', p.newArrival)}
                              title="Toggle New Arrival"
                              className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase transition-all ${
                                p.newArrival
                                  ? 'bg-sage-600 text-white shadow-2xs'
                                  : 'bg-sand-100 text-charcoal-muted hover:bg-sand-200'
                              }`}
                            >
                              New
                            </button>
                            <button
                              onClick={() => handleToggleMerchandising(p.id, 'bestSeller', p.bestSeller)}
                              title="Toggle Best Seller"
                              className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase transition-all ${
                                p.bestSeller
                                  ? 'bg-amber-500 text-forest-950 shadow-2xs'
                                  : 'bg-sand-100 text-charcoal-muted hover:bg-sand-200'
                              }`}
                            >
                              Best
                            </button>
                            <button
                              onClick={() => handleToggleMerchandising(p.id, 'featured', p.featured)}
                              title="Toggle Featured"
                              className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase transition-all ${
                                p.featured
                                  ? 'bg-forest-800 text-white shadow-2xs'
                                  : 'bg-sand-100 text-charcoal-muted hover:bg-sand-200'
                              }`}
                            >
                              Feat
                            </button>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${p.active ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                            {p.active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          {editingStockId === p.id ? (
                            <div className="inline-flex items-center gap-1.5 justify-end">
                              <input
                                type="number"
                                value={stockInput}
                                onChange={(e) => setStockInput(e.target.value)}
                                className="w-16 px-2 py-1 rounded-lg border border-sand-300 text-xs text-center"
                                min={0}
                              />
                              <button
                                onClick={() => handleSaveStock(p.id)}
                                className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white"
                              >
                                <Save className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => setEditingStockId(null)}
                                className="p-1.5 rounded-lg bg-sand-200 hover:bg-sand-300 text-charcoal"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => { setEditingStockId(p.id); setStockInput(p.stock.toString()); }}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-sand-100 hover:bg-sand-200 text-forest-900 font-bold text-[11px]"
                            >
                              <Edit className="w-3 h-3" /> Edit
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: PAYMENTS LOG */}
          {activeTab === 'payments' && (
            <div className="space-y-4">
              {payments.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-3xl border border-sand-200">
                  <CreditCard className="w-12 h-12 text-sand-300 mx-auto mb-3" />
                  <p className="font-bold text-forest-900 text-sm">No payment transactions recorded yet</p>
                  <p className="text-xs text-charcoal-muted mt-1">Safaricom Daraja STK Push requests and webhooks will log here.</p>
                </div>
              ) : (
                <div className="bg-white rounded-3xl border border-sand-200 overflow-hidden shadow-soft">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-sand-100 text-forest-900 font-bold border-b border-sand-200">
                        <tr>
                          <th className="py-3.5 px-4">Payment ID</th>
                          <th className="py-3.5 px-4">Order Ref</th>
                          <th className="py-3.5 px-4">Provider</th>
                          <th className="py-3.5 px-4">Receipt / Reference</th>
                          <th className="py-3.5 px-4">Amount</th>
                          <th className="py-3.5 px-4">Status</th>
                          <th className="py-3.5 px-4">Timestamp</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-sand-200">
                        {payments.map((pay) => (
                          <tr key={pay.id} className="hover:bg-sand-50/50">
                            <td className="py-3.5 px-4 font-mono font-bold text-forest-900">{pay.id}</td>
                            <td className="py-3.5 px-4 font-mono">{pay.order_id}</td>
                            <td className="py-3.5 px-4 capitalize">{pay.provider}</td>
                            <td className="py-3.5 px-4 font-mono font-bold text-forest-900">
                              {pay.provider_reference || pay.checkout_request_id || 'Pending'}
                            </td>
                            <td className="py-3.5 px-4 font-bold">KSh {pay.amount.toLocaleString()}</td>
                            <td className="py-3.5 px-4">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                pay.status === 'completed' ? 'bg-emerald-100 text-emerald-800' :
                                pay.status === 'failed' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                              }`}>
                                {pay.status}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-charcoal-muted">
                              {new Date(pay.created_at).toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: SYSTEM HEALTH */}
          {activeTab === 'system' && systemHealth && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-sand-200 shadow-soft space-y-3">
                <h3 className="font-bold text-base text-forest-900 flex items-center gap-2">
                  <Server className="w-5 h-5 text-terracotta-600" />
                  <span>Backend Server Status</span>
                </h3>
                <div className="space-y-2 text-xs divide-y divide-sand-200">
                  <div className="flex justify-between pt-2">
                    <span className="text-charcoal-muted">Service:</span>
                    <span className="font-bold text-forest-900">{systemHealth.service}</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="text-charcoal-muted">Version:</span>
                    <span className="font-bold text-forest-900">{systemHealth.version}</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="text-charcoal-muted">Environment:</span>
                    <span className="font-bold uppercase text-emerald-700">{systemHealth.environment}</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="text-charcoal-muted">Database Engine:</span>
                    <span className="font-bold text-forest-900">SQLite (node:sqlite WAL mode)</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-sand-200 shadow-soft space-y-3">
                <h3 className="font-bold text-base text-forest-900 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-emerald-600" />
                  <span>Safaricom Daraja Gateway</span>
                </h3>
                <div className="space-y-2 text-xs divide-y divide-sand-200">
                  <div className="flex justify-between pt-2">
                    <span className="text-charcoal-muted">Daraja Environment:</span>
                    <span className="font-bold uppercase text-forest-900">{systemHealth.mpesaEnvironment}</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="text-charcoal-muted">Live Credentials Status:</span>
                    <span className={`font-bold ${systemHealth.mpesaConfigured ? 'text-emerald-700' : 'text-amber-700'}`}>
                      {systemHealth.mpesaConfigured ? 'Configured & Active' : 'Setup / Testing Mode'}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="text-charcoal-muted">Shortcode Configured:</span>
                    <span className="font-mono text-charcoal">174379 (Daraja Sandbox)</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="text-charcoal-muted">PIN Security:</span>
                    <span className="font-bold text-emerald-700">Protected (Zero PIN handling)</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
