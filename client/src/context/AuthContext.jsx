import { createContext, useContext, useState } from 'react';
import api from '../api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('studenthub_user')) || null; }
    catch { return null; }
  });

  async function authenticate(endpoint, values) {
    const { data } = await api.post(`/auth/${endpoint}`, values);
    localStorage.setItem('studenthub_token', data.token);
    localStorage.setItem('studenthub_user', JSON.stringify(data.user));
    setUser(data.user);
    return data.user;
  }

  function logout() {
    localStorage.removeItem('studenthub_token');
    localStorage.removeItem('studenthub_user');
    setUser(null);
  }

  return <AuthContext.Provider value={{ user, register: v => authenticate('register', v), login: v => authenticate('login', v), logout }}>
    {children}
  </AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
