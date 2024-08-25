import api from "../services/api";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import PlaceholderCard from "../components/PlaceholderCard";
import ProductCard from "../components/ProductCard";

const CategoryPage = () => {
  const [products, setProducts] = useState([]);

  // Retrieve the category parameter from the URL
  const { category } = useParams();

  // Get the current location
  const location = useLocation();

  // Create a URLSearchParams object to get query parameters from the URL
  const params = new URLSearchParams(location.search);

  // Extract the 'name' parameter from the URL
  const categoryName = params.get("name");

  // useEffect to fetch products when the category changes
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Make an API call to get products by category ID
        const response = await api.get(`/products?categoryId=${category}`);
        const fetchedProducts = await response.data.products;

        // Update the products state with the fetched data
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    // Call fetchProducts when the component mounts or when 'category' changes
    fetchProducts();
  }, [category]);

  return (
    <section className=" w-[90%] md:w-[80%] mx-auto text-text-primary">
      <div>
        <ul className="hidden md:flex gap-2">
          <li className="cursor-pointer">
            <Link to="/">Home</Link>
            <FaChevronRight className="inline text-sm ml-2 text-text-secondary cursor-default" />
          </li>
          <li className="text-accent capitalize cursor-pointer">
            {categoryName === "Phones" ? "Phones & Accesories" : categoryName}
          </li>
        </ul>
      </div>
      <h1 className="bg-white p-2.5 my-5 text-center text-3xl font-semibold capitalize ">
        {categoryName === "Phones" ? "Phones & Accesories" : categoryName}
      </h1>
      <div id="shopByCategory" className="bg-white w-full mb-5 rounded-t-lg">
        <h2 className="w-full p-3 rounded-t-lg capitalize">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 animate-pulse rounded h-50 w-full p-2 mb-2">
          <div className="bg-gray-300 h-40 rounded"></div>
          <div className="bg-gray-300 h-40 rounded"></div>
          <div className="bg-gray-300 h-40 rounded"></div>
          <div className="bg-gray-300 h-40 rounded"></div>
          <div className="bg-gray-300 h-40 rounded"></div>
          <div className="bg-gray-300 h-40 rounded"></div>
        </div>
      </div>
      <div
        id="combinedCatContent"
        className="bg-white w-full mb-5 rounded-t-lg"
      >
        {products.length === 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 p-2">
            {/* Render 12 placeholder cards */}
            {[...Array(12)].map((_, index) => (
              <PlaceholderCard key={index} />
            ))}
          </div>
        ) : (
          // Render actual products if products are available
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 p-2">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoryPage;
