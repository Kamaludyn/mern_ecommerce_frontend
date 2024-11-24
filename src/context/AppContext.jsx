import { createContext, useState, useEffect } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryProducts, setCategoryProducts] = useState({});
  const [openCart, setOpenCart] = useState(false);

  const [customer, setCustomer] = useState(
    () => JSON.parse(localStorage.getItem("customer")) || null
  );
  const [token, setToken] = useState(
    () => localStorage.getItem("accessToken") || null
  );

  // Function to toggle cart state
  const closeCart = () => {
    setOpenCart(false);
  };

  // useEffect runs on initial component mount to fetch the products and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products and categories at the same time using Promise.all for efficiency
        const [productRes, categoryRes] = await Promise.all([
          api.get("/products"),
          api.get("/categories"),
        ]);

        setProducts(productRes.data.products);
        setCategories(categoryRes.data.categories);
      } catch (error) {
        if (error.request) {
          // Request was made, but no response received
          toast.error("Please check your network connection");
        } else {
          // Catch all
          toast.error("An unexxpected error occured");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to fetch products by category ID and store them in categoryProducts
  const getProductsByCategory = async (categoryId) => {
    // Check if products for this category ID are already cached (to prevent duplicate fetching)
    if (!categoryProducts[categoryId]) {
      try {
        setLoading(true);
        const response = await api.get(`/products?categoryId=${categoryId}`);
        // const response = await api.get(`/products?categoryId=${category}`);
        const fetchedProducts = response.data.products;
        setCategoryProducts((prev) => ({
          ...prev,
          [categoryId]: fetchedProducts,
        }));
      } catch (error) {
        if (error.request) {
          // Request was made, but no response received
          toast.error("Please check your network connection");
        } else {
          toast.error("An unexxpected error occured");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  // Function to log in the customer
  const loginCstmr = (customerData, token) => {
    setCustomer(customerData);
    setToken(token);

    // Store token and customer in localStorage
    localStorage.setItem("customer", JSON.stringify(customerData));
    localStorage.setItem("accessToken", token);
    // api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  // Function to logout customer
  const logoutCstmr = (customerId) => {
    // Reset customer and token state
    setCustomer("");
    setToken("");

    // Remove Token from Local Storage
    localStorage.removeItem("customer");
    localStorage.removeItem("accessToken");

    // Remove RecentViewedItems from Local Storage
    localStorage.removeItem("recentlyViewedItems");
  };

  return (
    <AppContext.Provider
      value={{
        closeCart,
        openCart,
        setOpenCart,
        products,
        categories,
        loading,
        getProductsByCategory,
        categoryProducts,

        customer,
        loginCstmr,
        logoutCstmr,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
