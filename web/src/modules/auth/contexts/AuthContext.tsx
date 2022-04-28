import React, { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MAIN_ROUTES } from "../../../Main";

const key = 'TOKEN';

interface AuthContextType {
  token: string;
  setToken: (value: string) => void
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = React.useState<string>(localStorage.getItem(key) ?? '');
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { from: Location };

  const saveToken = useCallback((token: string) => {
    localStorage.setItem(key, token);
    setToken(token);
    navigate(token ? (state?.from?.pathname || '') : MAIN_ROUTES.AUTH);
  }, [state, navigate, setToken]);

  const value = { token, setToken: saveToken };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const AuthContext = React.createContext<AuthContextType>(null!);
export const useAuth = () => React.useContext(AuthContext);