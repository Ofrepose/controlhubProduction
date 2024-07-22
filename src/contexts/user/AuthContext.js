import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { helloWorld } from '../Welcome';

const AuthContext = createContext();
const API = process.env.REACT_APP_DEVELOPMENT == 'true'
  ?
  process.env.REACT_APP_DEV_DOMAIN + 'api/users/'
  :
  process.env.REACT_APP_PROD_DOMAIN + 'api/users/';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [darkmode, setDarkmode] = useState(() => JSON.parse(localStorage.getItem('darkMode')) || false);
  const navigate = useNavigate();

  // Load user data from localStorage when the component mounts
  useEffect(() => {
    setLoading(true);
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      console.log(window.location.pathname)
      if (window.location.pathname !== '/auth/sign-up' && !localStorage.getItem('token') && window.location.pathname !== process.env.REACT_APP_BASENAME + '/') {
        navigateToLogin();
        
      }
    }
    setLoading(false);
  }, []);

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('authUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('authUser');
    }
  }, [user]);


  const navigateToLogin = () => navigate('/auth/sign-in');

  const signOut = () => {
    setUser(null);
    localStorage.clear();
    navigateToLogin();
  };

  const getHeaders = () => ({
    'Content-Type': 'application/json',
    'x-auth-token': localStorage.getItem('token'),
  })

  const fetchData = async (endpoint, method, body) => await fetch(endpoint, { method, headers: getHeaders(), body })

  const validateUser = () => {
    if (!isLoading && user) {
      return true
    } else if (isLoading) {
      const storedUser = localStorage.getItem('authUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        return false;
      }
      return true;
    }
  }

  const setMode = (darkMode) => {
    setDarkmode(() => darkMode);
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }

  const getUser = async () => {
    let data;
    try {
      setLoading(true);
      const response = await fetchData(API, 'GET');
      const data = await response.json();
      if (data?.msg === 'Token is not valid' || data?.msg === 'User not found') {
        signOut();
      }
      setUser(() => data);
    } catch (error) {
      signOut();
      navigateToLogin();
    } finally {
      setLoading(false);
      return data;
    }
  }

  const signUp = async (userData) => {
    let data;
    try {
      setLoading(true);
      const response = await fetchData(API + 'register', 'POST', JSON.stringify(userData));
      data = await response.json();
      setUser(data);
      if (data.firstname && data.email) {
        localStorage.setItem('token', data.token)
        navigate('/admin/default');
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
    return data;
  };

  const signIn = async (userData) => {
    let data;
    try {
      setLoading(true);
      const response = await fetchData(API, 'POST', JSON.stringify(userData));
      data = await response.json();
      setUser(data);
      if (data.email && data.firstname) {
        localStorage.setItem('token', data.token)
        navigate('/admin/default');
      }
    } catch (error) {
      throw error;
    } finally {
      helloWorld();
      setLoading(false);
    }
    return data;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        signOut,
        signUp,
        validateUser,
        getUser,
        setMode,
        darkmode
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
