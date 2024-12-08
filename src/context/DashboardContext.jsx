import { createContext, useState, useEffect } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
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
        console.error(
          "An Error occurred while fetching products and categories data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fetching product and category counts on mount
  useEffect(() => {
    const fetchCounts = async () => {
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
        console.error(
          "An Error occurred while fetching products and categories count"
        );
      }
    };

    fetchCounts();
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        products,
        categories,
        setCategories,
        setProducts,
        loading,

        counts,
        setCounts,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
