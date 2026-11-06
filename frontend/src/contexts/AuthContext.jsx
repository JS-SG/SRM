import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('srm_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('srm_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('srm_token');
      if (storedToken) {
        try {
          const res = await authService.getProfile();
          if (res.data) {
            setUser(res.data);
            localStorage.setItem('srm_user', JSON.stringify(res.data));
          }
        } catch (err) {
          logout();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (identifier, password) => {
    const res = await authService.login(identifier, password);
    const { token: jwtToken, user: userData } = res.data;

    setToken(jwtToken);
    setUser(userData);
    localStorage.setItem('srm_token', jwtToken);
    localStorage.setItem('srm_user', JSON.stringify(userData));

    return userData;
  };

  const logout = () => {
    try {
      if (token) authService.logout().catch(() => {});
    } catch (e) {}

    setToken(null);
    setUser(null);
    localStorage.removeItem('srm_token');
    localStorage.removeItem('srm_user');
  };

  const hasPermission = (requiredPermission) => {
    if (!user) return false;
    if (user.role === 'ADMIN') return true;

    if (Array.isArray(requiredPermission)) {
      return requiredPermission.some((p) => user.permissions?.includes(p));
    }
    return user.permissions?.includes(requiredPermission);
  };

  const isAdmin = user?.role === 'ADMIN';
  const isTeacher = user?.role === 'TEACHER';

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        hasPermission,
        isAdmin,
        isTeacher,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
