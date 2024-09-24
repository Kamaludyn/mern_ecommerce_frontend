import { createContext, useState, useEffect } from "react";
import api from "../services/api";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryProducts, setCategoryProducts] = useState({});

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
        console.error("Error fetching initial data", error);
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
        console.log(fetchedProducts);
        setCategoryProducts((prev) => ({
          ...prev,
          [categoryId]: fetchedProducts,
        }));
      } catch (error) {
        console.error("Error fetching products by category", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <AppContext.Provider
      value={{
        products,
        categories,
        loading,
        getProductsByCategory,
        categoryProducts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
