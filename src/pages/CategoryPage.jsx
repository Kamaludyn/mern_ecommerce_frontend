import { useContext, useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { FaChevronRight } from "react-icons/fa";
import PlaceholderCard from "../components/PlaceholderCard";
import ProductCard from "../components/ProductCard";

const CategoryPage = () => {
  const [products, setProducts] = useState([]);

  // Getting the category ID from the URL params
  const { category } = useParams();

  // Getting the current location to access query parameters
  const location = useLocation();

  // Parsing the query parameters from the URL
  const params = new URLSearchParams(location.search);

  // Extracting the 'name' parameter (category name) from the URL
  const categoryName = params.get("name");

  // Accessing context values, including products, fetching function, and loading state
  const { categoryProducts, getProductsByCategory, loading } =
    useContext(AppContext);

  // Fetch products based on the category ID
  useEffect(() => {
    const fetchProducts = async () => {
      await getProductsByCategory(category);
      if (categoryProducts[category]) {
        setProducts(categoryProducts[category]); // Set the products if available in the context
      } else {
        setProducts([]); // Fallback if no products for the selected category
      }
    };

    fetchProducts();
  }, [category, categoryProducts, getProductsByCategory]); // Re-run the effect when the category or relevant context changes

  return (
    <section className=" w-[90%] md:w-[80%] mx-auto text-text-primary">
      <div>
        <ul className="hidden md:flex gap-2">
          <li className="cursor-pointer">
            <Link to="/">Home</Link>
            <FaChevronRight className="inline text-sm ml-2 text-text-secondary cursor-default" />
          </li>
          <li className="text-accent capitalize cursor-pointer">
            {categoryName}
          </li>
        </ul>
      </div>
      <h1 className="bg-white p-2.5 my-5 text-center text-3xl font-semibold capitalize ">
        {categoryName}
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
              // <Link to=''>
              <PlaceholderCard key={index} />
              // </Link>
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
