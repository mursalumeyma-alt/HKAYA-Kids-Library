const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

/**
 * Standard fetch wrapper that automatically handles JSON and Bearer tokens
 */
async function request(endpoint, options = {}) {
  const token = localStorage.getItem('hkaya_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const errorMsg = data.error || (data.message) || `Request failed with status ${response.status}`;
    const err = new Error(errorMsg);
    err.status = response.status;
    err.data = data;
    throw err;
  }
  return data;
}

export const api = {
  auth: {
    register: (body) => request('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
    login: (body) => request('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
    getMe: () => request('/auth/me'),
    logout: () => request('/auth/logout', { method: 'POST' }),
    requestPasswordReset: (email) => request('/auth/password-reset-request', { method: 'POST', body: JSON.stringify({ email }) })
  },
  products: {
    getAll: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return request(`/products${query ? '?' + query : ''}`);
    },
    getById: (id) => request(`/products/${id}`),
    create: (productData) => request('/products', { method: 'POST', body: JSON.stringify(productData) }),
    update: (id, productData) => request(`/products/${id}`, { method: 'PUT', body: JSON.stringify(productData) }),
    updateStock: (id, stock) => request(`/products/${id}/stock`, { method: 'PATCH', body: JSON.stringify({ stock }) })
  },
  orders: {
    create: (orderData) => request('/orders', { method: 'POST', body: JSON.stringify(orderData) }),
    getMyOrders: () => request('/orders/my-orders'),
    getById: (id) => request(`/orders/${id}`),
    getAllAdmin: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return request(`/orders/admin/all${query ? '?' + query : ''}`);
    },
    updateStatus: (id, status) => request(`/orders/admin/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) })
  },
  payments: {
    initiateMpesa: ({ orderId, phone }) => request('/payments/mpesa/initiate', { method: 'POST', body: JSON.stringify({ orderId, phone }) }),
    getStatus: (orderId) => request(`/payments/status/${orderId}`),
    getAllAdmin: () => request('/payments/admin/all')
  },
  health: () => request('/health')
};

export default api;
