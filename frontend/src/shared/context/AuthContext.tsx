import React from "react";
import { useState } from "react";

interface AuthContextInterface {
  isLogged: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = React.createContext({} as AuthContextInterface);

export default AuthContext;

interface authProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: authProviderProps) => {
  const [isLogged, setIsLogged] = useState(
    localStorage.getItem("token") !== null
  );

  const login = () => {
    setIsLogged(true);
  };

  const logout = () => {
    setIsLogged(false);
  };

  return (
    <AuthContext.Provider value={{ isLogged, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
