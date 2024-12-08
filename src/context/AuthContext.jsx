import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(null);
  const [customers, setCustomers] = useState(null);
  const [customerCount, setCustomerCount] = useState(0);
  const [loading, setLoading] = useState(false);
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
    const fetchData = async () => {
      setLoading(true);
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      try {
        // Fetch all data in parallel
        const [userRes, customerRes, customerCountRes] = await Promise.all([
          api.get("/Users", { headers }),
          api.get("/customers", { headers }),
          api.get("/customers/count", { headers }),
        ]);

        // Handle fetched data
        setUsers(userRes.data.users);
        setCustomers(customerRes.data.customers);
        setCustomerCount(customerCountRes.data.customersCount);
      } catch (error) {
        console.error(
          "An error occurred while fetching data(user, customer & customer count)"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

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
      value={{
        token,
        user,
        users,
        customers,
        setCustomers,
        customerCount,
        setUsers,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
