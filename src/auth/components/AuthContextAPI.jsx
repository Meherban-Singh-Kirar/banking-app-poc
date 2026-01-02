import { createContext, useState, useEffect } from "react";

export const authContext = createContext(null);

function AuthContextAPI({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticate, setIsAuthenticate] = useState(false);

  // 🔹 Restore user on page refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticate(true);
    }
  }, []);

  // 🔹 Login
  const login = (authToken, userRole, userData) => {
    const loggedInUser = {
      ...userData,
      token: authToken,
      role: userRole.toUpperCase(), // IMPORTANT
    };

    setUser(loggedInUser);
    setIsAuthenticate(true);

    // Persist login
    localStorage.setItem("user", JSON.stringify(loggedInUser));
  };

  // 🔹 Logout
  const logout = () => {
    setUser(null);
    setIsAuthenticate(false);
    localStorage.removeItem("user");
  };

  return (
    <authContext.Provider
      value={{
        user,
        isAuthenticate,
        login,
        logout,
      }}
    >
      {children}
    </authContext.Provider>
  );
}

export default AuthContextAPI;
