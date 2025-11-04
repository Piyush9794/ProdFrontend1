import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  // Temporary check - add this in your AuthProvider
  // console.log("BASE_URL:", import.meta.env.VITE_BASE_URL);
  // console.log("All env variables:", import.meta.env);
  // ✅ 1. Check saved login data (refresh hone ke baad bhi login rahe)
  useEffect(() => {
    const savedToken = localStorage.getItem("userToken");
    const savedUser = localStorage.getItem("userData");

    if (savedToken && savedUser) {
      setIsLoggedIn(true);
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // ✅ 2. Login API call
  const loginUser = async (email, password) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        const userData = res.data.data;
        const userToken = res.data.token;

        // State update
        setIsLoggedIn(true);
        setUser(userData);
        setToken(userToken);

        // ✅ LocalStorage me save (refresh ke baad bhi rahe)
        localStorage.setItem("userToken", userToken);
        localStorage.setItem("userData", JSON.stringify(userData));

        return { success: true, message: res.data.message };
      } else {
        return { success: false, message: res.data.message };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login Failed!",
      };
    }
  };

  // ✅ 3. Logout Function
  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setToken(null);
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
  };

  const value = {
    isLoggedIn,
    user,
    token,
    loginUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
