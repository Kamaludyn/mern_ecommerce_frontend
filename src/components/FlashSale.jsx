import { useState, useEffect } from "react";
import api from "../services/api";
import PlaceholderCard from "./PlaceholderCard";
import ProductCard from "./ProductCard";

const FlashSale = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchFlashSaleProducts = async () => {
      try {
        const response = await api.get("/products");
        // setProducts(response.data.products);
        const fetchedProducts = response.data.products;
        setProducts(
          fetchedProducts
            .filter((product) => product.countInStock < 20)
            .slice(0, 12)
        );
      } catch (error) {
        console.error("Error fetching flash sale products:", error);
      }
    };

    fetchFlashSaleProducts();
  }, []);

  return (
    <section className="bg-white w-[90%] md:w-[80%] mx-auto mb-6 rounded-t-lg rounded-b-xl shadow-lg">
      <h2 className="w-full bg-elements p-3 font-semibold text-white mb-3 text-xl md:text-2xl rounded-t-lg">
        Flash Sale
      </h2>
      {products.length === 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 p-2">
          {[...Array(12)].map((_, index) => (
            <PlaceholderCard key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 p-2">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default FlashSale;
