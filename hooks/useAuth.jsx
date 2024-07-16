import { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const username = await SecureStore.setItemAsync('username', username);
        const lastActive = await SecureStore.setItemAsync('lastActive', lastActive);
        if (credentials) {
          setIsAuthenticated(true);
          setUser({username: username, lastActive: lastActive})
          console.log(user)
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setIsAuthenticated(false);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  return { loading, isAuthenticated, user};
};

export default useAuth;