/* eslint-disable react-refresh/only-export-components */
// The useAuth hook intentionally lives in the same file as the provider -
// pairing a context hook with its provider in one file is a common pattern.
import { createContext, useCallback, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

// Simple frontend-only authentication. The logged-in user is stored in
// localStorage via useLocalStorage so it survives a page refresh.
// No backend is needed - this is purely for demonstrating ProtectedRoute.
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage('avenza_auth_user', null);

  const login = useCallback((userData) => {
    setUser({
      name: userData.name,
      email: userData.email || '',
      loggedInAt: Date.now()
    });
  }, [setUser]);

  const logout = useCallback(() => {
    setUser(null);
  }, [setUser]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Convenience hook so any component can read the auth state.
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside an <AuthProvider>');
  }
  return context;
}

export default AuthContext;