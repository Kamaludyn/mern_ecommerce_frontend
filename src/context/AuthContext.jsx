import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(null);
  // Initialize token and user state from localStorage or set to null
  const [token, setToken] = useState(
    () => localStorage.getItem("authToken") || null
  );
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem("user")) || null
  );

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  // Effect to fetch users on initial render
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (!token) {
          toast.error("You need to Login");
          navigate("/dashboard/login");
          return;
        }
        const userRes = await api.get("/Users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(userRes.data.users);
      } catch (error) {
        if (error.message === "Network Error") {
          toast.error("Please check your network connection");
        } else if (error.response?.data.error === "jwt expired") {
          // Expired token error
          toast.error("Session expired: Please login again");
          navigate("/dashboard/login");
        }
      }
    };
    fetchUsers();
  }, []);

  // Function to log in the user
  const login = (token, userData) => {
    setToken(token);
    setUser(userData);

    // Store token and user in localStorage
    localStorage.setItem("authToken", token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Function to log out user
  const logout = async () => {
    const confirmDelete = confirm("Are you sure you want to logout?");
    if (!confirmDelete) return;

    try {
      const userId = user ? user._id : null;
      if (userId) {
        // Make an API request to log out user
        await api.post(`users/logout/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      // Clear localStorage and state
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      setToken(null);
      setUser(null);

      toast.success("logout successful");
      navigate("/dashboard/login");
    } catch (error) {
      toast.error("An Error occured");
    }
  };

  // Effect to keep state and localStorage in sync
  useEffect(() => {
    if (token && user) {
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [token, user]);

  return (
    <AuthContext.Provider
      value={{ token, user, users, setUsers, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
