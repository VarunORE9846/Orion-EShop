
import React, { createContext, useState, useEffect } from "react";
const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {

    const usersData = localStorage.getItem("SignupTable");
    if (usersData) {
      setIsAuthenticated(true);
    }
  }, []);
  const login = () => {
    setIsAuthenticated(true);
  };
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("SignupTable");

  };
  return;
  <AuthContext.Provider
    value={{
      isAuthenticated,
      login,
      logout,
    }}
  >
    {" "}
    {children}{" "}
  </AuthContext.Provider>;
};
export { AuthContext, AuthProvider };
