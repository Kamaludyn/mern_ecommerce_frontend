import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import PlaceholderCard from "./PlaceholderCard";
import ProductCard from "./ProductCard";

const FlashSale = () => {
  const { products } = useContext(AppContext);
  const [flashSaleProducts, setFlashSaleProducts] = useState([]);

  // Filtering products with low CountInStock
  useEffect(() => {
    setFlashSaleProducts(
      products.filter((product) => product.countInStock < 20).slice(0, 12)
    );
  }, [products]);

  return (
    <section className="bg-white w-[90%] md:w-[80%] mx-auto mb-6 rounded-t-lg rounded-b-xl shadow-lg">
      <h2 className="w-full bg-elements p-3 font-semibold text-white mb-3 text-xl md:text-2xl rounded-t-lg">
        Flash Sale
      </h2>
      {flashSaleProducts.length === 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 p-2">
          {[...Array(12)].map((_, index) => (
            <PlaceholderCard key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 p-2">
          {flashSaleProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default FlashSale;
