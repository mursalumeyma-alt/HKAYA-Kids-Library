import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('hkaya_token') || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize and verify session on load
  useEffect(() => {
    async function initAuth() {
      const storedToken = localStorage.getItem('hkaya_token');
      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.auth.getMe();
        if (response.success && response.user) {
          setUser(response.user);
          setToken(storedToken);
        } else {
          localStorage.removeItem('hkaya_token');
          setUser(null);
          setToken(null);
        }
      } catch (err) {
        // Token invalid or expired
        localStorage.removeItem('hkaya_token');
        setUser(null);
        setToken(null);
      } finally {
        setLoading(false);
      }
    }

    initAuth();
  }, []);

  const login = async (email, password) => {
    setError(null);
    try {
      const res = await api.auth.login({ email, password });
      if (res.success && res.token) {
        localStorage.setItem('hkaya_token', res.token);
        setToken(res.token);
        setUser(res.user);
        return { success: true, user: res.user };
      }
      throw new Error(res.error || 'Login failed');
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const register = async ({ name, email, password, phone }) => {
    setError(null);
    try {
      const res = await api.auth.register({ name, email, password, phone });
      if (res.success && res.token) {
        localStorage.setItem('hkaya_token', res.token);
        setToken(res.token);
        setUser(res.user);
        return { success: true, user: res.user };
      }
      throw new Error(res.error || 'Registration failed');
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('hkaya_token');
    setToken(null);
    setUser(null);
    setError(null);
  };

  const isAdmin = Boolean(user && user.role === 'admin');

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAdmin,
        loading,
        error,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
