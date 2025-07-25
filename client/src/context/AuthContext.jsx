import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Manual JWT decode function (no dependencies)
function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      setLoading(true);
      try {
        const decoded = parseJwt(token);
        if (decoded) {
          setUser({
            id: decoded.userId,
            name: decoded.name,
            email: decoded.email,
            role: decoded.role,
          });
          console.log('Decoded user:', decoded);
        } else {
          setUser(null);
          console.error('JWT decode error: Invalid token');
        }
      } catch (e) {
        setUser(null);
        console.error('JWT decode error:', e);
      }
      setLoading(false);
    } else {
      localStorage.removeItem('token');
      setUser(null);
      setLoading(false);
    }
  }, [token]);

  const login = (userData, jwt) => {
    setUser(userData);
    setToken(jwt);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 