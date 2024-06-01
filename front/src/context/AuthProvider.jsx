/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import axios from "axios";
import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";

const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("authToken") || null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const signupAction = async (input) => {
    try {
      await axios.post("http://localhost:8000/api/v1/users/signup", input);
      navigate("/login");
      return;
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  const loginAction = async (input) => {
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/users/login",
        input,
      );
      if (data.data) {
        setIsAuthenticated(true);
        navigate("/");
        setToken(data.data.authToken);
        localStorage.setItem("authToken", data.data.authToken);
      }
      return;
    } catch (error) {
      setToken(null);
      setUser(null);
      console.log(error.message);
    }
  };

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    async function fetchUser(authToken) {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/api/v1/users/me",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          },
        );
        if (data.data) {
          setUser(data.data);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.log(error.response?.data);
        localStorage.removeItem("authToken");
        setToken(null);
        setIsAuthenticated(false);
        navigate("/login");
      }
    }
    if (authToken) {
      fetchUser(authToken);
    } else {
      setIsAuthenticated(false);
    }
  }, [navigate]);

  const logout = async () => {
    try {
      await axios.get("http://localhost:8000/api/v1/users/logout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem("authToken");
      setUser(null);
      setToken(null);
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  const value = {
    loginAction,
    token,
    user,
    logout,
    isAuthenticated,
    signupAction
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
