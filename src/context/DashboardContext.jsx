import { createContext, useState, useEffect } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [counts, setCounts] = useState({ productCount: 0, categoryCount: 0 });

  // Fetch both products and categories simultaneously on mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          api.get("/products"),
          api.get("/categories"),
        ]);

        // Update state with fetched data
        setProducts(productsResponse.data.products);
        setCategories(categoriesResponse.data.categories);
      } catch (error) {
        toast.error("An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fetching product and category counts on mount
  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const [productRes, categoryRes] = await Promise.all([
          api.get("/products/count"),
          api.get("/categories/count"),
        ]);
        const prodCount = productRes.data.productCount;
        const categCount = categoryRes.data.categoriesCount;
        setCounts({
          productCount: prodCount,
          categoryCount: categCount,
        });
      } catch (error) {
        toast.error("An error occurred");
      }
    };

    fetchProductCount();
  }, []);

  // Fetching users on initial render
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        if (!token) {
          toast("You need to Login");
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
          toast.error("Check your network connection");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        products,
        categories,
        setCategories,
        setProducts,
        users,
        loading,

        counts,
        setCounts,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
