import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useNavigate } from 'react-router-dom';

import authApi from '../api/auth';

const AuthContext = createContext({
  user: null,
  loading: true,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getCurrentUser() {
      const res = await authApi.me();

      setLoading(false);

      if (res.user) {
        setUser(res.user);
        navigate('/');
      }
    }

    getCurrentUser();
  }, [navigate]);

  const login = async user => {
    const res = await authApi.login(user);

    if (res.user) {
      setUser(res.user);
    }

    if (res.err) {
      return { err: res.err };
    }
  };

  const logout = async () => {
    const res = await authApi.logout();

    if (res.user) {
      setUser(null);
    }

    if (res.err) {
      return { err: res.err };
    }
  };

  const values = useMemo(
    () => ({
      user,
      loading,
      login,
      logout,
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
